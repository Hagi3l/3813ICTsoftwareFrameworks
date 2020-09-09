const { Socket } = require("dgram");

module.exports = {

  connect: function(io, PORT) {

    io.on('connection', (socket) => {
      console.log('User connection on port ' + PORT + ' : ' + socket.id);
      socket.on('disconnect', () => {
        console.log('User has disconnect');
      });

      socket.on('message', (message) => {
        io.emit('message', message);
      });

      socket.on('join', (data) => {
          socket.join(data.room);
          console.log(data.username + ' entered ' + data.room);

          socket.broadcast.to(data.room).emit('new user joined', {username:data.username, message: 'has joined'});
      });

    });
  }
};
