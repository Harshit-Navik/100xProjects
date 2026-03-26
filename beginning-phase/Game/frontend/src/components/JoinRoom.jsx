import React from 'react'
import { Link } from 'react-router-dom';
import { io } from "socket.io-client";
import { useState } from 'react';

const JoinRoom = () => {
    const [roomId, setRoomId] = useState("");

    const joinRoom = (roomId) => {
       if (!roomId) {
            console.log("Room ID and members are required");
            return;
        }

        const socket = io("http://localhost:8080");

        socket.emit("join_room", {
            roomId: roomId,
        });

        console.log(`joining room with roomId: ${roomId} as user`);

    };
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-10 w-[350px] flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Join Room
        </h2>

        {/* Room ID Input */}
        <input
          type="text"
          value={roomId}
          onChange={(e) => {setRoomId(e.target.value)}}
          placeholder="Enter Room ID"
          className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Join Button */}
        <Link to={"/chat"}
        onClick={() => joinRoom(roomId)}
          className="w-full py-3 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-green-500/30 transition-all duration-300"
        >
          Join Room
        </Link>
      </div>
    </div>
  );
}

export default JoinRoom