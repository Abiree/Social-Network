const User =  require('../models/user');
const Chat = require('../models/chat');
const { v4: uuidV4} = require("uuid");
const mongoose = require('mongoose');
const Message = require('../models/Message');

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
        if(chat.length > 0){
            socket.emit("openChat", {...chat[0]});
        }else{
            Chat.aggregate([
                {
                    $match: {
                        receiverID : mongoose.Types.ObjectId(senderID),
                        senderID : mongoose.Types.ObjectId(receiverID),
                    }
                }
            ]).then((chat)=>{
                if(chat.length > 0){
                    socket.emit("openChat",{...chat[0]});
                    //console.log(chat[0])
                }
                else{
                    console.log('does not exists' , senderID , receiverID);
                    const newChat = {
                        ...user,
                        roomID : uuidV4(),
                    };
                    Chat.create(newChat);
                    console.log(newChat);

                    //socket.emit("openchat", newChat);
                    
                }
            })
        }
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

            socket.on("joinTwoUsers", ({roomID},cb)=>{
                socket.join(roomID);
                cb({roomID});
            });

            socket.on('sendTouser',(data)=>{
                socket.broadcast.to(data.roomID).emit('dispatchMsg', {...data});
                const {
                    roomID,
                    senderID,
                    receiverID,
                    composeMsg : {
                        time,
                        message
                    }
                } = data;
                console.log(data);
                Message.create({roomID,senderID,receiverID,time,message});

            })
        })
    });
    
}


