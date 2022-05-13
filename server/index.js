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

    const ownerName = req.body.carName

    const sqlInsert = "INSERT INTO carlist(ownerName, wheelColor, paintColor, interior, seat) VALUES (?, '#5C5C5C' ,'#FFFFFF', 'Wood', 'Cloth');"
    db.query(sqlInsert, [ownerName], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("running lol");
});