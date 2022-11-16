import React, { useEffect, useState } from 'react';
import './App.css';
import { UserName } from "./components/userName";
import { Leaderboard } from "./components/leaderBoard";
import { socket } from "./services/socketService"
import { OnlineBoard } from './components/onlineBoard';

function App() {

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  useEffect(() => {
    fetch(`http://localhost:3001/setCookies`, {
      method: `GET`,
      credentials: 'include'
  })
  }, [])

  return (
    <div>
      <UserName></UserName>
      <Leaderboard></Leaderboard>
      <OnlineBoard></OnlineBoard>
    </div>
        )
  }
export default App;