const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

const Rooms = [];

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
  console.log("User connected:", socket.id);


  socket.on("create_room", ({ roomId, maxMembers, role, userName }, callback) => {

    const existingRoom = Rooms.find(room => room.roomId === roomId);

    if (existingRoom) {
      return callback({ success: false, message: "Room already exists" });
    }

    const newRoom = {
      roomId,
      maxMembers,
      users: []
    };

    newRoom.users.push({
      socketId: socket.id,
      role,
      userName
    });

    Rooms.push(newRoom);

    socket.join(roomId);

    console.log(" Room created:", roomId);
    console.log(Rooms);

    callback({ success: true });
  });

  socket.on("join_room", ({ roomId, userName }, callback) => {

    const room = Rooms.find(r => r.roomId === roomId);

    if (!room) {
      return callback({ success: false, message: "Invalid Room ID" });
    }

    if (room.users.length >= room.maxMembers) {
      return callback({ success: false, message: "Room is full" });
    }

    room.users.push({
      socketId: socket.id,
      role: "user",
      userName
    });

    socket.join(roomId);

    console.log(` ${userName} joined ${roomId}`);
    console.log(room.users);

    // notify others
    socket.to(roomId).emit("message", `${userName} joined the room`);

    callback({ success: true });
  });


  socket.on("send_message", ({ roomId, userName, message }) => {

    io.to(roomId).emit("receive_message", {
      userName,
      message,
      time: new Date().toLocaleTimeString()
    });

  });


  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);

    Rooms.forEach(room => {
      const user = room.users.find(u => u.socketId === socket.id);

      if (user) {
        // notify others
        socket.to(room.roomId).emit("message", `${user.userName} left the room`);
      }

      // remove user
      room.users = room.users.filter(u => u.socketId !== socket.id);
    });
  });

});



server.listen(8080, () => {
  console.log(" Server running on port 8080");
});