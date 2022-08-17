import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { UserName } from "./components/userName";

function App() {

  const socket = io("http://localhost:3001", { autoConnect: false });

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  const [userName, setUserName] = useState("");
  const [userNameSubmitted, setUserNameSubmitted] = useState(false);

  // const updateFlag = (e) => {
  //   setUserNameSubmitted(true);
  //   e.preventDefault();
  //   socket.auth = { userName };
  //   socket.connect();
  // };
  


  return (
    <UserName />
        )
  }
export default App;