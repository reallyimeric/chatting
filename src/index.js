const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const options = {
  path: '/chat',
};
const io = require('socket.io')(server, options);

// const fs = require('fs')
// app.get('/', (req, res) => {
//   const indexHtml = fs.createReadStream(`${__dirname}/index.html`)
//   indexHtml.pipe(res)
// })
// app.use('/public', express.static(`${__dirname}/public`))
// app.use('/js', express.static(`${__dirname}/js`))

server.listen(3000, () => {
  console.log('started listening on *:3000');
  console.log(`socket path is ${io.path()}`);
});

io.set('transports', ['websocket']);
io.on('connection', (socket) => {
  console.log(io.sockets.connected[socket.id].id);
  console.log(`${new Date()}: ${socket.id} connected, namespace is ${io.sockets.name}`);
  socket.on('disconnect', () => {
    console.log(`${new Date()}: ${socket.id} disconnected`);
  });
  socket.on('say', (msg) => {
    console.log(`${new Date()}: MSG: ${socket.id} :"${msg}"`);
    io.emit('broadcast', socket.id, msg);
  });
});
