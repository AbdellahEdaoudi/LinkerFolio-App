import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import UserListMobile from "./UserListMobile";
import UserList from "./UserList";
import { useUser } from "@clerk/nextjs";
import CreateProfile from "./CreateProfile";
import axios from "axios";
import { MessageCircle, User } from "lucide-react";
import { useSwipeable } from "react-swipeable";

function ChatHome() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [carousel, setCarousel] = useState(true);
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = "http://localhost:9999";


  // Retrieve selected user from localStorage
  useEffect(() => {
    const UserSelected = localStorage.getItem("SelectedUser");
    if (UserSelected) {
      setSelectedUser(JSON.parse(UserSelected));
    }
  }, []);

  // Fetch users
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/users`)
      .then((res) => {
        setUserDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  const filt = userDetails.find(
    (fl) => fl.email === user?.emailAddresses[0].emailAddress
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (eventData.deltaX < -150) {
        setCarousel(false);
      }
    },
    onSwipedRight: (eventData) => {
      if (eventData.deltaX > 150) {
        setCarousel(true);
      }
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
    delta: 10, // Adjust this value to control sensitivity
  });
  
  if (loading) {
    return <p className="flex justify-center items-start h-screen duration-500  md:h-[515px] py-20 text-8xl">
    <i className="fa fa-spinner fa-spin"></i>
  </p>;
  }

  if (!filt) {
    return <CreateProfile />;
  }
  

  return (
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
      <div className="md:hidden block" {...swipeHandlers}>
        <div className="carousel w-full">
          {/* slide1 */}
          <div
            id="slide1"
            className={`${carousel ? "block" : "hidden"} carousel-item flex flex-col relative w-full`}
          >
            <div className="flex bg-gray-800 gap-1 px-5 py-1">
              <span className="backdrop-blur-lg bg-white/40 text-white px-4 py-3 rounded-md w-1/2 flex justify-center">
                <User className="rounded-md" />
              </span>
              <span
                onClick={() => {
                  setCarousel(false);
                }}
                className="px-4 py-3 rounded-md w-1/2 flex justify-center"
              >
                <MessageCircle />
              </span>
            </div>
            <UserListMobile
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              setCarousel={setCarousel}
              carousel={carousel}
            />
          </div>
          {/* slide2 */}
          <div
            id="slide2"
            className={`${carousel ? "hidden" : "block"} flex flex-col carousel-item relative w-full`}
          >
            <div className="flex md:hidden gap-1 px-5 py-1">
              <span
                onClick={() => {
                  setCarousel(true);
                }}
                className="px-4 py-3 rounded-md w-1/2 flex justify-center"
              >
                <User className="rounded-md" />
              </span>
              <span className="backdrop-blur-lg bg-white/40 text-white px-4 py-3 rounded-md w-1/2 flex justify-center">
                <MessageCircle />
              </span>
            </div>
            <Messages selectedUser={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHome;
