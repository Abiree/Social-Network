const User =  require('../models/user');
const Chat = require('../models/chat');
const { v4: uuidV4} = require("uuid");
const mongoose = require('mongoose');

const addUser = ({receiverID,senderID},socket)=> {
    
    if(!receiverID || !senderID){
        return {error : "Users are required"};
    }
    const user = {receiverID, senderID};
    console.log(user);
    Chat.aggregate([
        {
            $match : {
                receiverID: mongoose.Types.ObjectId(receiverID) ,
                senderID : mongoose.Types.ObjectId(senderID),
            },
        },
    ]).then((chat)=>{
        console.log(chat)
    })
}

module.exports.connection = (io) => {
    io.on("connection", (socket)=>{
        console.log("socket connected from server");
        //* Get users*//
        socket.on('getUsers',()=>{
            User.find({},(err, users)=>{
                io.emit('getAllUsers',users);
            });
            socket.on("startUniqueChat",
                ({receiverID,senderID},callback)=>{
                    addUser({receiverID,senderID},socket);
                }
            );
        })
    });
    
}


