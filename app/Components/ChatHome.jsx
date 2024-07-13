
'use client'
import React, { useEffect, useState } from 'react';
import Messages from './Messages';
import UserListMobile from './UserListMobile';
import UserList from './UserList';

    function ChatHome() {
      const [selectedUser, setSelectedUser] = useState(null);
      // SelectedUser
      useEffect(() => {
        const UserSelected = localStorage.getItem("SelectedUser");
        if (UserSelected) {
          setSelectedUser(JSON.parse(UserSelected));
        }
      }, []);
      return (
        <div>
          {/* LAPTOP */}
          <div className='md:block hidden duration-500'>
          <div className=" flex flex-row  overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500">
          {/* Users list */}
          <nav className='w-1/3 '>
          <UserList selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          </nav>
          {/* Message window on the right */}
          <nav className={`${selectedUser ? "" : "hiden"} w-full `}>
          <Messages selectedUser = {selectedUser} />
          </nav>
        </div>
          </div>
          {/* MOBILE */}
          <div className='md:hidden block'>
          <nav className=''>
          <UserListMobile selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          </nav>
          </div>
        </div>
      );
    }

    export default ChatHome;
