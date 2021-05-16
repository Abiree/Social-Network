const mongoose = require("mongoose");

const chatroomschema = new mongoose.Schema({
    name : {
        type : String,
        required : "Name is required!"
    }
});

module.exports = mongoose.model('Chatroom', chatroomschema);