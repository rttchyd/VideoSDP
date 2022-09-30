var WebSocketServer = require('websocket').server;
var http = require('http');
var clients = [];

var server = http.createServer(function(request, response) {
 
});
//Log the message on which the server is listening.
server.listen(1337, function() {
  console.log(" Server is listening on port 1337");
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

//Log if any error
function sendCallback(err) {
    if (err) console.error("send() error: " + err);
}

//This is called when any client connects to the server.
wsServer.on('request', function(request) {
    console.log(' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);
    console.log(' Connection ' + connection.remoteAddress);
    clients.push(connection);
    
    //All the messages are handled here
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // Display the received message
            console.log(' Received Message ' + message.utf8Data);
            //Broadcast to all the users connected.
            clients.forEach(function (outputConnection) {
                if (outputConnection != connection) {
                  outputConnection.send(message.utf8Data, sendCallback);
                }
            });
        }
    });
    
    connection.on('close', function(connection) {
        // close user connection
        console.log((new Date()) + " Peer disconnected.");        
    });
});