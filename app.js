var mysql=require("mysql");
var faker=require("faker");
var bodyParser=require("body-parser");
var express = require("express");
var app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
var connection = mysql.createConnection({
  host: "localhost",
  user: "root", // your root username
  database: "join_us", // the name of your db
  password: "password",
});

// var data = [];
// for (var i = 0; i < 500; i++) {
//   data.push([faker.internet.email(), faker.date.past()]);
// }
// var q = "INSERT INTO users (email, created_at) VALUES ?";
// connection.query(q, [data], function (err, result) {
//   console.log(err);
//   console.log(result);
// });


app.get("/", function (req, res) {
  var q="SELECT COUNT(*) AS count FROM users";
  connection.query(q, function (err, result) {
    if(err) throw err;
    var count=result[0].count;
    res.render("home",{count:count});
    // res.send(`總共有${count}個用戶`);
  });
});

app.post("/register",function(req,res){
    console.log(req.body);
    connection.query("INSERT INTO users SET ?", req.body.person, function (
      err,
      result
    ) {
       if (err) {
         var errMsg;
         if (err.code === "ER_DUP_ENTRY") {
           errMsg = "That email already exists";
         } else {
           errMsg = "Uh oh, there was an error!";
         }
         console.log(errMsg);
       }
       res.redirect("/");
    });
 
});
app.listen(3000, function () {
  console.log("App listening on port 300!");
});