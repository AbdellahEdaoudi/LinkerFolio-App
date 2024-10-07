"use client";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../Context/MyContext";
import DOMPurify from 'dompurify';
import LUserList from "../Loading/LoadChatPage/LUserList";

function UserList({ selectedUser, setSelectedUser }) {
  const {userDetails,EmailUser,SERVER_URL_V,SERVER_URL,messages, setMessages}=useContext(MyContext);
  const [searchQuery,setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);


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
      const from = response.data.result[0].from
      const to = response.data.result[0].to
      setMessages(prevMessages =>
        prevMessages.map(message =>
          message.from === from && message.to === to && message.readorno === false
            ? { ...message, readorno: true }
            : message
        )
      );
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
    localStorage.setItem("SelectedUser", JSON.stringify(User));
    if (lastMessage && lastMessage.from && lastMessage.to) {
      await ReadOrNo(lastMessage.from, lastMessage.to);
    } else {
      // console.warn("lastMessage or its properties are undefined");
    }

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
    const filteredSearchUser = userDetails
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
    const safeHighlightText = (text) => {
      if (!searchQuery.trim()) return text;
      const regex = new RegExp(`(${searchQuery.trim()})`, "gi");
      const highlightedText = text.replace(regex, "<b>$1</b>");
      return DOMPurify.sanitize(highlightedText);
    };
    if (!userDetails || !messages ||  messages.length === 0 || !EmailUser ) {
      return (
        <div className="p-4 ">
          <LUserList />
        </div>
      )
    }
    const filteredUserDetails = userDetails.filter(userDetail =>
      userDetail.email === EmailUser ||
      messages.some(msg =>
        (msg.from === EmailUser && msg.to === userDetail.email) ||
        (msg.to === EmailUser && msg.from === userDetail.email)
      )
    );
    const userWithLastMessages = filteredUserDetails.map(User => {
      const lastMessage = messages
        .filter(msg =>
          (msg.from === EmailUser && msg.to === User.email) ||
          (msg.to === EmailUser && msg.from === User.email)
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    
      return { User, lastMessage };
    }).sort((a, b) =>
      new Date(b.lastMessage?.createdAt) - new Date(a.lastMessage?.createdAt)
    );

  return (
    <div>
      <div className="bg-gray-800 rounded-b-sm text-white  p-4">
        {/* Search Users input */}
        <input
          type="search"
          placeholder="Search by Name or Email"
          value={searchQuery}
          onChange={(e)=>{setSearchQuery(e.target.value)}}
          className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white focus:outline-none"
        />
        {/* Search State */}
        <div className="text-lg  border-yellow-500 font-bold mb-4 sticky top-0 border-b py-1 bg-gray-800 z-10">
          {searchQuery === "" ? "Friends" : "Users List"}
        </div>
              {/* Users List */}
              <div className="overflow-y-auto h-[65.3vh] max-h-[75vh]  scrollbar-none">
                {/* Search User */}
                {filteredSearchUser.map((User, i) => (
                    <div key={i}
                      onClick={() => {
                        setSelectedUser(User);
                        localStorage.setItem("SelectedUser",JSON.stringify(User));
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
                      className={`${searchQuery === "" ? "hidden" : ""} 
                        flex items-center gap-4 p-2 duration-500 hover:bg-gray-700
                        cursor-pointer rounded-lg transition 
                        ${selectedUser && selectedUser.email === User.email ? 
                        "bg-gray-700" : ""}`} >
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
                      <p
                        className="text-lg"
                        dangerouslySetInnerHTML={{
                          __html: `${safeHighlightText(User.fullname)}`,
                        }}
                      ></p>
                        <p className="text-[10px] text-gray-400"
                        dangerouslySetInnerHTML={{
                          __html: `${safeHighlightText(User.email)}`,
                        }}>
                        </p>
                      </div>
                    </div>
                  ))}

   {userWithLastMessages.map(({ User, lastMessage }, i) => {
      const messagesLength = Array.from(
        new Map(
          messages
            .filter(fl =>
              fl.to === EmailUser &&
              fl.from === lastMessage?.from &&
              fl.readorno === false
            )
            .map(item => [item.message, item])
        ).values()
      );

      return (
        <div
          key={i}
          onClick={() => UserClick(User, lastMessage)}
          className={`${
            searchQuery === "" ? "" : "hidden"
          } mt-1 flex relative items-center gap-4 p-2 duration-500 hover:bg-gray-700 cursor-pointer rounded-lg transition ${
            selectedUser && selectedUser.email === User.email ? "bg-gray-700" : ""
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
              <p className="text-[14px] text-gray-400 line-clamp-1">
                {lastMessage
                  ? lastMessage.from === EmailUser
                    ? `you: ${lastMessage.message}`
                    : `${lastMessage.message}`
                  : "No messages yet"}
              </p>
              <p className={`${User.email === EmailUser && 'hidden'} text-sm text-gray-500`}>
                {messagesLength.length > 1
                  ? `(${messagesLength.length})`
                  : messagesLength.length === 1
                    ? ""
                    : ""}
              </p>
            </div>
          </div>
          {lastMessage && (
            <p
              className={` 
                ${lastMessage.from === EmailUser && lastMessage.to === EmailUser && "hidden"}
                ${lastMessage.from === EmailUser && "hidden"}
                ${lastMessage.readorno && "hidden"} 
                absolute right-3 top-1/2 -translate-y-1/2 bg-sky-800 rounded-full px-1 text-[10px]`}
            >
              new
            </p>
          )}
        </div>
      );
    })}
              </div>
      </div>
    </div>
  );
}

export default UserList;
