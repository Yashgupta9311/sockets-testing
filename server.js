import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { Server } from "socket.io";
import express from 'express';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:'*'
    }
    
});
const ROOM="rooms";
io.on('connection', (socket) => {
  console.log('a user connected',socket.id);
  socket.on('joinroom',async (username)=>{
    console.log(`${username} is connected to the room`)
    await socket.join(ROOM)
    
    // io.to(ROOM).emit('noticeall',username)
    socket.to(ROOM).emit('noticeall',username)

  })
  socket.on('sendmsg',(msg)=>{
    socket.to(ROOM).emit('sendmsg',msg)
  })

});

app.use(express.static(path.join(__dirname, 'chat-frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat-frontend/dist/index.html'));
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});