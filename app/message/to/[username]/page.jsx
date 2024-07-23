"use client"
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BsEmojiSmile } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import io from 'socket.io-client';
import { EllipsisVertical } from "lucide-react";
import { MyContext } from "@/app/Context/MyContext";

function UserProfile({ params }) {
  const [userDname, setUserDname] = useState("");
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [loadingu, setLoadingu] = useState(false);
  const [loadingd, setLoadingd] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [umessage, setUMessage] = useState("");
  const [emoji, setEmoji] = useState(true);
  const [putdelete, setputdelete] = useState(true);
  const [idMsg, setIdMsg] = useState("");
  const messagesEndRef = useRef(null);
  const lod = Array.from({ length: 20 }, (_, index) => index + 1);
  const {SERVER_URL} = useContext(MyContext);


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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    getMessages();
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
  
    return () => {
      socket.disconnect();
    };
  }, []); 

  const addEmoji = (e) => {
    const sym = e.unified.split("-");
    const codeArray = sym.map(el => "0x" + el);
    const emoji = String.fromCodePoint(...codeArray);
    if (putdelete) {
      setMessageInput(messageInput + emoji);
    } else {
      setUMessage(umessage + emoji);
    }
  };

  const getMessages = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    setLoading(true);
    try {
      const data = {
        from: user.emailAddresses[0].emailAddress,
        fromimg: user.imageUrl,
        to: userDname.email,
        toimg: userDname.urlimage,
        message: messageInput,
      };
      const response = await axios.post(`${SERVER_URL}/messages`, data);
      socket.emit("sendMessage", response.data);
      toast({ description: "Your message has been sent." });
      setMessageInput("");
      setEmoji(true);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMsg = async () => {
    setLoadingd(true);
    try {
      if (!window.confirm("Are you sure you want to delete this message?")) {
        return;
      }
      await axios.delete(`${SERVER_URL}/messages/${idMsg}`);
      socket.emit("deleteMessage", idMsg);
      setputdelete(true);
      setEmoji(true);
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        description: "Error deleting message. Please try again later.",
        status: "error",
      });
    } finally {
      setLoadingd(false);
    }
  };

  const updateMsg = async () => {
    setLoadingu(true);
    try {
      const MsgUpdat = messages.find((msg) => msg._id === idMsg);
      const updatedMessage = {
        from: MsgUpdat.from,
        fromimg: MsgUpdat.fromimg,
        to: MsgUpdat.to,
        toimg: MsgUpdat.toimg,
        message: umessage,
        updated: "edited",
      };
      const response = await axios.put(
        `${SERVER_URL}/messages/${idMsg}`,
        updatedMessage
      );
      socket.emit("updateMessage", response.data);
      setputdelete(true);
      setEmoji(true);
    } catch (error) {
      console.error("Error updating message:", error);
      toast({
        description: "Error updating message. Please try again later.",
        status: "error",
      });
    } finally {
      setLoadingu(false);
    }
  };


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/user/${params.username}`);
        if (!response.data) {
          throw new Error("User not found");
        }
        setUserDname(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
 fetchUserDetails();
  },[params.id,params.username]);
  
  return (
    <div className="md:h-auto h-[860px]">
      {/* Message window on the right */}
      <div className={` flex flex-col justify-between md:w-auto w-screen`}>
        <div className="flex-1 p-2 ">
          {/* userDname */}
          <h2 className="mb-2 bg-slate-200 py-1 rounded-lg px-4">
            {userDname ? (
              <div className="flex items-center justify-between gap-4">
                <Link
                  href={`/${userDname.username}`}
                  className="cursor-pointer hover:scale-105 duration-300 flex gap-2 items-center"
                >
                  <Image
                    src={userDname.urlimage}
                    alt="Profile"
                    className="rounded-full"
                    width={48}
                    height={48}
                  />
                  <p className="font-bold">{userDname.fullname}</p>
                </Link>
                <p className="font-bold md:block hidden">
                  {userDname.email}
                </p>
                <p className="font-bold md:block hidden">
                  {userDname.phoneNumber}
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-center justify-between ">
                <div className=" flex justify-around items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-500 animate-pulse ml-2"></div>
                  <div className="rounded-full bg-gray-500 animate-pulse w-44 h-3 ml-2"></div>
                </div>
                <div className="rounded-full bg-gray-500 animate-pulse w-44 h-3 ml-2"></div>
                <div className="rounded-full bg-gray-500 animate-pulse w-44 h-3 ml-2"></div>
              </div>
            )}
          </h2>
          {/* Messages */}
          <div
            className="bg-white p-4 rounded-lg shadow-lg h-[600px] md:h-[350px] scrollbar-none
               overflow-y-auto"
            ref={messagesEndRef}
          >
            {messages.length === 0 ? (
              <div className="flex justify-around">
                <div className="space-y-3">
                  {lod.map((l, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {lod.map((l, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              messages
                .filter((fl) => {
                  return (
                    (fl.from === user?.emailAddresses[0]?.emailAddress &&
                      fl.to === userDname.email) ||
                    (fl.from === userDname.email &&
                      fl.to === user?.emailAddresses[0]?.emailAddress)
                  );
                })
                .map((msg, i) => {
                  const DateMsg = new Date(msg.createdAt);
                  const filtUser = userDetails.find((fl) => fl.urlimage === msg.fromimg);
                  return (
                    <div key={i}>
                        <div
                          className={`${
                            (msg.from || msg.to) ===
                            user.emailAddresses[0].emailAddress
                              ? "flex items-center flex-row-reverse gap-2"
                              : "flex items-center  gap-2"
                          }`}
                        >
                          <Link href={`/${filtUser?.username}`}
                          >
                            <Image
                              src={msg.fromimg}
                              width={40} height={40} alt="LOGO"
                              className="hover:scale-105 duration-300 rounded-full"
                            />
                           </Link>
                          <p
                            className={`whitespace-pre-wrap break-all  ${
                              (msg.from || msg.to) ===
                              user.emailAddresses[0].emailAddress
                                ? "bg-sky-500"
                                : "bg-green-500"
                            } p-2  rounded-md`}
                          >
                            {msg.message}
                          </p>
                          <p
                            onClick={() => {
                              setUMessage(msg.message);
                              setputdelete(!putdelete);
                              setIdMsg(msg._id);
                            }}
                            className={`cursor-pointer
                          ${
                            (msg.from || msg.to) ===
                            user.emailAddresses[0].emailAddress
                              ? "block"
                              : "hidden"
                          }`}
                          >
                            <EllipsisVertical width={18} />
                          </p>
                        </div>
                      <span
                        className={`
                          ${
                            (msg.from || msg.to) ===
                            user.emailAddresses[0].emailAddress
                              ? "text-right text-[10px] flex justify-end mr-14"
                              : "text-left  text-[10px] flex justify-start ml-14"
                          }`}
                      >
                        {msg.updated}
                      </span>
                      <span
                        className={` flex gap-2 mb-1  ${
                          (msg.from || msg.to) ===
                          user.emailAddresses[0].emailAddress
                            ? "justify-end mr-14 "
                            : " ml-14"
                        }  text-sm`}
                      >
                        <p className=" text-gray-700">{`${DateMsg.getFullYear()}/${DateMsg.getMonth()}/${DateMsg.getDay()}`}</p>
                        <p className=" text-gray-900">
                          {DateMsg.toLocaleTimeString()}
                        </p>
                      </span>
                    </div>
                  );
                })
            )}
          </div>
          {/* Input Messgage */}
          <div
            className={`bg-gray-200 p-2 mt-2 rounded-md
                ${putdelete ? "block" : "hidden"}`}
          >
            <div className="flex items-center gap-4 pr-2 ">
              <textarea
                type="text"
                placeholder="Enter your message here..."
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                }}
                className="flex-1 border-2 bg-white  border-gray-300 rounded-lg p-2  focus:outline-none transition duration-300"
              />
              <Button
                onClick={() => {
                  sendMessage();
                  setEmoji(emoji);
                }}
                disabled={loading || messageInput === ""}
                className="bg-indigo-600  text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                {loading ? <i className="fa fa-spinner fa-spin"></i> : "Send"}
              </Button>
              <div
                onClick={() => {
                  setEmoji(!emoji);
                }}
                className="cursor-pointer text-2xl"
              >
                <BsEmojiSmile />
              </div>
            </div>
          </div>
          {/* Input Messgage update Or Delete */}
          <div
            className={`bg-gray-200 p-2 mt-2 rounded-md
                ${putdelete ? "hidden" : "block"}`}
          >
            <div className="flex items-center gap-4 pr-2 ">
              <textarea
                type="text"
                placeholder="Enter your message here..."
                value={umessage}
                // onChange={(e) => {
                //   const words = e.target.value
                //     .split(/\s+/)
                //     .filter((word) => word.length > 0);
                //   if (words.length <= 200) {
                //     setUMessage(e.target.value)
                //   }
                // }}
                onChange={(e) => {
                  setUMessage(e.target.value);
                }}
                className="flex-1 border-2 bg-white  border-gray-300 rounded-lg p-2  focus:outline-none transition duration-300"
              />
              <button
                onClick={updateMsg}
                className="bg-green-600 p-2 rounded-md  text-white hover:bg-green-600 hover:scale-105 duration-500"
              >
                <>
                  {loadingu ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Update"
                  )}
                </>
              </button>
              <button
                onClick={deleteMsg}
                className="bg-red-600 p-2 rounded-md  text-white hover:bg-red-600 hover:scale-105 duration-500"
              >
                <>
                  {loadingd ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Delete"
                  )}
                </>
              </button>
              <div
                onClick={() => {
                  setEmoji(!emoji);
                }}
                className="cursor-pointer text-2xl"
              >
                <BsEmojiSmile />
              </div>
            </div>
          </div>
        </div>
        <div className={` absolute right-4 ${emoji ? "hidden" : "block"}`}>
          <Picker data={data} onEmojiSelect={addEmoji} maxFrequentRows={0} />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;