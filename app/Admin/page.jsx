"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import AdminLogin from "./Components/AdminLogin";
import { LayoutDashboard, User, Mail, LogOut } from "lucide-react";
import Users from "./Components/Users";
import Contacts from "./Components/Contacts";

function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Users");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return <AdminLogin />;
  }

  const renderSection = () => {
    switch (selectedSection) {
      case "Users":
        return <Users />;
      case "Contacts":
        return <Contacts />;
      default:
        return <div>Select a section from the sidebar.</div>;
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
          <span onClick={()=>{localStorage.removeItem("accessToken");}} className="text-red-500 cursor-pointer"><LogOut /></span>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        {renderSection()}
      </main>
    </div>
  );
}

export default Page;
