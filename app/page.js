"use client";
import { useUser } from "@clerk/nextjs";
import ChatHome from "./Components/ChatHome";
import CreateProfile from "./Components/CreateProfile";
import Users from "./data/Users";


export default function Home() {
  const { user } = useUser();
  return (
    <div>
      {/* <CreateProfile /> */}
      {/* <TestCarousel /> */}
      {/* <Test /> */}
      {/* <Users /> */}
      <ChatHome />
      {/* <Messages /> */}
      {/* <UserList /> */}
    </div>
  );
}
