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
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/api/insert", (req, res) => {

    const ownerName = req.body.ownerName
    const wheelColor = req.body.wheelColor
    const paintColor = req.body.paintColor
    const interior = req.body.interior
    const seat = req.body.seat


    const sqlInsert = "INSERT INTO carlist(ownerName, wheelColor, paintColor, interior, seat) VALUES (?, ? ,?, ?, ?);"
    db.query(sqlInsert, [ownerName, wheelColor, paintColor, interior, seat], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("Server Running");

    const sqlInsert = "TRUNCATE TABLE carlist;"
    db.query(sqlInsert, (err, result) => {
        console.log(result);
    });
});