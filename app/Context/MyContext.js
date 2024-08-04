"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
  const [messages, setMessages] = useState([]);

  const { user } = useUser();
  const EmailUser = user?.emailAddresses[0].emailAddress;

  // const CLIENT_URL = "http://localhost:3000";
  // const SERVER_URL = "http://localhost:9999";
   const CLIENT_URL = "https://chatfloww.vercel.app";
   const SERVER_URL = "https://socketserver-muhp.onrender.com";
  //  const SERVER_URL = "https://saas-app-api.vercel.app";

  // Initialize Socket.io
  const socket = io(SERVER_URL, {
    transports: ['websocket'],
    reconnection: true,
  });

  useEffect(() => {
    // Connect to Socket.io
    socket.connect();

    // Listen for incoming messages
    socket.on('receiveMessage', (data) => {
      setMessages((prevMessages) => [data, ...prevMessages]);
    });

    socket.on('receiveUpdatedMessage', (data) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === data._id ? { ...msg, ...data } : msg
        )
      );
    });

    socket.on('receiveDeletedMessage', (id) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== id)
      );
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, [SERVER_URL, socket]);

  // Fetch initial data
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
    
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/messages`);
        setMessages(response.data.reverse());
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [SERVER_URL]);

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

  const Notification = messages.filter(
    (fl) => fl.to === EmailUser && fl.from !== EmailUser
  );

  return (
    <MyContext.Provider
      value={{
        CLIENT_URL,
        SERVER_URL,
        userDetails,
        userLinks,
        setUserLinks,
        EmailUser,
        Notification,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
