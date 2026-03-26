const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const Rooms = [];

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("create_room", ({ roomId, maxMembers, role }) => {

    const newRoom = {
      roomId,
      maxMembers,
      users: []
    };

    newRoom.users.push({
      role,
      userId: socket.id
    });

    Rooms.push(newRoom);

    socket.join(roomId);

    console.log("Room created:", roomId);
    console.log(Rooms);
    const Room = Rooms.find(room => room.roomId == roomId)
    console.log(Room.users);

    io.to(roomId).emit("message", "Room created successfully");
  });

  socket.on("join_room", ({ roomId }) => {

    const JRoom = Rooms.find(room => room.roomId == roomId)
    if (!JRoom) {
      return alert("invalid roomid");
    }
    socket.join(roomId);

    JRoom.users.push({
      role: "user",
      memberId: socket.id
    })
    
    socket.join(roomId);
    console.log(JRoom.users);


    io.to(roomId).emit("message", "Room created successfully");
  });

});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});