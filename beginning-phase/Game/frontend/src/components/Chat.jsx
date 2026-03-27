import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "./socket";

const Chat = () => {
    const location = useLocation();

    const { roomId, userName } = location.state || {};

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // 🔹 Auto join room on load
    useEffect(() => {
        if (!roomId || !userName) return;

        socket.emit("join_room", { roomId, userName }, (res) => {
            if (!res.success) {
                console.log(res.message);
            }
        });

    }, [roomId, userName]);

    // 🔹 Listen for messages
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        socket.on("message", (msg) => {
            console.log(msg);
        });

        return () => {
            socket.off("receive_message");
            socket.off("message");
        };
    }, []);

    // 🔹 Send message
    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit("send_message", {
            roomId,
            userName,
            message
        });

        setMessage("");
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">

            {/* Header */}
            <div className="p-4 bg-gray-800 text-white text-center font-bold">
                Room: {roomId}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-xl max-w-[60%] ${
                            msg.userName === userName
                                ? "bg-blue-500 ml-auto"
                                : "bg-gray-700"
                        }`}
                    >
                        <p className="text-sm font-semibold">{msg.userName}</p>
                        <p>{msg.message}</p>
                        <p className="text-xs text-gray-300">{msg.time}</p>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-800 flex gap-2">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 px-4 py-2 rounded-xl bg-gray-700 text-white"
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-500 rounded-xl text-white"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;