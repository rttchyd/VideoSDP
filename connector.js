var app = require('http').createServer().listen(1337);
 var io = require('socket.io').listen(app);

 io.sockets.on('connection', function(socket) {
         socket.on('message', function(message) {
         socket.broadcast.emit('message', message);
     });
 });