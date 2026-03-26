import React from 'react'
import Chat from './components/Chat'
import { Routes, Route } from "react-router-dom";
import Options from './components/Options';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Options />} />
        <Route path="/createRoom" element={<CreateRoom />} />
        <Route path="/joinRoom" element={<JoinRoom />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  )
}

export default App