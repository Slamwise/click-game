import React, { useEffect, useState } from 'react';
import './App.css';
import { UserName } from "./components/userName";
import { Leaderboard } from "./components/leaderBoard";
import { socket } from "./services/socketService"

function App() {

  const [gameStarted, setGameStarted] = useState(false)
  const [incomingRequest, setIncomingRequest] = useState(false)

  const handleAccept = (e) => {
      socket.emit('start_game')
  }


  socket.on('game_request', (data) => {
      setIncomingRequest(true)
  })

  useEffect(() => {
    fetch(`http://localhost:3001/setCookies`, {
      method: `POST`,
      credentials: 'include'
      })
  }, [])

  if (gameStarted === false) {
    if (incomingRequest === false) {
    return (
      <div>
        <UserName></UserName>
        <Leaderboard></Leaderboard>
      </div>
          )}
    else {
      return (
          <div>
            <button onClick={()=>setGameStarted(true)}> Accept Request </button>
            <button onClick={()=>setIncomingRequest(false)}> Reject Request </button>
          </div>
      )
      }
    }
  else {
    return(
      <div>Nothin</div>
    )
  }
}
export default App;