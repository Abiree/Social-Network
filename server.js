const express = require('express');
//importation de mongoose
const mongoose = require('mongoose');
//importation de body-parser
const bodyParser = require('body-parser');
//importation de cookieParser
const cookieParser = require('cookie-parser');
//importation de socketio
const socketio = require("socket.io");
//importation et utilisation de dotenv
require('dotenv').config({path:'./config/.env'});
//middleware de l'authentification
const {checkUser,requireAuth} = require('./middleware/auth.middleware');
//middleware de socket
const {connection} = require('./middleware/socket.middleware');
//importation des routes
const users = require('./routes/api/users.routes');
const posts = require('./routes/api/posts.routes');
//const chatRoomRouter = require("./routes/api/chatRoom.routes");
//Autorisation les requetes pour CLIENTS_URL
const cors = require('cors');
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
 
// init express
const app = express();
// init our socket 
const httpServer = require("http").createServer(app);
const io = socketio(httpServer).sockets;
//autorisation des requetes
app.use(cors(corsOptions));
// bodyparser middleware
app.use(bodyParser.json());
app.use(cookieParser());
//jwt (chaque fois qu'il y a une requet * cad n'import quelle requête on doit vérifier si le user dispose d'un token)
app.get('/*', checkUser);
app.get('/jwtid',requireAuth,(req,res)=>{
    res.status(200).send(res.locals.user._id);
});
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
//routes
app.use('/api/users',users);
app.use('/api/posts',posts);
//Access to folder image
app.use('/uploads/avatar', express.static(process.cwd() + '/uploads/avatar'));
app.use('/uploads/posts', express.static(process.cwd() + '/uploads/posts'));
app.use('/default', express.static(process.cwd() + '/default'));
//Socket middleware invocation 
connection(io);
/*-----------------------test-----------------------------------*/
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
    receiverID : "606c3db3c6e6831fe8512ca0",
    senderID : "606b76b7e3e0611c0ce58ab0",
}
socket.emit('startUniqueChat', chat);
/*----------------------------------------------------------------*/
//listen to port
const port = process.env.PORT
httpServer.listen(port , ()=>console.log(`server listening on ${port}`));

