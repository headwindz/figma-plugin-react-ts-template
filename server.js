const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
const PORT = 9001;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send(200).send('working');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const BROWSER = 'browser';
const PLUGIN = 'plugin';

const roles = {
  [BROWSER]: [],
  [PLUGIN]: []
};

io.on('connection', socket => {
  socket.on('disconnect', reason => {
    console.log(`${socket.id} disconnected for ${reason}`);
  });

  socket.on('message', message => {
    if (roles[BROWSER].includes(socket.id)) {
      socket.broadcast.emit(
        'message',
        JSON.stringify({ message, src: BROWSER })
      );
    } else if (roles[PLUGIN].includes(socket.id)) {
      socket.broadcast.emit(
        'message',
        JSON.stringify({ message, src: PLUGIN })
      );
    }
  });

  socket.on('role', role => {
    if (roles[role].includes(socket.id)) {
      return;
    }
    roles[role] = [
      ...(roles[role] || []),
      socket.id
    ];
  });
});

server.listen(PORT, () => {
  console.log(`Preview server started on port: ${PORT}`);
});
