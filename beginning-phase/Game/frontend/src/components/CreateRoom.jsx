import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { io } from "socket.io-client";

const CreateRoom = () => {

    const [roomId, setRoomId] = useState("");
    const [members, setMembers] = useState("2");

    const createRoom = () => {
        if (!roomId || !members) {
            console.log("Room ID and members are required");
            return;
        }

        const socket = io("http://localhost:8080");

        socket.emit("create_room", {
            roomId: roomId,
            maxMembers: members,
            role: "host"
        });

        console.log("Creating room:", roomId, "with members:", members);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-10 w-[350px] flex flex-col gap-6">

                <h2 className="text-2xl font-bold text-white text-center">
                    Create Room
                </h2>

                {/* Room ID Input */}
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                />

                {/* Members Dropdown */}
                <select
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                >
                    <option value="2">2 Members</option>
                    <option value="3">3 Members</option>
                    <option value="4">4 Members</option>
                </select>

                {/* Button */}
                <Link
                    to="/chat"
                    onClick={() => {createRoom()}}
                    className="w-full py-3 rounded-xl flex items-center justify-center bg-blue-500 text-white"
                >
                    Create Room
                </Link>

            </div>
        </div>
    );
}

export default CreateRoom;