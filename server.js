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

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});