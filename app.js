var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  //socket.on('user connected', function(user) {
  //  socket.broadcast.emit('user connected', user);
  //});
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
