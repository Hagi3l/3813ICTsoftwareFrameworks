const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const sockets = require('./socket.js');
const server = require('./listen.js');


const PORT = 3000;

app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {

    if(err) {return console.log(err);}

    sockets.connect(io, PORT);
    server.listen(http, PORT);

    const dbName = 'privetDB';
    const db = client.db(dbName);

    const usersCollection = db.collection('users');
    const groupsCollection = db.collection('groups');
    const channelsCollection = db.collection('channels');


    require('./router/seed')(usersCollection, groupsCollection, channelsCollection, ObjectID);

    // User - REST
    require('./router/users/add-new-user')(usersCollection, app);
    require('./router/users/get-users')(usersCollection, app);



    app.post('/api/groups', require('./router/groups.js'));
    app.post('/api/channels', require('./router/channels.js'));

});
