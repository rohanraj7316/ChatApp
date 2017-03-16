/**
 * Created by ROHANRAJ on 21-01-2017.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/',function (req,res) {
   res.sendFile(__dirname + '/pg1.html');
});
io.on('connection',function (socket) {
    console.log('a user is connected');
    socket.on('chat_message',function(msg){
        console.log('message',msg);
    io.emit('chat_message',msg);
    });
});



http.listen(3030,function () {
    console.log("the server is working at 3030 port");
});