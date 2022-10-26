import React, { useEffect, useState } from 'react'

import { LeaderBoardList } from '../leaderBoardList'

import '../../styles/leaderboard.css'

var fakeUsers: any[] = [   {id: 0, username: 'sam', wins: 4, losses: 0}, 
                    {id:1, username: 'kevin', wins: 0, losses: 4}  ]

export const Leaderboard = () => {

    // Initiate stateful variables
    const [userName, setUserName] = useState('')
    const [wins, setWins] = useState('')
    const [losses, setLosses] = useState('')
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    
    // Fetch all users on render
    useEffect(() => {
        const fetchUsers = () => {
            const usersPromise = new Promise(resolve => {
                setUsers(fakeUsers)
                setLoading(false)
                setTimeout(() => (
                    resolve
                ), 3000)
                })
            usersPromise
                .then(() => console.log('Users loaded succesfully'))
                .catch(() => console.log('Error loading users'))
        }
        fetchUsers()
    }, [])

    return (

        <div className="leaderboard-list-wrapper">
            {/* Render leaderboard list component */}
            <LeaderBoardList users={users} loading={loading} />
        </div>

        )
    }
    
