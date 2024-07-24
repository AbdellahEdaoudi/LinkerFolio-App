"use client"
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const MyContext = createContext();
export const MyProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  // const CLIENT_URL = "http://localhost:3000";
  // const SERVER_URL = "http://localhost:9999";
  const CLIENT_URL = "https://chatfloww.vercel.app";
  const SERVER_URL = "https://saas-app-api.vercel.app";
  // const SERVER_URL = "https://saasapp-api.onrender.com";

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
  }, []);

  return (
    <MyContext.Provider value={{CLIENT_URL,SERVER_URL,userDetails}}>
      {children}
    </MyContext.Provider>
  );
};
