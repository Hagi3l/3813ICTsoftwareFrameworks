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
    });
  }
};
