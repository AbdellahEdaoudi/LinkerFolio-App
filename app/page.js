"use client";
import { useEffect } from "react";
import ChatHome from "./Components/ChatHome";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Messages from "./Components/Messages";
import UserList from "./Components/UserList";

export default function Home() {
  const { user } = useUser();

  // useEffect(() => {
  //   console.log('User object:', user);
  //   const postData = async () => {
  //     try {
  //       const payload = {
  //         fullname: user?.fullName || '',
  //         email: user?.emailAddresses[0]?.emailAddress || '',
  //         urlimage: user?.imageUrl || '',
  //         username:"yourname",
  //         phoneNumber:"+212600000000",
  //         bio:"",
  //         fb:"",
  //         instagram:"",
  //         snapchat:"",
  //         Linkedin:"",
  //         github:"",
  //         Twitter:"",
  //         TikTok:"",
  //         Youtube:"",
  //         Telegram:"",
  //       };

  //       console.log('Payload:', payload);

  //       const response = await axios.post('http://localhost:9999/users', payload);
  //       console.log('Response:', response.data);
  //     } catch (error) {
  //       console.error('Error posting user data:', error);
  //     }
  //   };

  //   if (user) {
  //     const intervalId = setInterval(postData, 1000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [user]);

  return (
    <div>
      <ChatHome />
      {/* <Messages /> */}
      {/* <UserList /> */}
    </div>
  );
}
