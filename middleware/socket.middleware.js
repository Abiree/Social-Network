const User =  require('../models/user');

module.exports.connection = (io) => {
    io.on("connection", (socket)=>{
        console.log("socket connected from server");
        //* Get users*//
        socket.on('getUsers',()=>{
            User.find({},(err, users)=>{
                io.emit('getAllUsers',users);
            })
        })

    })
}


