 const jwt = require('jsonwebtoken');
 const userSchema = require('../models/user');

 module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET,async (err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                res.cookie('jwt','',{maxAge: 1});
                res.status(400).send("Bad Token");
                next();
            }
            else{
                
                let user = await userSchema.findById(decodedToken.id);
                res.locals.user = user;
                console.log(user);
                next();
              
            }
        })
    }
    else{
        res.locals.user = null;
        res.status(400).send("No Token");
        next();
    }
 }

 module.exports.requireAuth = (req,res,next) => {
     const token = req.cookies.jwt;
     if(token){
         jwt.verify(token,process.env.TOKEN_SECRET,async (err,decodedToken)=>{
             if(err){
                 console.log(err);
             }
             else{
                 console.log(decodedToken.id);
                 next();
             }
         })
     }else{
         console.log('No token');
     }
 }