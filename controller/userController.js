const userSchema = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

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

module.exports.getAllUsers = async(req,res)=>{
    try{
        const users = await userSchema.find().select('-password'); 
        res.status(200).json(users); 
    }catch{
        err => res.status(400).send(err.message);
    }
}

module.exports.getUser = async(req,res)=>{ 
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else{
        try{
            const user = await userSchema.findById(req.params.id).select('-password');
            res.status(200).json(user);  
        }catch{
            err => res.status(500).send(err.message);
        }
    }
    
}

module.exports.updateUser = async(req,res)=>{
    const {biographie,avatar} = req.body;
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else{
        try{
            await userSchema.findOneAndUpdate(
                {
                    _id : req.params.id,
                },
                {
                    biographie : biographie,
                    avatar : avatar
                },
                {
                    new : true
                }
            )
            res.status(200).json({message:'user updated'});
        }catch{
            err => res.status(500).send(err.message);
        }
    }
}

module.exports.deleteUser = async(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id :');
    }  
    else{
        try {
            await userSchema.findOneAndDelete(
                {
                    _id:req.params.id
                }
            );
            res.status(200).json({id:req.params.id,message:'has been deleted'});
        } catch {
            err=> res.status(500).send(err.message);
        }    
    }  
}

module.exports.sendInvitation = async(req,res)=>{
    //on parametre on pass id de la personne à inviter 
    //on body l'id de la personne qui passer l'invitation
    if(!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.id)){
        res.status(400).send('Unkown Id : ');
    }  
    else{
        try {
            const user = await userSchema.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet:{invitationlist:req.body.id}
                },
                {
                    new: true
                }
            );
            res.status(200).send(user);
        } catch {
            err=> res.status(500).send(err.message);
        }    
    }  
}