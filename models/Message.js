const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    roomID : {
        type : String,
        required : true
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    message : {
        type : String,
        required : true,
        maxlength : 150
    },
    time : {
        type: String,
        required :true,
        default : Date.now
    }
},
{ 
    timestamps: true 
});

module.exports = mongoose.model('Message', MessageSchema);
