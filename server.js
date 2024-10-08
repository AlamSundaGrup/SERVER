const app = require('./app');
const { sequelize } = require('./models');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Realtime event handling
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('/messages/create', ({ text, sender }) => {
    console.log('message from client', { sender, text });
    
    io.emit('messages:broadcast', { text, sender, createdAt: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
