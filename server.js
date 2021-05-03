const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({path:'./config/.env'});
const {checkUser,requireAuth} = require('./middleware/auth.middleware')
const users = require('./routes/api/users.routes');
// init express
const app = express();
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
app.use('/api/users',users)
//listen to port
const port = process.env.PORT
app.listen(port , ()=>console.log(`server listening on '${port}`));

