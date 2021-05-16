const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({path:'./config/.env'});
const {checkUser,requireAuth} = require('./middleware/auth.middleware')
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
//autorisation des requetes
app.use(cors(corsOptions));
// bodyparser middleware
app.use(bodyParser.json());
app.use(cookieParser());
//jwt (chaque fois qu'il y a une requet * cad n'import quelle requête on doit vérifier si le user dispose d'un token)
app.get('*', checkUser);
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
app.use('/uploads/avatar', express.static(process.cwd() + '/uploads/avatar'))
app.use('/uploads/posts', express.static(process.cwd() + '/uploads/posts'))
app.use('/default', express.static(process.cwd() + '/default'))
//listen to port
const port = process.env.PORT
app.listen(port , ()=>console.log(`server listening on ${port}`));

