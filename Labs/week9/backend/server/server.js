const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {

    if(err) {return console.log(err)}

    const dbName = 'mydb';
    const db = client.db(dbName);
    const collection = db.collection('products');

    require('../App/add.js')(collection, app);
    require('../App/read.js')(collection, app);
    require('../App/update.js')(collection, app);
    require('../App/remove.js')(collection, app);

    require('./listen.js')(http);

});