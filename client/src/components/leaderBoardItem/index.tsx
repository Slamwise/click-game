import React from 'react';

// Create interfaces
interface leaderBoardItemUI {
    position: number;
    user: {
      id: number;  
      username: string;
      wins: number;
      losses: number;
    }
  }

// Create leaderBoardItem component
// To-do: create another table-item with online status and button to challenge player
export const LeaderBoardItem = (props: leaderBoardItemUI) => (
    <tr className="table-row">
        <td className="table-item">
        {props.position}
        </td>

        <td className="table-item">
        {props.user.username}
        </td>

        <td className="table-item">
        {props.user.wins}
        </td>

        <td className="table-item">
        {props.user.losses}
        </td>
        
    </tr>
)