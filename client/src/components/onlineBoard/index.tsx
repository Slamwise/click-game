import React, { useEffect, useState } from 'react'
import { socket } from "../../services/socketService"

import { OnlineList } from '../onlineList'

import '../../styles/onlineboard.css'

interface onlineUserUI {
    userName: string
    cookie: string
}

export const OnlineBoard = () => {

    const [online, setOnline] = useState<onlineUserUI[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3001/users/online`, {
            method: `GET`
            })
        .then(res => res.json())
        .then(data => {
            data = data.filter(u => !u.cookie.includes(document.cookie))
            setOnline(data)
            setLoading(false)
        })
    }, [])

    return (
        <div className = "onlineboard-wrapper">
            <OnlineList users={online} loading={loading}/>
        </div>
    )

}