"use client"
import { createContext } from 'react';

export const MyContext = createContext();
export const MyProvider = ({ children }) => {
  // const CLIENT_URL = "http://localhost:3000";
  const CLIENT_URL = "https://chatfloww.vercel.app";
  // const SERVER_URL = "http://localhost:9999";
  const SERVER_URL = "https://saas-app-api.vercel.app";


  return (
    <MyContext.Provider value={{CLIENT_URL,SERVER_URL}}>
      {children}
    </MyContext.Provider>
  );
};
