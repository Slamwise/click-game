import React, { useEffect, useState } from 'react'
import { socket } from "../../services/socketService"

import { OnlineList } from '../onlineList'

import '../../styles/onlineboard.css'

interface onlineUserUI {
    Username: string
    Token: number
}

export const OnlineBoard = () => {

    const [online, setOnline] = useState<onlineUserUI[]>([])
    const [loading, setLoading] = useState(true)

    socket.on('cookies', (users) => {
        let onlineUsers: onlineUserUI[] = []
        for (let [id, userName, cookie, token] of users) {
            let user: onlineUserUI = {Username: userName, Token: token}
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