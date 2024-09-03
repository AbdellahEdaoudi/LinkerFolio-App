"use client";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../Context/MyContext";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

function Users() {
  const { userDetails, SERVER_URL_V } = useContext(MyContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userDetails);
  const router = useRouter();

  useEffect(() => {
    setFilteredUsers(
      userDetails.filter(user =>
        user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, userDetails]);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (confirmDelete) {
      try {
        await axios.delete(`${SERVER_URL_V}/users/${id}`);
        setFilteredUsers(filteredUsers.filter(user => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const highlightText = (text) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.trim()})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <div className="bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <CircleUser className="text-blue-600 w-8 h-8" />
          <h1 className="text-xl font-semibold text-gray-800">Users</h1>
        </div>
        <h2 className="text-md text-gray-600">
          Total Users: {filteredUsers.length}
        </h2>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-md bg-white text-black w-full"
        />
      </div>

      <div className="overflow-y-auto max-h-[700px] md:max-h-96 h-full">
        {filteredUsers.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map(user => (
              <li key={user._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center p-3">
                  <Image
                    width={80}
                    height={80}
                    onClick={() => router.push(`/${user.username}`)}
                    src={user.urlimage}
                    alt={user.fullname}
                    className="w-14 cursor-pointer hover:scale-105 duration-300 h-14 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="text-md font-semibold text-gray-900">
                      <span dangerouslySetInnerHTML={{ __html: highlightText(user.fullname) }} />
                    </h3>
                    <p className="text-gray-600 text-[13px]">
                      <span dangerouslySetInnerHTML={{ __html: highlightText(user.email) }} />
                    </p>
                    <p className="text-sm text-gray-500">
                      <span dangerouslySetInnerHTML={{ __html: highlightText(`@${user.username}`) }} />
                    </p>
                    <p className="text-sm text-gray-500">
                      <span dangerouslySetInnerHTML={{ __html: highlightText(user.phoneNumber) }} />
                    </p>
                  </div>
                </div>
                <div className="p-3 text-right">
                  <button 
                    onClick={() => deleteUser(user._id)} 
                    className="text-white p-1 rounded-md bg-red-500 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-600">No users found.</div>
        )}
      </div>
    </div>
  );
}

export default Users;
