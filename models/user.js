const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    pseudo:{
        type:String,
        required:true,
        minlength:5,
        maxlength:20,
        unique:true,
        trim : true 
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate:[isEmail],
        trim:true
    },
    password:{
        type:String,
        required: true,
        minlength:5,
        maxlength:20,
    },
    biographie:{
        type : String,
        maxlength : 1024
    },
    avatar:{
        type : String,
        default: "./default/user.png"
    },
    friendlist:{
        type : [String]
    },
},
{ 
    timestamps: true 
})

userSchema.pre("save", async function(){
    const salt  = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
});

module.exports = User = mongoose.model('user',userSchema);