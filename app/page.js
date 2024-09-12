"use client"
import { useContext, useEffect } from "react";
import ChatHome from "./Components/ChatHome";
import { MyContext } from "./Context/MyContext";
import CreateProfile from "./Components/CreateProfile";
import LoadChatPage from "./Components/Loading/LoadChatPage/LoadChatPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LandingPage from "./Components/LandingPage/LandingPage";

export default function Home() {
  const { userDetails, EmailUser } = useContext(MyContext);
  const { data, status } = useSession();
  const Router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      Router.push("/Home");
    }
  }, [status, Router]);

  return (
    <div>
      <LandingPage />
    </div>
  );
}
