import React, { useState } from 'react';

// interface UNameProps {}

export function UserName(props) {
    const [userName, setUserName] = useState("");
    const [userNameSubmitted, setUserNameSubmitted] = useState(false);

    const updateFlag = (e) => {
        setUserNameSubmitted(true);
        e.preventDefault();
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
        return <p>{userName}</p>
        };
    }