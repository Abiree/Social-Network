const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    time:{
        type : String,
        default : Date.now
    },
    receiverID : {
        type : mongoose.Schema.Types.ObjectID,
        required : true
    },
    senderID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    roomID: {
        type : String,
        required : true
    } 
});

module.exports = Chat = mongoose.model('chats', chatSchema);