import React, { useState } from "react"
import { socket } from "../../services/socketService"
import cookie from "cookie"
import "../../styles/username.css"

export function UserName() {
    const [userName, setUserName] = useState("")
    const [userNameSubmitted, setUserNameSubmitted] = useState(false)

    async function updateFlag(e) {
        setUserNameSubmitted(true)
        e.preventDefault()
        socket.auth = { userName }
        socket.connect()
        const cookies = cookie.serialize("cookies", "1234")
        await fetch(`http://localhost:3001/users/new?username=${userName}`, {
            method: `POST`,
        })
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