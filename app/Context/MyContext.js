"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const MyContext = createContext();
export const MyProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
  const {user}=useUser()
  const EmailUser = user?.emailAddresses[0].emailAddress;

  const CLIENT_URL = "http://localhost:3000";
  const SERVER_URL = "http://localhost:9999";
  //  const CLIENT_URL = "https://chatfloww.vercel.app";
  // const SERVER_URL = "https://socketserver-muhp.onrender.com";
  //  const SERVER_URL = "https://saas-app-api.vercel.app";

   // Get Users
   useEffect(() => {
    axios
      .get(`${SERVER_URL}/users`)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [SERVER_URL]);
  // Get Links
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/links`)
      .then((res) => {
        setUserLinks(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [SERVER_URL]);

  return (
    <MyContext.Provider value={{CLIENT_URL,SERVER_URL,userDetails,userLinks,EmailUser}}>
      {children}
    </MyContext.Provider>
  );
};
