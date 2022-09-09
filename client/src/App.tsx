import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { UserName } from "./components/userName";
import { Users } from "./components/users";
import { socket } from "./services/socketService"
import styled from "styled-components";

const UsersPanel = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 1em;
  `;

function App() {

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });


  return (
    <div>
      <div>
        <UserName />
      </div>
      <UsersPanel>
        <Users />
      </UsersPanel>
    </div>
        )
  }
export default App;