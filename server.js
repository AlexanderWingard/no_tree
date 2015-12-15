var nodestatic = require('node-static');
var http = require('http');
var io = require('socket.io');

var lights = [
    {pin: 2, state: 1, color: "#E6233E", x: 0, y: 70},
    {pin: 3, state: 1, color: "#66A60B", x: -90, y: -20},
    {pin: 9, state: 1, color: "#66A60B", x: 90, y: -20},
    {pin: 8, state: 1, color: "#E6233E", x: 40, y: -50},
    {pin: 4, state: 1, color: "#E6233E", x: -40, y: -50},
    {pin: 6, state: 1, color: "#8C85D2", x: 50, y:30},
    {pin: 7, state: 1, color: "#8C85D2", x: 0, y:10},
    {pin: 5, state: 1, color: "#8C85D2", x: -50, y:30}
];

var file = new nodestatic.Server("static/");

var server = http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
});

server.listen(8080);

var socketio = io.listen(server);

socketio.on('connection', function(socket) {
    socket.emit('world', lights);

    socket.on('update', function(d) {
        for(var i = 0; i < lights.length; i++) {
            if (lights[i].pin == d.pin) {
                lights[i].color = d.color
                socket.broadcast.emit('update', lights[i]);
                return;
            }
        }
    });
});
