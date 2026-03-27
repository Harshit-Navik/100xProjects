import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "./socket"; // make sure this file exists

const CreateRoom = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState("");
    const [members, setMembers] = useState("2");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");

    const createRoom = () => {
        // 🔹 Validation
        if (!roomId.trim()) {
            setError("Room ID is required");
            return;
        }

        if (!userName.trim()) {
            setError("Username is required");
            return;
        }

        setError("");

        // 🔹 Emit event with acknowledgment
        socket.emit(
            "create_room",
            {
                roomId,
                userName,
                maxMembers: Number(members),
                role: "host",
            },
            (res) => {
                if (res.success) {
                    navigate("/chat", {
                        state: { roomId, userName, members },
                    });
                } else {
                    setError(res.message || "Failed to create room");
                }
            }
        );

        localStorage.setItem("userName", userName);

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-10 w-[350px] flex flex-col gap-6">

                <h2 className="text-2xl font-bold text-white text-center">
                    Create Room
                </h2>

                {/* Error Message */}
                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                {/* Room ID */}
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                />

                {/* Username */}
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                />

                {/* Members */}
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
                <button
                    onClick={createRoom}
                    className="w-full py-3 rounded-xl flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                    Create Room
                </button>

            </div>
        </div>
    );
};

export default CreateRoom;