
const userSchema = require('../models/user');

module.exports.signUp = async (req,res) => {
    console.log(req.body);
    const {pseudo,email,password}=req.body;
    try{
        const user = await userSchema.create({pseudo,email,password});
        res.status(201).json({user});
    }catch{
        (err)=>res.status(400).send({err});
    }
}

module.exports.getAllUsers = (req,res)=>{
     userSchema.find().select('-password').then(users=> res.status(200).json(users))
     .catch(err=> res.status(400).json({success:false}));  
}

module.exports.getUser = (req,res)=>{ 
    userSchema.findById(req.params.id).select('-password').then(user=>res.status(200).json(user))
    .catch(err=>res.status(400).send('id Unknown : '+req.params.id));   
}


