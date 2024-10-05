"use client";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MyContext } from "../../Context/MyContext";
import io from "socket.io-client";
import DOMPurify from 'dompurify';

function UserListMobile({ selectedUser, setSelectedUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);
  const lodd = Array.from({ length: 20 }, (_, index) => index + 1);
  const {
    SERVER_URL_V,
    SERVER_URL,
    setMessages,
    userDetails,
    EmailUser,socket, setSocket,
    messages,friendRequests, setFriendRequests  
  } = useContext(MyContext);
  const router = useRouter();


  const ReadOrNo = async (fromEmail,toEmail) => {
    try {
      const response = await axios.put(`${SERVER_URL_V}/readorno`, {
        fromEmail,
        toEmail,
      },{
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
        }
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
  const UserClick = async (User, lastMessage) => {
    setSelectedUser(User);

    if (lastMessage && lastMessage.from && lastMessage.to) {
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

  const safeHighlightText = (text) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.trim()})`, "gi");
    const highlightedText = text.replace(regex, "<b>$1</b>");
    return DOMPurify.sanitize(highlightedText);
  };

  return (
    <div>
      <div className="bg-gray-800 w-screen text-white p-4 ">
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
        <div className=" overflow-y-auto  scrollbar-none ">
        <div>
              {/* Users List */}
              <div className="overflow-y-auto max-h-[500px]  scrollbar-none">
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
                        // router.push(`/message/to/${User.username}`)
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
                      } flex items-center   pl-1 duration-500 hover:bg-gray-700 cursor-pointer rounded-lg transition ${
                        selectedUser && selectedUser.email === User.email
                          ? "bg-gray-700"
                          : ""
                      }`}
                    >
                      <div
                        onClick={() => {
                          router.push(`/${User.username}`);
                        }}
                        className="relative w-12 h-12 ml-1"
                      >
                        <Image
                          src={User.urlimage}
                          alt="Profile"
                          className="rounded-full"
                          layout="fill"
                        />
                      </div>
                      <div
                        onClick={() =>
                          router.push(`/message/to/${User.username}`)
                        }
                        className="flex flex-col "
                      >
                        <div className="cursor-pointer p-3 ">
                        <p
                        className="text-lg"
                        dangerouslySetInnerHTML={{
                          __html: `${safeHighlightText(User.fullname)}`,
                        }}
                      ></p>
                        <p className="text-[10px] text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html: `${safeHighlightText(User.email)}`,
                        }}>
                        </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {EmailUser &&
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
                      // Find the last message between EmailUser and the current User
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

                      return { User, lastMessage }; // Return both User and lastMessage
                    })
                    .sort(
                      (a, b) =>
                        new Date(b.lastMessage?.createdAt) -
                        new Date(a.lastMessage?.createdAt)
                    ) // Sort by last message date
                    .map(({ User, lastMessage }, i) =>{
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
                          router.push(`/message/to/${User.username}`)
                        }}
                        className={`${
                          searchQuery === "" ? "" : "hidden"
                        } flex relative items-center gap-4 p-2 mb-1 duration-500 hover:bg-gray-700 cursor-pointer rounded-lg transition 
                         `}
                      >
                        <Link
                          href={`/${User.username}`}
                          className="flex-shrink-0 relative w-12 h-12 "
                        >
                          <Image
                            src={User.urlimage}
                            alt="Profile"
                            className="rounded-full"
                            layout="fill"
                          />
                        </Link>
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
                          {MessgesLength.length > 1 ? `(${MessgesLength.length})` : MessgesLength.length === 1 ? "" : ""}
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
        </div>
      </div>
    </div>
  );
}

export default UserListMobile;
