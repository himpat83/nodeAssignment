var express = require('express');
var app = express();
var mongojs = require('mongojs');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const DATABASE_NAME = "contactlist";



var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactlist', function(req, res) {
    console.log("i Received request")
    db.contactlist.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist', function(req, res) {
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log("my deleted object" + id);
    db.contactlist.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {

        res.json(doc);

    });
});

app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log("my updated object" + id);
    db.contactlist.findOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {

        res.json(doc);

    });
});

app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log("my put object" + req.body.name);
    db.contactlist.findAndModify({ query: { _id: mongojs.ObjectId(id) }, update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number } }, new: true }, function(err, doc) {
        res.json(doc);
    });
});



app.listen(3001, () => {
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("contactlist");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});
console.log("server running on port 3001");