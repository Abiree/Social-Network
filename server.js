const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path:'./config/.env'});
const users = require('./routes/api/users.routes')
// init express
const app = express();
// bodyparser middleware
app.use(bodyParser.json());
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

