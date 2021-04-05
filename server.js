const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// init express
const app = express();
// bodyparser middleware
app.use(bodyParser.json());
//db config
const db = require('./config/keys').mongoURI;
//connect to DB
mongoose.connect(db).then(()=>console.log("Connected ...")).catch(err => console.log(err));
//expose port 
const port = process.env.PORT || 5000;
//listen to port
app.listen(port , ()=>console.log(`server listening on '${port}`));

