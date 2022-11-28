import React, { useEffect, useState } from 'react';
import './App.css';
import { UserName } from "./components/userName";
import { Leaderboard } from "./components/leaderBoard";
import { socket } from "./services/socketService"

function App() {

  const [incomingRequest, setIncomingRequest] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [opponent, setOpponent] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(10)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const handleAccept = (e) => {
      socket.emit('start_game')
      setGameStarted(true)
  }

  socket.on('game_request', (data) => {
      setOpponent(data.auth.userName)
      setIncomingRequest(true)
  })

  socket.on('request_accepted', (data) => {
      setGameStarted(true)
  })

  useEffect(() => {
    fetch(`http://localhost:3001/setCookies`, {
      method: `POST`,
      credentials: 'include'
      })

    // Broken:
    // socket.emit('updateOnline')
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
            <button className='request-button' onClick={()=>setGameStarted(true)}> Accept Request </button>
            <button className='request-button' onClick={()=>setIncomingRequest(false)}> Reject Request </button>
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