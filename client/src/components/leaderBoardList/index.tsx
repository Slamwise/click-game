import React from 'react'

import { LeaderBoardItem } from '../leaderBoardItem'

import '../../styles/leaderboard-list.css'

interface UserUI {
    id: number;
    username: string;
    wins: number;
    losses: number;
    joindate: string;
}

interface LeaderboardListUI {
    users: UserUI[];
    loading: boolean;
}

export const LeaderBoardList = (props: LeaderboardListUI) => {
    // Loading message
    if (props.loading) return <p>Leaderboard loading...</p>
    
    return (
        <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">User</th>

            <th className="table-head-item">Joindate</th>

            <th className="table-head-item">Wins</th>

            <th className="table-head-item">Losses</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.users.length > 0 ? (
            props.users.map((user: UserUI, idx) => (
              <LeaderBoardItem
                key={user.id}
                user={user}
                position={idx + 1}
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