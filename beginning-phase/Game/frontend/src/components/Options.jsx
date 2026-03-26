import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Options() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/60 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6"
      >

        <Link to="/createRoom"
          className="w-56 py-3 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-blue-500/30 transition-all duration-300"
        >
          Create Room
        </Link>

        <Link to="/joinRoom"
          className="w-56 py-3 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-green-500/30 transition-all duration-300"
        >
          Join Room
        </Link>
      </motion.div>
    </div>
  );
}
