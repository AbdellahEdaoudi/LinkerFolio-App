"use client";
import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import UserListMobile from "./UserListMobile";
import UserList from "./UserList";
import { useUser } from "@clerk/nextjs";
import CreateProfile from "./CreateProfile";
import axios from "axios";

function ChatHome() {
  const [selectedUser,setSelectedUser] = useState(null);
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState([]);
  const SERVER_URL = 'http://localhost:9999';
  // SelectedUser
  useEffect(() => {
    const UserSelected = localStorage.getItem("SelectedUser");
    if (UserSelected) {
      setSelectedUser(JSON.parse(UserSelected));
    }
  }, []);
   //  get users
   useEffect(() => {
    axios.get(`${SERVER_URL}/users`)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []);
  const filt = userDetails.find(fl=> fl.email === user?.emailAddresses[0].emailAddress)
  if (!filt) {
    return <CreateProfile />
  }
  return (
    <div>
      {/* LAPTOP */}
      <div className="md:block hidden  duration-500">
        <div className=" flex flex-row  overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500">
          {/* Users list */}
          <nav className="w-1/3 ">
            <UserList
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </nav>
          {/* Message window on the right */}
          <nav className={`${selectedUser ? "" : "hiden"} w-full `}>
            <Messages selectedUser={selectedUser} />
          </nav>
        </div>
      </div>
      {/* MOBILE */}
      <div className="md:hidden block">
        <div className="carousel w-full ">
          <div id="slide1" className="carousel-item relative w-full">
            <UserListMobile
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <Messages selectedUser={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHome;
