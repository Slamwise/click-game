import React, { useEffect } from "react";
import { socket } from "../../services/socketService";

export function Users() {

  useEffect(() => {
  
  socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
      });
      // put the current user first, and then sort by username
      users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });

  socket.on("user connected", (user) => {
      users.push(user);
      });

  }, []);

  return (
    <div className="left-panel">
    </div>
  )



}