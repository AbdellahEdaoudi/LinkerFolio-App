import React, { useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import UserListMobile from "./UserList/UserListMobile";
import UserList from "./UserList/UserList";
import CreateProfile from "./CreateProfile";
import { MyContext } from "../Context/MyContext";
import LoadChatPage from "./Loading/LoadChatPage/LoadChatPage";

function ChatHome() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { userDetails, EmailUser } = useContext(MyContext);

  // Retrieve selected user from localStorage
  useEffect(() => {
    const UserSelected = localStorage.getItem("SelectedUser");
    if (UserSelected) {
      setSelectedUser(JSON.parse(UserSelected));
    }
  }, []);

  if (!userDetails || !EmailUser) {
    return <LoadChatPage />;
  }
  const filt = userDetails.find((fl) => fl.email === EmailUser);

  return (
    <div>
      {filt ? (
        <div>
          {/* LAPTOP */}
          <div className="md:block hidden duration-500 ">
            <div className="flex flex-row overflow-hidden bg-gray-800 g-gradient-to-r from-purple-500 to-indigo-50">
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
      ) : (
        <CreateProfile userDetails={userDetails} />
      )}
    </div>
  );
}

export default ChatHome;
