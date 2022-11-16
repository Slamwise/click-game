import React, { useEffect, useState } from 'react'
import { socket } from "../../services/socketService"

import { OnlineList } from '../onlineList'

import '../../styles/onlineboard.css'

interface onlineUserUI {
    Username: string
    Token: number
    Cookie: string
}

export const OnlineBoard = () => {

    const [online, setOnline] = useState<onlineUserUI[]>([])
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     console.log()
    // })

    socket.on('cookies', (users) => {
        let onlineUsers: onlineUserUI[] = []
        for (let [id, userName, cookie, token] of users) {
            console.log(userName)
            let user: onlineUserUI = {Username: userName, Token: token, Cookie: cookie}
            onlineUsers.push(user)
        }
        setOnline(onlineUsers)
        setLoading(false)
        console.log(`onlineUsers: ${online}`)
    })

    return (
        <div className = "onlineboard-wrapper">
            <OnlineList users={online} loading={loading}/>
        </div>
    )

}