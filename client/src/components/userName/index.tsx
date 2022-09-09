import React, { useState } from 'react';
import { socket } from "../../services/socketService";

// interface UNameProps {}

export function UserName() {
    const [userName, setUserName] = useState("");
    const [userNameSubmitted, setUserNameSubmitted] = useState(false);

    const updateFlag = (e) => {
        setUserNameSubmitted(true);
        e.preventDefault();
        socket.auth = { userName };
        socket.connect();
        socket.emit('connection');
    };
    
    const updateUserName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUserName(e.target.value)
    }

    if (!userNameSubmitted || !userName){
        return (
        <div className="App">
            <form onSubmit={updateFlag}>
                <label>
                Select Username:</label>
                <input type="text" onChange={updateUserName} placeholder="Please enter a username."/>
                <input type="submit" value="Submit" />
            </form>
        </div>
            )
    } else {
        return <p>Username selected: {userName}</p>
        };
    }