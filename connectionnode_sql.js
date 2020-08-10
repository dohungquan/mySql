const express = require("express")
const bodyParser = require("body-parser")//doc du lieu tu man hinh
const app = express()

const mysql = require('mysql');

app.set("view engine", "ejs")

console.log('Get connection ...');
 
var conn = mysql.createConnection({
  database: 'tbh',
  host: "localhost",
  user: "root",
  password: ""
});
 
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname))//cai ney de minh add them file css
app.use(bodyParser.urlencoded({extended: true}))
//de doc du lieu them vao tu man hinh

app.listen(3000, function(){
    console.log("hello nodejs running on port 3000")
}) 