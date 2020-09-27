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

    // SEED
    // require('./router/seed')(usersCollection, groupsCollection, channelsCollection, ObjectID);

    // User - REST
    require('./router/users/add-new-user')(usersCollection, app); // Add user
    require('./router/users/get-users')(usersCollection, app); // Get all users
    require('./router/users/update-user')(usersCollection, app, ObjectID); // update user
    require('./router/users/delete-user')(usersCollection, app, ObjectID); // remove user

    // Login
    require('./router/auth/login-auth')(usersCollection, app); // Check for valid user then returns user object

    // Group - REST
    require('./router/groups/get-groups')(groupsCollection, app); // Get all groups
    require('./router/groups/add-group')(usersCollection, groupsCollection, app, ObjectID); // Add new group
    require('./router/groups/update-group')(usersCollection, groupsCollection, app, ObjectID); // Update group (includes adding group assistants and users)
    require('./router/groups/delete-group')(groupsCollection, app, ObjectID); // delete groups

    // Channels - REST
    require('./router/channels/get-channels')(channelsCollection, app); // get channels
    require('./router/channels/add-channel')(channelsCollection, app, ObjectID); // add channels
    require('./router/channels/update-channel')(channelsCollection, app, ObjectID); // update channels
    // delete channels
    // add user to channel
    // save chat history
    // Add active user to channel
    // Remove active user from channel

});
