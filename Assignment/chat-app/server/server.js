const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

sockets.connect(io, PORT);
server.listen(http, PORT);


app.post('/api/login-auth', require('./router/login'));
app.post('/api/groups', require('./router/groups.js'));
app.post('/api/channels', require('./router/channels.js'));
