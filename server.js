
//importation de mongoose
const mongoose = require('mongoose');

//importation de socketio
const socketio = require("socket.io");
//importation et utilisation de dotenv
require('dotenv').config({path:'./config/.env'});

//middleware de socket
const {connection} = require('./middleware/socket.middleware');
//import app.js
const app =require("./app");

// init our socket 
const httpServer = require("http").createServer(app);
const io = socketio(httpServer).sockets;

//db config
const db = require('./config/keys').mongoURI;
//connect to DB
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(()=>console.log("Connected ..."))
.catch(err => console.log(err));

//Socket middleware invocation 
connection(io);
/*-----------------------test-----------------------------------
const IO = require('socket.io-client');
const socket = IO('http://localhost:5000',{
    forceNew : true,
});
socket.on('connection',()=>{console.log('connected')});
socket.emit('getUsers');
socket.on('getAllUsers',(users)=>{
    //console.log(users);
});
const chat = {
    receiverID : "606b76b7e3e0611c0ce58ab0",
    senderID : "606c3db3c6e6831fe8512ba0",
}
socket.emit('startUniqueChat', chat);
const room = {
    roomID : "hihihi"
}

socket.emit("joinTwoUsers",(room), ({roomID})=>{
    console.log(roomID)
});

const message = {
    roomID : "hihihi",
    senderID : "606c3db3c6e6831fe8512ca0",
    receiverID : "606b76b7e3e0611c0ce58ab0",
    composeMsg : {
        time : "10h15min",
        message : "hello abire"
    }
}

socket.emit('sendTouser', message);

//sent msj of senderID

socket.emit('sentMsgs',{myID:"606c3db3c6e6831fe8512ca0"},(msgs)=>{console.log(msgs)});

socket.emit('receivedMsgs',{myID:"606c3db3c6e6831fe8512ca0"},(msgs)=>{console.log(msgs)});
----------------------------------------------------------------*/
//listen to port
const port = process.env.PORT
httpServer.listen(port , ()=>console.log(`server listening on ${port}`));

