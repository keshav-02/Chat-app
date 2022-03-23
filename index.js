const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');

const users = {};   //empty object

app.use('/',express.static(path.join(__dirname,'public')));

io.on('connection', (socket)  => {
    // console.log(`Connection Established with --> ${socket.id}`);
    
    socket.on('send_msg', (data) => {
        io.emit('received_msg', {
            msg:data.msg,
            user:users[socket.id]
        })
    });

    socket.on('login', (data) => {
        users[socket.id] = data.user;   //mapping key-value pairs, for displaying USERNAME instead of SOCKET.ID
    });

})

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server running at port ${port}`);
})