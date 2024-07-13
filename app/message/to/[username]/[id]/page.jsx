"use client"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function page({params}) {
  const [UserDname, setUserDname] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/user/${params.username}/${params.id}`);
        if (!response.data) {
          throw new Error("User not found");
        }
        setUserDname(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (params) {
      fetchUserDetails();
    }
  }, []);
  const [userDetails, setUserDetails] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:9999/users')
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500">
      {/* Users list on the left */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Users List</h2>
        <div className="overflow-y-auto">
          {userDetails.map((User, i) => (
            <Link href={`/message/to/${User.username}/${User._id}`} key={i} className="flex items-center gap-4 p-3 hover:bg-gray-700 cursor-pointer rounded-lg transition duration-300">
              <div className="relative w-12 h-12">
                <Image src={User.urlimage} alt="Profile" className="rounded-full" layout="fill" />
              </div>
              <p className="text-lg">{User.fullname}</p>
            </Link>
          ))}
        </div>
      </div>
      {/* Message window on the right */}
      <div className="w-full md:w-3/4 flex flex-col justify-between">
        <div className="flex-1 p-4">
          <h2 className="text-xl font-bold mb-4">Chat</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg h-96 overflow-y-auto">
            Messages
          </div>
        </div>
        <div className="bg-gray-200 p-4">
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Enter your message here..." className="flex-1 border-2 border-gray-300 rounded-lg p-3 focus:outline-none transition duration-300" />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
