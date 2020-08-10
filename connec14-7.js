const express = require("express")
const bodyParser = require("body-parser")
const mysql = require('mysql');
const path = require('path');
const { title } = require("process");
const app = express()
// app.use(express.static(__dirname + "/place"));
app.use('/place', express.static('place'));



console.log('Get connection ...');

var con = mysql.createConnection({
    database: 'new_two',
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")


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
        res.render("connec14-7.ejs", { result: results })
        console.log(results)
    });

})

app.post("/new-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    var sql = `INSERT INTO video (link, img, title, channel, view,time) VALUES ('${req.body.link}','${req.body.img}','${req.body.title}','${req.body.channel}','${req.body.view}','${req.body.time}')`
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




app.listen(3000, function() {
    console.log("Hello nodejs running on port 3000")
})