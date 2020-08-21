const express = require('express');
const app = express();

let cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');

const http = require('http').Server(app);
let server = http.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Server listening on: " + host + "port: " + port);
});

app.post('/api/auth', require('./router/api-login'));
app.post('/api/login-success', require('./router/login-success'));
