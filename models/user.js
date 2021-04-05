const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        default: ""
    },
    friendlist:{
        type : [String]
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    updateDate:{
        type:Date,
        default:Date.now
    }


})

module.exports = User = mongoose.model('user',userSchema)