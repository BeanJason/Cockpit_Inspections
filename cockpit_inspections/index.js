const express = require('express');
// const mysql = require("mysql");
// const Connection = require('mysql/lib/Connection');
const app = express();

const fs = require('fs');
var path = require('path')


const cors = require('cors');

app.use(cors({origin: '*'}));
app.use(express.json());

function readJSON(fileName) {
    readFile(fileName + '.JSON', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err);
        } else {
            try {
                const data = JSON.parse(jsonString);
                console.log(data)
                return data;
            } catch (err) {
                console.log("Error parsing JSON", err);
                return err;
            }
        }
    })
}


app.get('/getData/:fileName', (req, res) => {
    data = JSON.parse(fs.readFileSync(req.params.fileName + ".JSON", 'utf8'));
    console.log('received from client: ' + req.query.first_piece_approval)
    res.send(data);
});

app.post('/add1stPieceApprovalProcess', (req, res) => {
    console.log("write file")
    const date = (req.body.date).split('/');
    const parsedDate = date[0] + date[1] + date[2];
    const shift = req.body.shift;
    const pressNum = req.body.pressNum;
    var data = {}
    data.first_piece_approval = []
    const supervisorData = {
        initial: req.body.initial,
        shift: req.body.shift,
        pressNum: req.body.pressNum,
        cavityNum: req.body.cavityNum,
        part: req.body.part,
        date: req.body.date,
        time: req.body.time,
        moldSet: req.body.moldSet,
        purgeIn: req.body.purgeIn,
        down8: req.body.down8,
        processChange: req.body.processChange,
    };
    data.first_piece_approval.push(supervisorData)
    console.log("data/" + "s" + shift + "d" + parsedDate + ".JSON")
    fs.writeFileSync("../data/" + "s" + shift + "d" + parsedDate + "p" + pressNum + ".JSON", JSON.stringify(data));
});

app.listen('3000', () => {
    console.log('Listening on port 3000')
})