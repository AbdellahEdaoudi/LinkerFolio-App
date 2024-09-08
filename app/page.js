"use client"
import { useContext, useEffect } from "react";
import ChatHome from "./Components/ChatHome";
import { MyContext } from "./Context/MyContext";
import CreateProfile from "./Components/CreateProfile";
import LoadChatPage from "./Components/Loading/LoadChatPage/LoadChatPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default  function Home() {
  const { userDetails, EmailUser } = useContext(MyContext);
  const { data, status } = useSession();
  const Router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.push("/SignIn");
    }
  }, [status, Router]);
  if (!userDetails || userDetails.length === 0) {
    return <LoadChatPage />;
  }
  const filt = userDetails.find((fl) => fl.email === EmailUser);
  if (!filt) {
    return <CreateProfile />;
  }
  return (
    <div>
      <ChatHome />
    </div>
  );
}
