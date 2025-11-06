const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('join_channel', (channel) => {
    socket.join(channel);
    console.log('Entrou no canal ' + channel);
  });

  socket.on('send_message', ({ channel, username, message }) => {
    io.to(channel).emit('receive_message', { username, message });
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

http.listen(PORT, () => {
  console.log('Servidor ouvindo na porta ' + PORT);
});
