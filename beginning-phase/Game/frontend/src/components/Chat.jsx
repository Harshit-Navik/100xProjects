import React from 'react'
import { io } from "socket.io-client";

const Chat = () => {

  
    



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 text-white text-lg font-semibold">
        Chat Room
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Example message */}
        <div className="bg-gray-800 text-white px-4 py-2 rounded-xl w-fit max-w-[70%]">
          Hello 👋
        </div>

        {/* Example own message */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded-xl w-fit max-w-[70%] ml-auto">
          Hi there!
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat