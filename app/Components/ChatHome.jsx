"use client";
import React, { useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import UserListMobile from "./UserList/UserListMobile";
import UserList from "./UserList/UserList";
import CreateProfile from "./CreateProfile";
import { MyContext } from "../Context/MyContext";
import LoadChatPage from "./Loading/LoadChatPage/LoadChatPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ChatHome() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { userDetails, EmailUser } = useContext(MyContext);
  const Router = useRouter();
  const { data, status } = useSession();

  // Retrieve selected user from localStorage
  useEffect(() => {
    const UserSelected = localStorage.getItem("SelectedUser");
    if (UserSelected) {
      setSelectedUser(JSON.parse(UserSelected));
    }
  }, []);

  // Redirect to SignIn page if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.push("/SignIn");
    }
  }, [status, Router]);

  // Show loading page if userDetails is not available
  if (!userDetails) {
    return <LoadChatPage />;
  }

  // Filter user details based on EmailUser
  const filt = userDetails.find((fl) => fl.email === EmailUser);

  // Check if filt is valid before rendering
  if (!filt) {
    return <CreateProfile />;
  }

  return (
    <div>
      {/* LAPTOP */}
      <div className="md:block hidden duration-500">
        <div className="flex flex-row overflow-hidden bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
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
      <div className="md:hidden block">
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
