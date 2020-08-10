
const express = require("express")
const bodyParser = require("body-parser")
const mysql = require('mysql');
const path = require('path');




var con = mysql.createConnection({
    database : 'new_two',
    host: "localhost",
    user: "root",
    password:""
});

con.connect(function(err){
    if(err) throw err;
    console.log("Connected !!!!!!");
});


// khai bao them express
const app = express()
// ap dung bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
// su dung de chinh css
app.use('/place', express.static('place'));

app.set("view engine", "ejs")



app.get("/", function (req, res) {
   var sql = "SELECT* from video";
   con.query(sql,function(err,results){
       if(err) throw err;
       res.render("connec_2.ejs",{result:results})
       console.log(results)
   });
});



// in ra h1 khi toi trang /about voi ham function
app.get("/youtube-about", function (req, res) {
    var sql = "SELECT* from video"
    con.query(sql,function(err,results){
        if(err) throw err;
        res.send(results);
    });
    
})


app.post("/new-youtube", function (req, res) {
    console.log("requested", req.body);
    // let newTodo = req.body;
    // quotes.push(newTodo);
    var sql = `INSERT INTO video(link, img, title, channel, view,time) VALUES ('${req.body.link}','${req.body.img}','${req.body.title}','${req.body.chanel}','${req.body.view}','${req.body.time}')`;

    console.log(sql);
    con.query(sql,function(err,result){
        if(err) throw err;

    });

});


//update todo thong qua nodejs
app.post("/update-youtube", function (req, res) {
    console.log(" Accept request", req.body)
    var sql = `UPDATE video
    SET link = '${req.body.newlink}', img='${req.body.newimg}',
    title='${req.body.newtitle}', channel='${req.body.newchannel}',
    view = '${req.body.newview}', time= '${req.body.newtime}' WHERE id= '${req.body.id}'OR title='${req.body.title}'`

    
    con.query(sql,function(err,result){
        if(err) throw err;

    })
})


// delete todo thong qua nodejs
app.post("/delete-youtube", function (req, res) {
    console.log(" Accept request", req.body)
    var sql = `DELETE FROM video
    WHERE title = '${req.body.title}'`

    console.log(sql);
    con.query(sql,function(err,result){
        if(err) throw err;
    
    })
})




// tai vi tri voi hostpost 4000 ta nhan duoc gia tri console la :
app.listen(4000, function () {
    console.log("hello nodejs running on port 4000")
})

