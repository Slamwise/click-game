import React, { useState, useEffect } from "react"
import { socket } from "../../services/socketService"
import "../../styles/username.css"
import { OnlineBoard } from "../onlineBoard"

export function UserName() {
    const [userName, setUserName] = useState("")
    const [userNameSubmitted, setUserNameSubmitted] = useState(false)

    useEffect(() => {
        // Check if browser cookie matches the database
        let cookie = document.cookie
        fetch(`http://localhost:3001/users/matchCookies?value=${cookie.substring(11)}`, {
            method: `GET`,
            //credentials: `include`
        })
        .then(res => res.json())
        .then(data => {
            if (data.userName != undefined) {
                console.log(data)
                setUserName(data.userName)
                setUserNameSubmitted(true)
                socket.auth = data
                socket.connect()
                console.log(socket)
            }
        })
    }, [])

    async function updateFlag(e) {
        setUserNameSubmitted(true)
        e.preventDefault()
        socket.auth = { userName }
        socket.connect()
        await fetch(`http://localhost:3001/users/new?username=${userName}`, {
            method: `POST`,
            credentials: `include`
        })
        .catch(() => {
            console.log('api request failure')
        })
    }

    const updateUserName = (e): void => {
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
            <OnlineBoard></OnlineBoard>
        </div>
        )
    }
    }