var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors())

let port = 5000;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

var ObjectId = require('mongodb').ObjectId;


let dbConnection;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbConnection = db.db("reactCRUD");
})

app.get('/', async (req, res) => {
    // dbConnection.collection("users").find({}).toArray((err, result) => {
    //     if (err) throw err;
    //     res.send(result)
    // });
    let pageNumber = parseInt(req.query.pageNumber);
    let perPage = parseInt(req.query.perPage);
    console.log(pageNumber,typeof pageNumber,perPage, typeof perPage)
    let data = dbConnection.collection("characters").find({})
    .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * perPage ) : 0 )
    .limit( perPage );
    let totalCount = await data.count();
    console.log('data.count',totalCount)
        data.toArray((err, result) => {
            // console.log(result)
            let resultData = {
                data: result,
                totalCount: totalCount
            }
            if (err) throw err;
            res.send(resultData)
        });
})

app.post('/add', (req, res) => {
    console.log('req.body', req.body);
    // dbConnection.collection("users").insertOne(req.body, function (err, resp) {
    //     if (err) throw err;
    //     res.send(resp)
    // });
    dbConnection.collection("characters").insertOne(req.body, function (err, resp) {
        if (err) throw err;
        res.send(resp)
    });
})

app.post('/edit', (req, res) => {
    // console.log('req.body',req.body);
    let mongoId = req.body._id;
    delete req.body._id;

    // dbConnection.collection("users").findOneAndUpdate({ '_id': ObjectId(mongoId) }, { $set: req.body }, (err, result) => {
    //     if (err) throw err;
    //     res.send(result)
    // })
    dbConnection.collection("characters").findOneAndUpdate({ '_id': ObjectId(mongoId) }, { $set: req.body }, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.delete('/delete', (req,res) => {
    dbConnection.collection("characters").findOneAndDelete({ '_id': ObjectId(req.body._id) }, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})


app.listen(port, () => {
    console.log('Server is running on port ' + port);
});