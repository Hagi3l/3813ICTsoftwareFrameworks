const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

//require('./routes/accountroutes.js')(app, path);

let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("My first Nodejs Server!");
    console.log("Server listening on: " + host + "port: " + port);
});

