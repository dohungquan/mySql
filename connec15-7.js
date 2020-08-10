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
        res.render("connec15-7.ejs", { result_quotes: quotes,result: results })
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

let quotes = [
    {
        link: "https://www.youtube.com/embed/pwC3s7rIBzU",
        img: "https://yt3.ggpht.com/a/AATXAJwnPVFq5VPhoRybLDwPCG5WlKHe2ug3F68dSw=s88-c-k-c0xffffffff-no-rj-mo",
        title: "Siêu Phẩm Hoạt Hình | Toàn Chức Cao Thủ - Tập 01 (Vietsub) | WeTV Vietnam",
        chanel:"Nhóc siêu quậy",
        view: 416624,
        time: "1  ngày trước",
    },
    {
        link: "https://www.youtube.com/embed/aHfXmtgt51k",
        img: "https://yt3.ggpht.com/a/AATXAJy4Jr7PiLEE7DSN9RRQukjpiwtPSmjD1megcw=s48-c-k-c0xffffffff-no-rj-mo",
        title: " 沒有你陪伴真的好孤單/誰在意我流下的淚/我的唇吻不到我愛的人/愛的世界只有你/我愛你勝過你愛我/错错错/我的好兄弟/许多年以后",
        chanel:"China Music",
        view: 2828289 ,
        time: "2 năm trước" ,
    },
    {
        link: "https://www.youtube.com/embed/6MvLgaZffTY",
        img: "https://yt3.ggpht.com/a/AATXAJwoBN8cu-yYTq431WhD0F5bbfVQESDcacei3A=s48-c-k-c0xffffffff-no-rj-mo",
        title: "NGÀY HẠNH PHÚC - Những Ca Khúc Nhạc Trẻ Hay Nhất 2018 | lk nhac tre - nhac tinh yeu 2018",
        chanel:"Nhạc trẻ 8X ",
        view: 48282578 ,
        time: "1 giờ trước",
    },
    {
        link:"https://www.youtube.com/embed/Se9QkRs4n5s" ,
        img:"https://yt3.ggpht.com/a/AATXAJyqr54ABiK6oxibiBWvpoMZqvWtWjgcyNF4xg=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Kỹ Năng Sinh Tồn Chống Chọi Với Thiên Nhiên - Khám phá Panama - Bear Grylls [Thuyết Minh]",
        chanel:"Sinh tồn nơi hoang dã",
        view: 5858528552 ,
        time: "5 giờ trước",
    },
    {
        link:"https://www.youtube.com/embed/mOcalkgjZ8c",
        img:"https://yt3.ggpht.com/a/AATXAJz_tQCeAwnUQ_YP19eCV_89EfZLm0gTFXUAPA=s48-c-k-c0xffffffff-no-rj-mo",
        title:"5 MÓN NGON TRONG RỪNG - Band Of Brothers - Tập 5",
        chanel:"Món ngon bốn miền",
        view: 4223333333 ,
        time: "11 phút trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/3Tgdg0wLXF8",
        img:"https://yt3.ggpht.com/a/AATXAJy0tWbCGA2w1fyh8qzV8_1cbH5ccfIpjkq7TQ=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Một số thuật ngữ trong NoSQL - Database (Bài 1.4)",
        chanel:"Lập trình chuyên nghiệp",
        view: 529236633 ,
        time: "15 ngày trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/SY5MD7f4Qfs",
        img:"https://yt3.ggpht.com/a/AATXAJzttb4CXyBqO4t0fQ9o9PMF_LNjkCiK_TnifA=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Tin tổng hợp dịch do virus Corona (Covid-19) sáng 19/6 | VTC Now",
        chanel:"Corona tin tức tổng hợp",
        view: 9696366666666 ,
        time: "5 giờ trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/uC-blUP1ius",
        img:"https://yt3.ggpht.com/a/AATXAJyH0yVK7xs1wNLde3UZ-mCp928FmOWsgfWPvg=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Paris By Night 99 - Tôi Là Người Việt Nam (Disc 2 Full Program)",
        chanel:"Người Việt bốn phương",
        view: 2525853332823 ,
        time: "14 ngày trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/DgMDvophnEw",
        img:"https://yt3.ggpht.com/a/AATXAJyH0yVK7xs1wNLde3UZ-mCp928FmOWsgfWPvg=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Hài Hoài Linh, Chí Tài | \"Con Sáo Sang Sông\" | PBN 75",
        chanel:"Sao em nỡ vội lấy chồng",
        view: 522556034 ,
        time: "5 ngày trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/ivqVWVBi7gU",
        img:"https://yt3.ggpht.com/a/AATXAJw1mNTFNiIfjXVfOANE9SHwxBdhKELbEauBBg=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Chiến tranh biên giới Việt - Trung 1979 và vấn đề Đông Dương",
        chanel:"Chiến tranh và bí ẩn",
        view: 25882552 ,
        time: "5 phút trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/GA3vQRuZCOU",
        img:"https://yt3.ggpht.com/a/AATXAJzZaw2Grz5hEzxECcfhg_9yuQFRKzSnAiESwA=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Tin tức dịch bệnh corona ( Covid-19 ) sáng 29/5 Tin tổng hợp virus corona Việt Nam đại dịch Vũ Hán",
        chanel:"tin tức tổng hợp",
        view: 28282 ,
        time: "1 tháng trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/494Ttt9_EUI",
        img:"https://yt3.ggpht.com/a/AATXAJzttb4CXyBqO4t0fQ9o9PMF_LNjkCiK_TnifA=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Tin tổng hợp dịch do virus Corona (Covid-19) sáng 2/6",
        chanel:"VTC NOW",
        view: 285839 ,
        time: "20 ngày trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/dQHUK2MfXvI",
        img:"https://yt3.ggpht.com/a/AATXAJw7IEF7_uDNMJEb1OwyMSu4IH3Pudk939eZcg=s48-c-k-c0xffffffff-no-rj-mo",
        title:"BỘ Y TẾ HƯỚNG DẪN ĐEO KHẨU TRANG ĐÚNG CÁCH",
        chanel:"Bộ Y Tế",
        view: 85699 ,
        time: "2 ngày trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/_UEVndsldCM",
        img:"https://yt3.ggpht.com/a/AATXAJw7IEF7_uDNMJEb1OwyMSu4IH3Pudk939eZcg=s48-c-k-c0xffffffff-no-rj-mo",
        title:"BỘ Y TẾ KHUYẾN CÁO RỬA TAY ĐÚNG CÁCH PHÒNG CHỐNG DỊCH",
        chanel:"Bộ Y Tế",
        view: 12525 ,
        time: "1 ngày trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/Xgw2y7XOVHU",
        img:"https://yt3.ggpht.com/a-/AOh14GhwxRMn9yjmyTd6DoXMOZv2bhxfYLtxvS_ITw=s68-c-k-c0x00ffffff-no-rj-mo",
        title:"Tin tổng hợp dịch do virus Corona (Covid-19) sáng 24/6: Làn sóng virus Corona thứ 2 ",
        chanel:" VTC Now",
        view: 556515 ,
        time: "1 ngày trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/scGa4Q1qTRQ",
        img:"https://yt3.ggpht.com/a/AATXAJw7IEF7_uDNMJEb1OwyMSu4IH3Pudk939eZcg=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Virus corona ngày 24/6 | Tin covid-19 Việt Nam | Đức phong tỏa 350.000 dân do dịch tái bùng phát",
        chanel:"Bộ Y Tế",
        view: 752185 ,
        time: "5 giờ trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/HyovJpkPSfY",
        img:"https://yt3.ggpht.com/a/AATXAJy-wbyHZ7xEIhT3vgxi6kYJpBMyPX4vfPlyFw=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Lập Trình Python Cho Mọi Người | Game Đấm Lá Kéo | Beginner",
        chanel:"Dũng Lai Lập Trình",
        view: 141485 ,
        time: "12 giờ trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/vOIm4mAAG8Q",
        img:"https://yt3.ggpht.com/a/AATXAJwAgVhKik2CCHsDfgGHbz9fpxbIPbBlK7QkyA=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Bằng chứng thép II 12/30",
        chanel:"Kênh TBV tiếng việt",
        view: 41556 ,
        time: "12 ngày trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/PLUneHOrcLU",
        img:"https://yt3.ggpht.com/a/AATXAJwHUgsDuEgeBwNrvw7MljGVyYH0fgSWVzAoNA=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Thánh Bài 3 Châu Tinh Trì | Vân Sơn Chuyển Âm.",
        chanel:"Vân Sơn",
        view: 282895 ,
        time: "12 tháng trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/Z5DLctUxjLA",
        img:"https://yt3.ggpht.com/a/AATXAJwsKaZDrtxrWGkxCOB3wgAP3rjI78OS_WR7Sg=s48-c-k-c0xffffffff-no-rj-mo",
        title:"日軍迫擊炮實在強大，和八路軍血拼到底終於取得優勢，不料關鍵時刻形式再次逆轉",
        chanel:"七不哒哒",
        view: 560000 ,
        time: "1 tháng trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/T_27ife-qxs",
        img:"https://yt3.ggpht.com/a/AATXAJypbnB9iKMLgXIIIAGffXo2mnsWMi03D5LDlw=s48-c-k-c0xffffffff-no-rj-mo",
        title:"LK Nhạc Trẻ 8x 9x Hay Nhất | Những Ca Khúc Nghe Một Lần Nhớ Một Đời",
        chanel:"Tình khúc Vàng",
        view: 58258 ,
        time: "8 tháng trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/ugLTvtkJSpc",
        img:"https://yt3.ggpht.com/a/AATXAJy7IpOT_wWSGGxueElrUK7Q9CJinZjVBSiYhw=s48-c-k-c0xffffffff-no-rj-mo",
        title:"BẢN NĂNG CỦA LOÀI GẤU",
        chanel:"Khoa Học - Đời Sống",
        view: 382845 ,
        time: "1 năm trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/eyHyR5KfEGk",
        img:"https://yt3.ggpht.com/a/AATXAJwg4lq0Ix5RRXxx5ccllcAKXwJIEWimdaHjAQ=s48-c-k-c0xffffffff-no-rj-mo",
        title:"10 Ký Sinh Trùng Ngoài Đời Thật Có Thể Điều Khiển Vật Chủ Gây Sốc | Phát Hiện Nổ Não",
        chanel:"XEM GÌ HÔM NAY",
        view: 547845 ,
        time: "2 giờ trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/jDTfdP13F54",
        img:"https://yt3.ggpht.com/a/AATXAJz6eDF86hcQ6qh9HuZ6dK2uu3m-Md7miIfkcA=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Thế giới động vật, những loài vật săn mồi nguy hiểm nhất hành tinh",
        chanel:"Channel Vivlog",
        view: 57847 ,
        time: "4 năm trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/oOOCAESOI-8",
        img:"https://yt3.ggpht.com/a/AATXAJzXq2EKjQPim9bgwsMtzmghj0FAyKMiD8aMkg=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Thế Giới Động Vật Hoang Dã | Sức Mạnh Của Trí Tuệ Siêu Việt Trong Cuộc Chiến Sinh Tồn",
        chanel:"Thế Giới Động Vật Hoang Dã - VTV",
        view: 477148 ,
        time: "2 năm trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/fjO5Plmqiyg",
        img:"https://yt3.ggpht.com/a-/AOh14GiFxF9OJQ73-2hXmua1TbMAb0eoitBNMEy3Jg=s68-c-k-c0x00ffffff-no-rj-mo",
        title:"Thám Tử Lừng Danh Conan - Tập 35 - Vụ Án Giết Nhà Ngoại Giao Phần 2",
        chanel:"POPS Anime",
        view: 858552 ,
        time: "3 tháng trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/NLzK52ERSu8",
        img:"https://yt3.ggpht.com/a-/AOh14Ghu1gqmEFSUvVX7TcVc9pA6FWxrwclS64dE=s68-c-k-c0x00ffffff-no-rj-mo",
        title:"Nhạc Elvis Phương Hải Ngoại - 22 Tình Khúc Để Đời Làm Nên Đẳng Cấp Elvis Phương",
        chanel:"Giọng ca Hải Ngoại",
        view: 25253200 ,
        time: "4 tháng trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/H40XskT5Wl0",
        img:"https://yt3.ggpht.com/a-/AOh14Gg6A55pCpf3vNuEuZReLGceOXmOhqSGUSi_9A=s68-c-k-c0x00ffffff-no-rj-mo",
        title:"MƯA ‣ NHỮNG BÀI HÁT HAY NHẤT VỀ MƯA",
        chanel:"TaLagio",
        view: 520000000000 ,
        time: "1 tháng trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/8ot7_7n5ajc",
        img:"https://yt3.ggpht.com/a-/AOh14GgioWneAfDREp9J6Sopd7Tf-DcNSLMXy_30KQ=s68-c-k-c0x00ffffff-no-rj-mo",
        title:"Miền Tây Mùa Khô - Bắt Cá Lóc Cạn Nhiều Thấy Mà Mê",
        chanel:"Hội Ngộ Miền Tây",
        view: 525255 ,
        time: "8 tháng trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/d2eDslWYvAg",
        img:"https://yt3.ggpht.com/a-/AOh14GgAmUOPLo0v2nPL48dab4WTYqGRjNYsspWaBQ=s68-c-k-c0x00ffffff-no-rj-mo",
        title:"Acoustic Love Songs | The Best Love Songs Of 80's And 90's",
        chanel:"Music Collection 2019",
        view: 858925 ,
        time: "2 tuần trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/Rv91cREyDs0",
        img:"https://yt3.ggpht.com/a/AATXAJwvIvdmDSjmUemf-B5zwJ1zscrqc7ClzS_GLQ=s48-c-k-c0xffffffff-no-rj-mo",
        title:"Tình Sầu Thiên Thu Muôn Lối Remix",
        chanel:"Music Collection 2019",
        view: 257712 ,
        time: "2 tuần trước",
    }
    ,
    {
        link:"https://www.youtube.com/embed/3l7znNHJhsE",
        img:"https://yt3.ggpht.com/a-/AOh14GgKQZGodCPEkpP-cjD7m2Lr9VSaRSvV_iMY2g=s68-c-k-c0x00ffffff-no-rj-mo",
        title:"日本料理 龍吟 龍鱗2012",
        chanel:"TOKYOGASTRONOMY",
        view: 882825 ,
        time: "3 tuần trước",
    }
]


app.listen(3000, function() {
    console.log("Hello nodejs running on port 3000- 15/7")
})