import React, { useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import UserListMobile from "./UserListMobile";
import UserList from "./UserList";
import { useUser } from "@clerk/nextjs";
import CreateProfile from "./CreateProfile";
import { MyContext } from "../Context/MyContext";

function ChatHome() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useUser();
  const {userDetails} = useContext(MyContext);


  // Retrieve selected user from localStorage
  useEffect(() => {
    const UserSelected = localStorage.getItem("SelectedUser");
    if (UserSelected) {
      setSelectedUser(JSON.parse(UserSelected));
    }
  }, []);


  const filt = userDetails.find(
    (fl) => fl.email === user?.emailAddresses[0].emailAddress
  );

  

  return (
    <div>
      {filt ?  
      <div>
      {/* LAPTOP */}
      <div className="md:block hidden duration-500">
        <div className="flex flex-row overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500">
          {/* Users list */}
          <nav className="w-1/3">
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
        <div className="w-full">
        <UserListMobile
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
        </div>
      </div>
    </div>
    : 
    <CreateProfile />}
    </div>
  );
}

export default ChatHome;
