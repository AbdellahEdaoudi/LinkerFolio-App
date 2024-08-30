"use client";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MyContext } from "../../Context/MyContext";
import io from "socket.io-client";

function UserList({ selectedUser, setSelectedUser }) {
  const [userByEmail, setuserByEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);
  const lodd = Array.from({ length: 10 }, (_, index) => index + 1);
  const {
    EmailUser,
    SERVER_URL_V,
    SERVER_URL,
    userDetails,
    messages,
    setMessages,
  } = useContext(MyContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(SERVER_URL);
    setSocket(socket);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    socket.on("receiveUpdatedMessage", (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    });
    socket.on("receiveDeletedMessage", (deletedMessageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== deletedMessageId)
      );
    });

    socket.on("receiveFriendRequest", (newRequest) => {
      setFriendRequests((prevRequests) => [...prevRequests, newRequest]);
    });

    socket.on("receiveUpdatedFriendRequest", (updatedRequest) => {
      setFriendRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === updatedRequest._id ? updatedRequest : request
        )
      );
    });

    socket.on("receiveDeletedFriendRequest", (deletedRequestId) => {
      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== deletedRequestId)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [SERVER_URL]);

  const ReadOrNo = async (fromEmail,toEmail) => {
    try {
      const response = await axios.put(`${SERVER_URL_V}/readorno`, {
        fromEmail,
        toEmail,
      });
      socket.emit("updateMessage", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating readorno:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  // Define the function to handle user clicks
  const UserClick = async (User, lastMessage) => {
    setSelectedUser(User);

    if (lastMessage && lastMessage.from && lastMessage.to) {
      // Check if lastMessage.readorno is false
      if (lastMessage.readorno === false) {
          try {
              await ReadOrNo(lastMessage.from, lastMessage.to);
              console.log("successful");
          } catch (error) {
              console.error("Error updating readorno:", error);
          }
      }
  } else {
      console.warn("lastMessage or its properties are undefined");
  }

    // Store selected user in localStorage
    localStorage.setItem("SelectedUser", JSON.stringify(User));
    
    // Scroll messages to the end
    const scrollMessagesToEnd = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };
    
    const timeout = setTimeout(() => {
        scrollMessagesToEnd();
    }, 1);
    
    return () => clearTimeout(timeout);
};


  //  search input change
  const SearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // Scroll To End
  useEffect(() => {
    const scrollMessagesToEnd = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    };
    const timeout = setTimeout(() => {
      scrollMessagesToEnd();
    }, 1);
    return () => clearTimeout(timeout);
  }, [messages]);

  // Get users By Email
  useEffect(() => {
    const getUserByEmail = async () => {
      try {
        const response = await axios.get(`${SERVER_URL_V}/usersE/${EmailUser}`);
        setuserByEmail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (EmailUser) {
      getUserByEmail();
    }
  }, [SERVER_URL_V, EmailUser]);

  return (
    <div>
      <div className="bg-gray-800 rounded-lg text-white scrollbar-none mt-1  p-4 overflow-y-auto max-h-[516px] min-h-[516px]">
        {/* Search input */}
        <input
          type="search"
          placeholder="Search by Name or Email"
          value={searchQuery}
          onChange={SearchChange}
          className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        {/* Users List */}
        <div className="text-lg  border-yellow-500 font-bold mb-4 sticky top-0 border-b py-1 bg-gray-800 z-10">
          {searchQuery === "" ? "Friends" : "Users List"}
        </div>
        <div className=" overflow-y-auto max-h-[400px] scrollbar-none ">
          {!userDetails ? (
            <div className="space-y-2">
              {lodd.map((l, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {/* Users List */}
              <div className="overflow-y-auto max-h-[420px] scrollbar-none">
                {userDetails
                  .filter(
                    (user) =>
                      user.fullname
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      user.username
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      user.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((User, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedUser(User);
                        localStorage.setItem(
                          "SelectedUser",
                          JSON.stringify(User)
                        );
                        const scrollMessagesToEnd = () => {
                          if (messagesEndRef.current) {
                            messagesEndRef.current.scrollTop =
                              messagesEndRef.current.scrollHeight;
                          }
                        };
                        const timeout = setTimeout(() => {
                          scrollMessagesToEnd();
                        }, 1);
                        return () => clearTimeout(timeout);
                      }}
                      className={`${
                        searchQuery === "" ? "hidden" : ""
                      } flex items-center gap-4 p-2 duration-500 hover:bg-gray-700 cursor-pointer rounded-lg transition ${
                        selectedUser && selectedUser.email === User.email
                          ? "bg-gray-700"
                          : ""
                      }`}
                    >
                      <div className="relative w-12 h-12">
                        <div className="">
                          <Image
                            src={User.urlimage}
                            alt="Profile"
                            className="rounded-full "
                            layout="fill"
                          />
                          {/* <div className={` ${User.isOnline === false ? "bg-gray-500": "bg-green-500"} absolute w-2 h-2 rounded-full left-2 top-0`}></div> */}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg">{User.fullname}</p>
                        <p className="text-[10px] text-gray-500">
                          {User.email}
                        </p>
                      </div>
                    </div>
                  ))}
                {EmailUser &&
                  EmailUser.length > 0 &&
                  userDetails
                    .filter(
                      (userDetail) =>
                        userDetail.email === EmailUser ||
                        messages.some(
                          (msg) =>
                            (msg.from === EmailUser &&
                              msg.to === userDetail.email) ||
                            (msg.to === EmailUser &&
                              msg.from === userDetail.email)
                        )
                    )
                    .map((User) => {
                      const lastMessage = messages
                        .filter(
                          (msg) =>
                            (msg.from === EmailUser && msg.to === User.email) ||
                            (msg.to === EmailUser && msg.from === User.email)
                        )
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )[0];

                      return { User, lastMessage };
                    })
                    .sort(
                      (a, b) =>
                        new Date(b.lastMessage?.createdAt) -
                        new Date(a.lastMessage?.createdAt)
                    ) // Sort by last message date
                    .map(({ User, lastMessage }, i) => {
                      const MessgesLength = Array.from(
                        new Map(
                          messages
                            .filter(
                              (fl) => fl.to === EmailUser && fl.from === lastMessage?.from  && fl.readorno === false
                            )
                            .map((item) => [item.message, item])
                        ).values()
                      );
                      return (
                        <div
                        key={i}
                        onClick={() => {
                          UserClick(User, lastMessage);
                        }}
                        className={`${
                          searchQuery === "" ? "" : "hidden"
                        } mt-1 flex relative items-center gap-4 p-2 duration-500 hover:bg-gray-700 cursor-pointer rounded-lg transition ${
                          selectedUser && selectedUser.email === User.email
                            ? "bg-gray-700"
                            : ""
                        }`}
                      >
                        <div className="relative flex-shrink-0 w-12 h-12">
                          <Image
                            src={User.urlimage}
                            alt="Profile"
                            className="rounded-full"
                            layout="fill"
                          />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-lg">{User.fullname}</p>
                          <div className="flex items-center gap-1">
                            <p className="text-[14px] text-gray-500 line-clamp-1">
                            {lastMessage
                              ? lastMessage.from === EmailUser
                                ? `you: ${lastMessage.message} `
                                : `${lastMessage.message}`
                              : "No messages yet"}
                          </p>
                          <p className={`${User.email === EmailUser && 'hidden'} text-sm text-gray-500`}>
                          {MessgesLength.length > 0 ? `(${MessgesLength.length})` : MessgesLength.length === 0 ? "" : ""}
                          </p>
                          </div>
                          
                        </div>
                        {lastMessage && (
                          <p
                            className={` 
                         ${
                           lastMessage.from === EmailUser &&
                           lastMessage.to === EmailUser &&
                           "hidden"
                         }
                         ${lastMessage.from === EmailUser && "hidden"}
                         ${
                           lastMessage.readorno && "hidden"
                         } absolute right-3 top-1/2 -translate-y-1/2 bg-sky-800 rounded-full px-1  text-[10px]`}
                          >
                            new
                          </p>
                        )}
                      </div>
                      )
})}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserList;
