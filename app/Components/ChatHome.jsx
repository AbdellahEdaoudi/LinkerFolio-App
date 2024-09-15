"use client";
import React, {useEffect, useState } from "react";
import Messages from "./Messages";
import UserListMobile from "./UserList/UserListMobile";
import UserList from "./UserList/UserList";

function ChatHome() {
  const [selectedUser, setSelectedUser] = useState(null);
  // Retrieve selected user from localStorage
  useEffect(() => {
    const UserSelected = localStorage.getItem("SelectedUser");
    if (UserSelected) {
      setSelectedUser(JSON.parse(UserSelected));
    }
  }, []);
  
  return (
    <div>
      {/* LAPTOP */}
      <div className="md:block sm:block hidden duration-500">
        <div className="flex flex-row overflow-hidden ">
          {/* Users list */}
          <nav className="w-72 min-w-72 flex-shrink-0">
            <UserList
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </nav>
          {/* Message window on the right */}
          <nav className={`${selectedUser ? "" : "hidden"} w-full`}>
            <Messages selectedUser={selectedUser} />
          </nav>
        </div>
      </div>
      {/* MOBILE */}
      <div className="md:hidden sm:hidden block">
        <div className="w-1/6">
          <UserListMobile
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatHome;
