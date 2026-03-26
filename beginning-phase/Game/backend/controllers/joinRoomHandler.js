const Rooms = require("../database/database")

const joinRoomHandler = (req, res) => {
    const roomId = req.body.roomId;
    const role = "player";

    const Room = Rooms.map(room => room.roomId == roomId);
    if(!Room){
        return res.status(403).json({
            message : "room doesnt exit ..."
        })
    }

    Room.players.push({
        role,
        playerId: socket.id 
    })
};

module.exports = joinRoomHandler;