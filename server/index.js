const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'showroom'
})

app.use(cors());
app.use(express.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true , limit: '5mb'}))


app.get("/api/get", (req, res) => {

});

app.post("/api/insert", (req, res) => {

    const ownerName = req.body.ownerName
    const wheelColor = req.body.wheelColor
    const paintColor = req.body.paintColor
    const secondaryPaintColor = req.body.secondaryPaintColor
    const interior = req.body.interior
    const seat = req.body.seat
    const email = req.body.email
    const decal = req.body.decal
    console.log(decal)
 

    const sqlQuery = 
        "INSERT INTO carlist( ownerName, wheelColor, paintColor, secondaryPaintColor, interior, seat, email, decal) VALUES (? , ? , ? , ? , ? , ? , ?, ?);"
    console.log(sqlQuery)
    db.query(sqlQuery, [ownerName, wheelColor, paintColor, secondaryPaintColor, interior, seat, email, decal], (err, result) => {
        console.log(result);
        console.log(err);
    });
});

app.get("/api/truncate", (req, res) => {
    const sqlQuery = "TRUNCATE TABLE carlist;"
    db.query(sqlQuery, (err, result) => {
        console.log(result);
    });
});
app.listen(3001, () => {
    console.log("Server Running");


});