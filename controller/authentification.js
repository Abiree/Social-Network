
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
 
