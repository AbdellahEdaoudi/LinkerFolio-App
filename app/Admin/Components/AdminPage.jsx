"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { LayoutDashboard, User, Mail, LogOut } from "lucide-react";
import Cookies from 'js-cookie';
import ContactsPage from "./Contacts";
import Users from "./Users";
import { MyContext } from "../../Context/MyContext";
import axios from "axios";

function AdminPage() {
  const [selectedSection, setSelectedSection] = useState("Users");
  const router = useRouter();
  const {SERVER_URL_V} = useContext(MyContext)


  const renderSection = () => {
    switch (selectedSection) {
      case "Users":
        return <Users />;
      case "Contacts":
        return <ContactsPage />;
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };
  const Logout = async () => {
    const confirmed = confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    try {
      await axios.post(`${SERVER_URL_V}/logout`, {}, { withCredentials: true });
      Cookies.remove("token");
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
      <div className=" bg-gray-100 flex">
      <aside className=" bg-gray-800 h-screen md:h-[517px] p-4 text-white">
        <div className="flex items-center gap-2 mb-6">
          <LayoutDashboard size={24} />
          <p className="text-lg font-semibold md:block hidden">Dashboard</p>
        </div>
        <nav>
          {["Users", "Contacts"].map((ad) => (
            <div
              key={ad}
              className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
                selectedSection === ad ? 'bg-gray-700' : ''
              }`}
              onClick={() => setSelectedSection(ad)}
            >
              <span>{ad === "Users" ? <User size={20} /> : <Mail size={20} />}</span>
              <span className="md:block hidden ml-2">{ad}</span>
            </div>
          ))}
          <span onClick={()=>{
            Logout()
            localStorage.removeItem("accessToken");
            router.push("/Admin")
          }} className=" text-black rounded-lg p-1 cursor-pointer flex items-center justify-center bg-red-500">
            LogOut <LogOut size={15} />
          </span>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        {renderSection()}
      </main>
    </div>
  );
}

export default AdminPage;
