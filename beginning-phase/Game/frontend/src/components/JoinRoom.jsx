import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "./socket"; // reuse same socket

const JoinRoom = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");

    const joinRoom = () => {
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

        // 🔹 Emit with acknowledgment
        socket.emit(
            "join_room",
            { roomId, userName },
            (res) => {
                if (res.success) {
                    // ✅ Navigate only if join successful
                    navigate("/chat", {
                        state: { roomId, userName },
                    });
                } else {
                    setError(res.message || "Failed to join room");
                }
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-10 w-[350px] flex flex-col gap-6">

                <h2 className="text-2xl font-bold text-white text-center">
                    Join Room
                </h2>

                {/* Error */}
                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                {/* Room ID */}
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter Room ID"
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

                {/* Button */}
                <button
                    onClick={joinRoom}
                    className="w-full py-3 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg hover:scale-105 transition"
                >
                    Join Room
                </button>

            </div>
        </div>
    );
};

export default JoinRoom;