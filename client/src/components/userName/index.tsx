import React, { useState, useEffect } from 'react'
import { socket } from "../../services/socketService"

import "../../styles/username.css"

export function UserName() {
    const [userName, setUserName] = useState("")
    const [userNameSubmitted, setUserNameSubmitted] = useState(false)

    const updateFlag = (e) => {
        setUserNameSubmitted(true)
        e.preventDefault()
        socket.auth = { userName }
        socket.connect()
        socket.emit('connection')
    }
    
    const updateUserName = (e: { target: { value: React.SetStateAction<string> } }) => {
        setUserName(e.target.value)
    }

    if (!userNameSubmitted || !userName){
        return (
        <div className="username-selector">
            <form onSubmit={updateFlag}>
                <label>
                Select Username:</label>
                <input type="text" onChange={updateUserName} placeholder="Please enter a username."/>
                <input type="submit" value="Submit" />
            </form>
        </div>
            )
    } else {
        return (
        <div className="username-display">
            <p>Username selected: {userName}</p>
        </div>
        )
    }
    }