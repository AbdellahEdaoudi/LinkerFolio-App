"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { createContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [userLinks, setUserLinks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useUser();
  const EmailUser = user?.emailAddresses[0].emailAddress;
  const [previousNotificationCount, setPreviousNotificationCount] = useState(0);
  const [previousfriendRequests, setPreviousfriendRequests] = useState(0);
  const [friendRequests, setFriendRequests] = useState([]);


  const CLIENT_URL = "http://localhost:3000";
  const SERVER_URL = "http://localhost:9999" ;
  const SERVER_URL_V = "http://localhost:9999" ;
  //  const CLIENT_URL = "https://linkerfolio.vercel.app";
  //  const SERVER_URL = "https://socketserver-muhp.onrender.com";
  //  const SERVER_URL_V = "https://saas-app-api.vercel.app";
   
   const audioRef = useRef(null);
  
   
  // socket.io
  useEffect(() => {
    const socket = io(SERVER_URL);
    setSocket(socket);
    // Messages
    socket.on('receiveMessage', (data) => {
      setMessages((prevMessages) => {
        if (prevMessages.some(msg => msg._id === data._id)) {
          return prevMessages;
        }
        return [data, ...prevMessages];
      });
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
  
    // FriendRequest
    socket.on('receiveFriendRequest', (newRequest) => {
      setFriendRequests(prevRequests => [...prevRequests, newRequest]);
    });
    socket.on('receiveUpdatedFriendRequest', (updatedRequest) => {
      setFriendRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === updatedRequest._id ? updatedRequest : request
        )
      );
    });
    socket.on('receiveDeletedFriendRequest', (deletedRequestId) => {
      setFriendRequests(prevRequests =>
        prevRequests.filter(request => request._id !== deletedRequestId)
      );
    });
  
    // Clean up on unmount
    return () => {
      socket.off('receiveMessage');
      socket.off('receiveUpdatedMessage');
      socket.off('receiveDeletedMessage');
      socket.off('receiveFriendRequest');
      socket.off('receiveUpdatedFriendRequest');
      socket.off('receiveDeletedFriendRequest');
      socket.disconnect();
    };
  }, [SERVER_URL]);
  

  // Fetch users
  useEffect(() => {
    axios
      .get(`${SERVER_URL_V}/users`)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [SERVER_URL_V]);
  
  // getMessages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`${SERVER_URL_V}/messages`);
        setMessages(response.data.reverse());
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [SERVER_URL_V]);
  // links
  useEffect(() => {
    axios
      .get(`${SERVER_URL_V}/links`)
      .then((res) => {
        setUserLinks(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [SERVER_URL_V]);

  // GetFriendRequest
  useEffect(() => {
    const GetFriendRequest = async () => {
      try {
        const response = await axios.get(`${SERVER_URL_V}/friend`);
        setFriendRequests(response.data.data);
      } catch (error) {
        console.error('Error fetching friend requests', error.response ? error.response.data : error.message);
      }
    };
    GetFriendRequest();
  }, []);


  

  
  const latestNotifications = messages
  .filter((fl) => fl.to === EmailUser && fl.from !== EmailUser && fl.readorno === false)
  .reduce((acc, msg) => {
    if (!acc[msg.from] || new Date(acc[msg.from].createdAt) < new Date(msg.createdAt)) {
      acc[msg.from] = msg;
    }
    return acc;
  }, {});

const Notification = Object.values(latestNotifications);
const Requests = friendRequests
.filter(fl => fl.status === "pending" && fl.to === EmailUser) 
.filter((fl, index, self) =>
  index === self.findIndex((t) => (
    t._id === fl._id 
  ))
);

  useEffect(() => {
    if (Notification.length > previousNotificationCount) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
    setPreviousNotificationCount(Notification.length);
  }, [Notification.length, previousNotificationCount]);
  
  useEffect(() => {
    if (Requests.length > previousfriendRequests) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
    setPreviousfriendRequests(Requests.length);
  }, [Requests.length, previousfriendRequests]);

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
        SERVER_URL_V,
        messages,
        setMessages,
        socket,
        Requests,
        friendRequests, setFriendRequests
      }}
    >
      <audio ref={audioRef} src="/notification3.mp3" preload="auto" />
      {children}
    </MyContext.Provider>
  );
};
