import React, { useState, useEffect } from "react"
import { socket } from "../../services/socketService"
import "../../styles/onlinelist.css"
import { OnlineUser } from "../onlineUser"

interface onlineUserUI {
    userName: string
    cookie: string
    socketId: string
}

interface onlineListUI {
    users: onlineUserUI[];
    loading: boolean;
}

export const OnlineList = (props: onlineListUI) => {

    if (props.loading) return <p>Online users list loading...</p>

    return(
        <table className="table">
        <thead>
            <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Player</th>

            <th className="table-head-item" />
            </tr>
        </thead>

        <tbody className="table-body">
            {props.users.length > 0 ? (
            props.users.map((onlineUser: onlineUserUI) => (
                  <OnlineUser
                    userName={onlineUser.userName}
                    cookie={onlineUser.cookie}
                    socketId={onlineUser.socketId}
                  />
                  )
                )
              ) : (
                <tr className="table-row">
                  <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no users to show.</td>
                </tr>
              )
            }
            </tbody>
        </table>
    )
}