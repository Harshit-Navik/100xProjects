const Rooms = require("../database/database")

const createRoomHandler = (req , res) => {
    const roomId = req.body.roomId;
    const numberOfPlayer = req.body.numberOfPlayer;

    Rooms.push({
        roomId,
        numberOfPlayer,
        players : [],
    })

    Rooms.players.push({
        playerID: socket.id, 
        role: "Host",
    })
}

module.exports = createRoomHandler;