"use client";
import {
  Bell,
  BookUser,
  LogOut,
  MessageSquare,
  MessagesSquare,
  NotebookText,
  Search,
  Settings,
  Shield,
  UserRoundSearch,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../Context/MyContext";
import SignInWithGoogle from "./SignInWithGoogle";
import axios from "axios";
import FriendsReq from "./Friends/FriendsReq";
import Friends from "./Friends/Friends";
import DOMPurify from "dompurify";
import Sent from "./Friends/Sent";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data, status } = useSession();
  const user = data?.user;
  const [setting, setSetting] = useState(true);
  const [notification, setNotification] = useState(true);
  const [FrReq, setFrReq] = useState(true);
  const router = useRouter();
  const [Adminfind, setAdminfind] = useState(false);
  const [FR_FRREQ, setFR_FRREQ] = useState("Friend Requests");
  const navRef = useRef(null);
  const {userDetails,Notification,EmailUser,Requests,
    messages,setMessages,SERVER_URL_V} = useContext(MyContext);
  const [search, setSearch] = useState("");
  const [shuffledUserDetails, setShuffledUserDetails] = useState([]);
  useEffect(() => {
    const User = userDetails.find((user) => user.email === EmailUser);
    if (User && User.email === "abdellahedaoudi80@gmail.com") {
      setAdminfind(true);
    }
  }, [userDetails, EmailUser]);

  const filt = userDetails.filter((fl) => fl.email === EmailUser);
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

  const FRS_FRREQ = () => {
    switch (FR_FRREQ) {
      case "Friend Requests":
        return <FriendsReq />;
      case "Friends":
        return <Friends />;
      case "Sent":
        return <Sent />;
      default:
        return null; // Handle the default case
    }
  };
  const filteredUserDetails = userDetails.filter(
    (user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.category.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    const shuffleArray = (array) => {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    };

    setShuffledUserDetails(shuffleArray([...filteredUserDetails]));
  }, [search]);
  const safeHighlightText = (text) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.trim()})`, "gi");
    const highlightedText = text.replace(regex, "<b>$1</b>");
    return DOMPurify.sanitize(highlightedText);
  };
  useEffect(() => {
    const ClickOutside = (event) => {
      if (!navRef.current?.contains(event.target)) {
        setSetting(true);
        setFrReq(true);
        setNotification(true);
      }
    };
    document.addEventListener('mousedown', ClickOutside);
    return () => document.removeEventListener('mousedown', ClickOutside);
  }, []);
  return (
    <div ref={navRef}>
      <nav className=" border-b drop-shadow-2xl bg-gray-200  backdrop-blur-lg ">
        <section className="md:container md:mx-auto ml-3 mr-6 py-3">
          <div className="flex justify-between items-center text-white">
            <div
              onClick={() => {
                router.push("/Home");
                setSetting(true);
                setFrReq(true);
                setNotification(true);
              }}
              className="flex items-center flex-shrink-0 md:w-auto  hover:scale-105 duration-300 cursor-pointer"
            >
              <Image src="/favicon.png" alt="Logo" width={45} height={15} />
              <Image
                src="/Logo.png"
                alt="Logo"
                width={160}
                className="md:block sm:block hidden"
                height={15}
              />
            </div>
            {/* SEARCHE */}
            <div className="md:mx-0 mx-2">
              <div className="flex items-center bg-gray-100 border shadow-sm border-gray-300 rounded-lg   md:w-96 max-w-md">
                <button className=" p-2 text-gray-500 ">
                  <UserRoundSearch />
                </button>
                <input
                  type="search"
                  placeholder="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="bg-gray-100 text-black  p-2  rounded-lg focus:outline-none  focus:ring-blue-500 transition duration-300 w-full"
                />
              </div>
            </div>

            {(status === "authenticated" && userDetails) &&
              filt.map((userr, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    onClick={() => {
                      setSetting(true);
                      setNotification(true);
                      setFrReq(true);
                      router.push(`/${userr.username}`);
                    }}
                    className="font-medium  hidden mr-4 sm:hidden md:block text-black cursor-pointer hover:scale-105 transition duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        className="rounded-full border-2 border-amber-400"
                        src={userr.urlimage}
                        width={35}
                        height={35}
                        alt="Photo Profile"
                      />
                      {userr.fullname}
                    </div>
                  </div>
                  {/* Icons Navbar */}
                  <div className="flex items-center gap-4">
                    {/* Icon Notification */}
                    <div
                      onClick={() => {
                        setNotification(!notification);
                        setSearch("");
                        setSetting(true);
                        setFrReq(true);
                      }}
                      className="relative flex items-center"
                    >
                      <span className="text-black cursor-pointer  relative">
                        <MessagesSquare />
                      </span>
                      <div
                        onClick={() => {
                          setNotification(!notification);
                          setSetting(true);
                        }}
                        className=" w-6 h-4 text-[12px] flex cursor-pointer items-center justify-center absolute rounded-full bg-red-500 -right-1 -top-2"
                      >
                        {Notification.length
                          ? Notification.length
                          : Notification.length === 0
                          ? "0"
                          : "..."}
                      </div>
                    </div>
                    {/* Icon FriendReq */}
                    <div
                      onClick={() => {
                        setFrReq(!FrReq);
                        setSearch("");
                        setSetting(true);
                        setNotification(true);
                      }}
                      className="relative flex items-center"
                    >
                      <span className="text-black cursor-pointer relative">
                        <Users />
                      </span>
                      <div
                        onClick={() => {
                          setSetting(true), setNotification(true);
                        }}
                        className=" w-6 h-4 text-[12px] flex cursor-pointer items-center justify-center absolute rounded-full bg-red-500 -right-1 -top-2"
                      >
                        {Requests
                          ? Requests.length
                          : Requests.length === 0
                          ? "0"
                          : "..."}
                      </div>
                    </div>
                    {/* Icon Settings */}
                    <span
                      onClick={() => {
                        setSetting(!setting);
                        setSearch("");
                        setNotification(true);
                        setFrReq(true);
                      }}
                      className="text-gray-800 hover:scale-105 duration-300 cursor-pointer"
                    >
                      <Settings />
                    </span>
                  </div>
                </div>
              ))}
            {status === "unauthenticated" && <SignInWithGoogle />}
            {(status === "loading" || !userDetails || userDetails.length === 0 ) && (
              <div className={`${status === "unauthenticated" && "hidden"} flex md:flex-row flex-row-reverse items-center gap-2`}>
                <div className="w-11 h-11 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="md:w-40 w-16 h-4 bg-gray-300 rounded-md mb-1"></div>
                  <div className="md:w-32 w-12 h-4 bg-gray-300 rounded-md"></div>
                </div>
              </div>
            )}
          </div>
        </section>
      </nav>
      {/* SETTING */}
      <nav
        onClick={() => {
          setSetting(!setting);
        }}
        className={`overflow-hidden ${
          !setting && "ring-2"
        } transition-all duration-500 text-white bg-gray-800 rounded-md w-60 right-3 container absolute flex flex-col  ${
          setting ? " max-h-0" : "max-h-80 p-4"
        }`}
      >
        <Link
          href={"/Profile"}
          onClick={() => {
            setSetting(!setting);
          }}
          className="bg-gray-700 py-2 border-b flex items-center justify-center border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
        >
          <div className="flex items-center gap-1">
            <BookUser /> Profile Details
          </div>
        </Link>
        <Link
          href={"/BusinessLinks"}
          onClick={() => {
            setSetting(!setting);
          }}
          className="bg-gray-700 py-2 border-b flex items-center justify-center border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
        >
          <div className="flex items-center gap-1">
            <NotebookText /> Business Links
          </div>
        </Link>
        <Link
          href={"/Friends"}
          onClick={() => {
            setSetting(!setting);
          }}
          className="bg-gray-700 hidden py-2 border-b fle items-center justify-center border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
        >
          <div className="flex items-center gap-1">
            <Users /> Friends
          </div>
        </Link>
        {Adminfind && (
          <Link
            href={"/Admin"}
            onClick={() => {
              setSetting(!setting);
            }}
            className="bg-gray-700 py-2 flex items-center justify-center border-b border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
          >
            <div className="flex items-center gap-1">
              <Shield />
              Admin
            </div>
          </Link>
        )}

        <Link
          href={"/Contact"}
          onClick={() => {
            setSetting(!setting);
          }}
          className="bg-gray-700 flex items-center justify-center py-2 border-b border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
        >
          <div className="flex items-center gap-1">
            <MessageSquare /> Contact Us
          </div>
        </Link>
        <div
          onClick={() => {
            signOut();
          }}
          className="bg-red-500 py-2 border-b cursor-pointer border-gray-600 hover:bg-red-600 transition duration-300 rounded-sm hover:scale-105 justify-center flex gap-2"
        >
          <LogOut />
          Sign Out
        </div>
      </nav>
      {/* notification */}
      <nav
        onClick={() => {
          setNotification(!notification);
        }}
        className={`overflow-hidden ${
          !notification && "ring-2"
        } transition-all overflow-y-auto duration-500 text-white bg-gray-800 rounded-md md:w-96  shadow-lg  md:mx-auto   md:right-2 container absolute flex flex-col ${
          notification ? "max-h-0" : "max-h-60 p-4"
        }`}
      >
        {Notification.length > 0 ? (
          Notification.map((nt, i) => {
            const DateMsg = new Date(nt.createdAt);
            const DateToday = new Date();

            // Date Message
            const year = DateMsg.getFullYear();
            const month = String(DateMsg.getMonth() + 1).padStart(2, "0");
            const day = String(DateMsg.getDate()).padStart(2, "0");
            const DateAll = `${year}/${month}/${day}`;

            // Date Today
            const yeart = DateToday.getFullYear();
            const montht = String(DateToday.getMonth() + 1).padStart(2, "0");
            const dayt = String(DateToday.getDate()).padStart(2, "0");
            const TodayDate = `${yeart}/${montht}/${dayt}`;

            // Date Yesterday
            const yeary = DateToday.getFullYear();
            const monthy = String(DateToday.getMonth() + 1).padStart(2, "0");
            const dayy = String(DateToday.getDate() - 1).padStart(2, "0");
            const YesterdayDate = `${yeary}/${monthy}/${dayy}`;

            // Determine display date
            let displayDate = "";
            if (DateAll === TodayDate) {
              displayDate = "Today";
            } else if (DateAll === YesterdayDate) {
              displayDate = "Yesterday";
            } else {
              displayDate = DateAll;
            }

            return (
              <div
                onClick={() => {
                  router.push(`/message/to/${nt.fromname}`);
                  if (
                    Notification.length > 0 &&
                    Notification[0].readorno === false
                  ) {
                    ReadOrNo(nt.from, nt.to);
                  }
                }}
                key={i}
                className="flex cursor-pointer hover:scale-105 duration-300 items-center p-2 mb-2 bg-gray-700 rounded-md shadow-md"
              >
                <Image
                  width={40}
                  height={40}
                  src={nt.fromimg}
                  alt="Sender Image"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <nav className="flex gap-2 items-center">
                    <h4 className="">{nt.from.split("@")[0]}</h4>
                    <div className="flex gap-1 text-[10px]">
                      <p className="text-gray-300">{displayDate}</p>
                      <p className="text-gray-300">
                        {DateMsg.toLocaleTimeString()}
                      </p>
                    </div>
                  </nav>
                  <div className="flex items-center gap-1 text-sm">
                    <p className="text-sm text-gray-400 font-bold line-clamp-1">
                      {nt.message}
                    </p>
                    {/* <p className="text-gray-400">{`${NotificationCount.length === 1 ? "" : `(${NotificationCount.length})`}`}</p> */}
                    <p className="text-gray-400">
                      {Array.from(
                        new Map(
                          messages
                            .filter(
                              (fl) =>
                                fl.to === EmailUser &&
                                fl.from === nt.from &&
                                fl.readorno === false
                            )
                            .map((item) => [item.message, item])
                        ).values()
                      ).length === 1
                        ? ""
                        : `(${
                            Array.from(
                              new Map(
                                messages
                                  .filter(
                                    (fl) =>
                                      fl.to === EmailUser &&
                                      fl.from === nt.from &&
                                      fl.readorno === false
                                  )
                                  .map((item) => [item.message, item])
                              ).values()
                            ).length
                          })`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-sm text-gray-400">No Messages</p>
        )}
      </nav>
      {/* FrReq */}
      <nav
        className={`overflow-hidden ${
          !FrReq && "ring-2"
        } transition-all    duration-500 text-white bg-gray-900 rounded-md md:w-[460px]  shadow-lg right-0.5    md:right-2  absolute 
    ${FrReq ? "max-h-0" : "max-h-96 p-4"}`}
      >
        <div className="flex items-center justify-around">
          <button
            onClick={() => {
              setFR_FRREQ("Friend Requests");
            }}
            className={`${
              FR_FRREQ === "Friend Requests" && "ring-2"
            } p-2 bg-gray-800 rounded-lg mb-4`}
          >
            Friend Requests
          </button>
          <button
            onClick={() => {
              setFR_FRREQ("Friends");
            }}
            className={`${
              FR_FRREQ === "Friends" && "ring-2"
            } p-2 bg-gray-800 rounded-lg mb-4`}
          >
            Friends
          </button>
          <button
            onClick={() => {
              setFR_FRREQ("Sent");
            }}
            className={`${
              FR_FRREQ === "Sent" && "ring-2"
            } p-2 bg-gray-800 rounded-lg mb-4`}
          >
            Sent
          </button>
        </div>
        {FRS_FRREQ()}
      </nav>
      {/* Searche */}
      <nav
        onClick={() => {setSearch("");}}
        className={`fixed  w-full flex justify-center ${search === ""
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        } transition-opacity duration-500 ease-in-out`}
      >
        <div
          className={`bg-black opacity-70 w-full  min-h-screen  rounded-b-md shadow-lg ${
            search === "" ? "max-h-0" : "max-h-96"
          } transition-all duration-500 ease-in-out`}
        ></div>
      </nav>

      <div
        className={`fixed top-20 left-1/2 w-full transform -translate-x-1/2 bg-white rounded-lg shadow-lg ${
          search === ""
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-100 scale-100 pointer-events-auto"
        } transition-all duration-500 ease-in-out max-w-lg max-h-72 overflow-y-auto`}
      >
        <div className="p-3">
          {shuffledUserDetails.length > 0 ? (
            <div className="space-y-2">
              {shuffledUserDetails.map((user) => (
                <div
                  onClick={() => {
                    setSearch("");
                    setSetting(true);
                      setNotification(true);
                      setFrReq(true);
                    router.push(`/${user.username}`);
                  }}
                  key={user._id}
                  className="flex items-center border hover:scale-95 duration-300 bg-gray-100 cursor-pointer p-2 rounded-lg shadow-sm hover:shadow-md ring-1"
                >
                  <Image
                    width={50}
                    height={50}
                    src={user.urlimage}
                    alt={user.fullname}
                    className="rounded-full mr-2 border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <p
                      className="text-black text-xs"
                      dangerouslySetInnerHTML={{
                        __html: `@${safeHighlightText(user.username)}`,
                      }}
                    ></p>
                    <p
                      className="text text-xs"
                      dangerouslySetInnerHTML={{
                        __html: safeHighlightText(user.email),
                      }}
                    ></p>
                    <p
                      className="text text-xs"
                      dangerouslySetInnerHTML={{
                        __html: safeHighlightText(user.category),
                      }}
                    ></p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 text-center text-gray-500">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
