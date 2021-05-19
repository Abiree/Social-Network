const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    roomID : {
        type : String,
        required : true
    },
    senderID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    receiverID : {
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

module.exports = Message = mongoose.model('Message', MessageSchema);
