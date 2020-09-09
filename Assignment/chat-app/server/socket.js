const { Socket } = require("dgram");

module.exports = {

  connect: function(io, PORT) {

    io.on('connection', (socket) => {
      console.log('User connection on port ' + PORT + ' : ' + socket.id);
      socket.on('disconnect', () => {
        console.log('User has disconnect');
      });

      socket.on('message', (data) => {
        io.in(data.room).emit('message', {username: data.username, message: data.message});
      });

      socket.on('join', (data) => {
          socket.join(data.room);
          console.log(data.username + ' entered ' + data.room);

          socket.broadcast.to(data.room).emit('new user joined', {username:data.username, message: 'has joined'});
      });

      socket.on('leave', (data) => {

        console.log(data.username + ' left ' + data.room);
        socket.broadcast.to(data.room).emit('user left', {username:data.username, message: 'has left'});
        socket.leave(data.room);
    });

    });
  }
};
