"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {Bell, MessagesSquare, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MyContext } from "../Context/MyContext";
import SignInnavbar from "./SignIn/SignInnavbar";
import axios from "axios";

function Navbar() {
  const { user } = useUser();
  const [setting, setSetting] = useState(true);
  const [notification, setNotification] = useState(true);
  const router = useRouter();
  const [Adminfind, setAdminfind] = useState(false);
  const {userDetails,Notification,EmailUser,Requests,messages,SERVER_URL_V} = useContext(MyContext);

  useEffect(() => {
    const User = userDetails.find(user => user.email === EmailUser);
    if (User && User.email === "abdellahedaoudi80@gmail.com") {
      setAdminfind(true);
    }
  }, [userDetails, EmailUser]);


  const filt = userDetails.filter(
    (fl) => fl.email === EmailUser
  );
  const NotificationCount = Array.from(
    new Map(
      messages
        .filter(
          (fl) =>
            fl.to === EmailUser && fl.from !== EmailUser && fl.readorno === false
        )
        .map((item) => [item.message, item])
    ).values()
  );
  const ReadOrNo = async (fromEmail,toEmail) => {
    try {
      const response = await axios.put(`${SERVER_URL_V}/readorno`, {
        fromEmail,
        toEmail,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error updating readorno:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  

  return (
    <div>
      <nav className=" border-b drop-shadow-2xl bg-white ">
        <section className="container mx-auto py-3">
          <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-1 hover:scale-105 duration-300 cursor-pointer">
          <Image
              onClick={() => {
                router.push("/");
                setSetting(true);
              }}
              src="/favicon.png"
              alt="Logo"
              width={45}
              height={15}
            />
            <Image
              onClick={() => {
                router.push("/");
                setSetting(true);
              }}
              src="/Logo.png"
              alt="Logo"
              width={160}
              height={15}
            />
          </div>
            <SignedIn>
              {user ? (
                filt.map((userr, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <UserButton  />
                      <div
                        onClick={() => {
                          setSetting(true);
                          setNotification(true)
                          router.push(`/${userr.username}`);
                        }}
                        className="font-medium hidden  md:block text-black cursor-pointer hover:scale-105 transition duration-300"
                      >
                        {userr.fullname}
                      </div>
                      {/* Icons Navbar */}
                      <div className="flex items-center gap-3">
                        {/* Icon Notification */}
                      <div onClick={() => {
                        setNotification(!notification);
                        setSetting(true)
                      }} className="relative flex items-center">
                      <span 
                      className="text-black cursor-pointer ml-2 relative">
                      <MessagesSquare />
                      </span>
                      <div onClick={() => {
                        setNotification(!notification);
                        setSetting(true)
                      }} className=" w-6 h-4 text-[12px] flex cursor-pointer items-center justify-center absolute rounded-full bg-red-500 -right-1 -top-2">
                       {Notification.length ? Notification.length : Notification.length === 0 ? "0" : "..."}
                      </div>
                      </div>
                       {/* Icon FriendReq */}
                       <div  onClick={() => {
                          router.push('/Friendrequests');
                          setSetting(true),
                          setNotification(true)
                        }} className="relative flex items-center">
                      <span 
                      className="text-black cursor-pointer ml-2 relative">
                      <Users />
                      </span>
                      <div onClick={() => {
                        setSetting(true),
                        setNotification(true)
                      }} className=" w-6 h-4 text-[12px] flex cursor-pointer items-center justify-center absolute rounded-full bg-red-500 -right-1 -top-2">
                       {Requests ? Requests.length : Requests.length === 0 ? "0" : "..."} 
                      </div>
                      </div>
                      {/* Icon Settings */}
                      <span
                        onClick={() => {
                          setSetting(!setting);
                          setNotification(true)
                        }}
                        className="text-gray-800 hover:scale-105 duration-300 cursor-pointer"
                      >
                        <Settings />
                      </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 bg-gray-300 rounded-full"></div>
                  <div>
                  <div className="md:w-40 w-20 h-4 bg-gray-300 rounded-md mb-1"></div>
                  <div className="md:w-32 w-16 h-4 bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              )}
            </SignedIn>
            <SignedOut>
            <SignInnavbar />
            </SignedOut>
          </div>
        </section>
      </nav>
      {/* SETTING */}
      <nav
          onClick={() => {
            setSetting(!setting);
          }}
          className={`overflow-hidden transition-all duration-500 text-white bg-gray-800 rounded-md w-60 right-3 container absolute flex flex-col  ${
            setting ? " max-h-0" : "max-h-80 p-4"
          }`}>
              <Link
                href={"/Profile"}
                onClick={() => {
                  setSetting(!setting);
                }}
                className="bg-gray-700 py-2 border-b border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
              >
                Profile Details
              </Link>
              <Link
                href={"/BusinessLinks"}
                onClick={() => {
                  setSetting(!setting);
                }}
                className="bg-gray-700 py-2 border-b border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
              >
               Business Links
              </Link>
              <Link
                href={"/Friends"}
                onClick={() => {
                  setSetting(!setting);
                }}
                className="bg-gray-700 py-2 border-b border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
              >
               Friends
              </Link>
              {Adminfind &&
              <Link
                href={"/Admin"}
                onClick={() => {
                  setSetting(!setting);
                }}
                className="bg-gray-700 py-2 border-b border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
              >
               Admin
              </Link>
              }
              
              <Link
                href={"/Contact"}
                onClick={() => {
                  setSetting(!setting);
                }}
                className="bg-gray-700 py-2 border-b border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
              >
               Contact Us
              </Link>
              <SignOutButton  className="bg-red-500 py-2 border-b border-gray-600 hover:bg-red-600 transition duration-300 rounded-sm hover:scale-105 justify-center flex gap-2" />
      </nav>
      {/* notification */}
<nav
  onClick={() => {
    setNotification(!notification);
  }}
  className={`overflow-hidden transition-all overflow-y-auto duration-500 text-white bg-gray-800 rounded-md w-96 right-2 container absolute flex flex-col ${
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
        onClick={ ()=>{
          router.push(`/message/to/${nt.fromname}`)
          if (Notification.length > 0 && Notification[0].readorno === false){
            ReadOrNo(nt.from,nt.to)  
          }
        }}
          key={i}
          className="flex cursor-pointer hover:scale-105 duration-300 items-center p-2 mb-2 bg-gray-700 rounded-md shadow-md"
        >
          <Image width={40} height={40}
            src={nt.fromimg}
            alt="Sender Image"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <nav className="flex gap-2 items-center">
            <h4 className="">{(nt.from).split("@")[0]}</h4>
            <div className="flex gap-1 text-[10px]">
            <p className="text-gray-300">{displayDate}</p>
            <p className="text-gray-300">
              {DateMsg.toLocaleTimeString()}
            </p>
            </div>
            </nav>
            <div className="flex items-center gap-1 text-sm">
              <p className="text-sm text-gray-400 font-bold line-clamp-1">{nt.message}</p>
              <p className="text-gray-400">{`${NotificationCount.length === 1 ? "" : `(${NotificationCount.length})`}`}</p>
            </div>
            
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-center text-sm text-gray-400">No notifications</p>
  )}
</nav>
    </div>
  );
}

export default Navbar;
