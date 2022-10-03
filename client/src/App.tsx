import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { UserName } from "./components/userName";
import { Leaderboard } from "./components/leaderBoard";
import { socket } from "./services/socketService"
import styled from "styled-components";

function App() {

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });


  return (
    <div>
      <Leaderboard></Leaderboard>
    </div>
        )
  }
export default App;