"use client"
import { useContext } from "react";
import ChatHome from "./Components/ChatHome";
import { MyContext } from "./Context/MyContext";
import CreateProfile from "./Components/CreateProfile";
import LoadChatPage from "./Components/Loading/LoadChatPage/LoadChatPage";

export default  function Home() {
  const { userDetails, EmailUser } = useContext(MyContext);
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
