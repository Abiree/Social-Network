//importation de mongoose
const mongoose = require('mongoose');
//importation et utilisation de dotenv
require('dotenv').config({path:'./config/.env'});
//import app.js
const app =require("./app");
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
//listen to port
const port = process.env.PORT
app.listen(port , ()=>console.log(`server listening on ${port}`));

