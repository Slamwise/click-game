import React, { useState, useEffect } from "react"
import "../../styles/onlineuser.css"
import { socket } from "../../services/socketService"

interface onlineUserUI {
    userName: string
    cookie: string
    socketId: string
}

const sendRequest = (props) => {
    socket.emit('request', {to: props, from: {socketId: socket.id, auth: socket.auth}})
}

export const OnlineUser = (props: onlineUserUI) => (
    <tr className="table-row">
            <td className="table-item">
            {props.userName}
            </td>

            <td className="table-item">
            <button className="join-request-button" onClick={() => sendRequest(props)}>Send Join Request</button>
            </td>
        </tr>
)