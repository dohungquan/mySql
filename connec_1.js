const express = require("express")
const bodyParser = require("body-parser")//doc du lieu tu man hinh
const app = express()

const mysql = require('mysql');

app.set("view engine", "ejs")

let con = mysql.createConnection({
    database: 'new_one',
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Da ket noi voi mysql")
});

app.use(express.static(__dirname))//cai ney de minh add them file css
app.use(bodyParser.urlencoded({extended: true}))
//de doc du lieu them vao tu man hinh

app.get('/about', function(req, res) {
    var sql = "SELECT * from video";
    con.query(sql, function(err, results) {
        if (err) throw err;
        res.send(results);
    });
});

app.get("/", function(req, res) {
    
    var sql = "SELECT * from video";
    con.query(sql, function(err, results) {
        if (err) throw err;
        
        res.render("connectionnode_sql.ejs", { result: results })
        console.log(results)
    });

})

app.post("/new-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    var sql = `INSERT INTO video (link, img, title, channel, view) VALUES ('${req.body.link}','${req.body.img}','${req.body.title}','${req.body.channel}','${req.body.view}')`
    console.log(sql)
    con.query(sql, function(err, result) {
        if (err) throw err;
    });
})


app.post("/delete-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    var sql = `DELETE FROM video WHERE id = '${req.body.id}' `
    console.log(sql)
    con.query(sql, function(err, result) {
        if (err) throw err;
    });
})

app.post("/fix-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    var sql = `UPDATE video Set link ='${req.body.newlink}', img='${req.body.newimg}', title = '${req.body.newtitle}', channel = '${req.body.newchannel}', view = '${req.body.newview}' WHERE id='${req.body.id}'OR title='${req.body.title}'`
    con.query(sql, function(err, result) {
        if (err) throw err;
    });
})



// ket noi voi console.log
app.listen(3000, function(){
    console.log("hello nodejs running on port 3000")
}) 
