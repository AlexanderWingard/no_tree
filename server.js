var nodestatic = require('node-static');
var http = require('http');
var io = require('socket.io');

var file = new nodestatic.Server("static/");

var server = http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
});

server.listen(8080);

var socketio = io.listen(server);

socketio.on('connection', function(socket) {
    socket.emit('world', "hello");
    socket.broadcast.emit('update', "new player");

    socket.on('disconnect', function() {
        socket.broadcast.emit('update', "player disconnected");
    });

    socket.on('update', function(d) {
        socket.broadcast.emit('update', "new state");
    });
});
