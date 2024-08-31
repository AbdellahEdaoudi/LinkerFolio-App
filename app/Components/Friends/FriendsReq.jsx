import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { MyContext } from '@/app/Context/MyContext';

function FriendsReq() {
  const { SERVER_URL_V, SERVER_URL, EmailUser } = useContext(MyContext);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [usersData, setUsersData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const socket = io(SERVER_URL, {
    transports: ['websocket'],
    reconnection: true,
  });

  useEffect(() => {
    socket.connect();
    socket.on('receiveFriendRequest', (newRequest) => {
      setAcceptedFriends((prevRequests) => [...prevRequests, newRequest]);
    });

    socket.on('receiveUpdatedFriendRequest', (updatedRequest) => {
      setAcceptedFriends((prevRequests) =>
        prevRequests.map((request) =>
          request._id === updatedRequest._id ? updatedRequest : request
        )
      );
    });

    socket.on('receiveDeletedFriendRequest', (deletedRequestId) => {
      setAcceptedFriends((prevRequests) =>
        prevRequests.filter((request) => request._id !== deletedRequestId)
      );
    });

    return () => {
      socket.off('receiveFriendRequest');
      socket.off('receiveUpdatedFriendRequest');
      socket.off('receiveDeletedFriendRequest');
    };
  }, [socket]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(`${SERVER_URL_V}/friend`);
        const allRequests = response.data.data;

        const FriendsReq = allRequests.filter(
          (f) => f.status === 'pending' && f.to === EmailUser
        );

        setAcceptedFriends(FriendsReq);

        const fetchUsersData = async () => {
          try {
            const usersPromises = FriendsReq.map((request) => {
              const friendEmail =
                request.from === EmailUser ? request.to : request.from;
              return axios.get(`${SERVER_URL_V}/usersE/${friendEmail}`);
            });
            const usersResponses = await Promise.all(usersPromises);

            const users = {};
            usersResponses.forEach((userResponse, index) => {
              const friendEmail =
                FriendsReq[index].from === EmailUser
                  ? FriendsReq[index].to
                  : FriendsReq[index].from;
              users[friendEmail] = userResponse.data;
            });

            setUsersData(users);
          } catch (error) {
            console.error('Error fetching users data:', error.message);
            setError('Failed to fetch user data');
          } finally {
            setLoading(false);
          }
        };

        fetchUsersData();
      } catch (error) {
        console.error('Error fetching friend requests:', error.message);
        setError('Failed to fetch friend requests');
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, [EmailUser, SERVER_URL_V]);

  const UpdateFriendRequest = async (friendId) => {
    const confirmUpdate = window.confirm(
      'Are you sure you want to accept this friend request?'
    );

    if (!confirmUpdate) {
      return;
    }

    setLoadingStatus((prev) => ({
      ...prev,
      [friendId]: { confirm: true, delete: false },
    }));
    try {
      const response = await axios.put(`${SERVER_URL_V}/friend/${friendId}`, {
        status: 'accept',
      });
      setAcceptedFriends((prev) =>
        prev.filter((request) => request._id !== friendId)
      );
      socket.emit('updateFriendRequest', response.data.data);
      toast('Friend request accepted successfully!');
    } catch (error) {
      console.error('Error accepting friend request:', error.message);
      setError('Failed to accept friend request');
      toast.error('Failed to accept friend request.');
    } finally {
      setLoadingStatus((prev) => ({
        ...prev,
        [friendId]: { confirm: false, delete: false },
      }));
    }
  };

  const DeleteRequest = async (friendId) => {
    const confirmUpdate = window.confirm(
      'Are you sure you want to delete this friend request?'
    );

    if (!confirmUpdate) {
      return;
    }
    setLoadingStatus((prev) => ({
      ...prev,
      [friendId]: { confirm: false, delete: true },
    }));
    try {
      await axios.delete(`${SERVER_URL_V}/friend/${friendId}`);
      setAcceptedFriends((prev) =>
        prev.filter((request) => request._id !== friendId)
      );
      socket.emit('deleteFriendRequest', friendId);
      toast('Friend request deleted successfully');
    } catch (error) {
      console.error('Error deleting friend request:', error.message);
      toast.error('Failed to delete friend request');
    } finally {
      setLoadingStatus((prev) => ({
        ...prev,
        [friendId]: { confirm: false, delete: false },
      }));
    }
  };

  const highlightText = (text) => {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm.trim()})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const filteredFriends = acceptedFriends.filter((request) => {
    const friendEmail =
      request.from === EmailUser ? request.to : request.from;
    const user = usersData[friendEmail];
    return (
      user?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Friend Requests</h1>

      <input
        type="text"
        placeholder="Search for friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 rounded-lg w-full max-w-md bg-gray-800 text-white placeholder-gray-500"
      />
        <div className='grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-6 '>
          {[1,2,3,4].map((mp,i)=>{
            return(
              <div key={i} className='bg-gray-800 w-full  rounded-lg flex flex-col items-center space-y-4 p-10'>
                <div className='w-28 h-28 bg-gray-500 rounded-full animate-pulse'></div>
                <div className='w-36 h-6 rounded-lg bg-gray-500 animate-pulse'></div>
                <div className='w-36 h-6 rounded-lg bg-gray-500 animate-pulse'></div>
              </div>
            )
          })}
        </div>
    </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Friend Requests</h1>

      <input
        type="text"
        placeholder="Search for friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 rounded-lg w-full max-w-md bg-gray-800 text-white placeholder-gray-500"
      />

      {filteredFriends.length === 0 ? (
        <p className="text-lg">No pending friend requests</p>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFriends.map((request) => {
            const friendEmail =
              request.from === EmailUser ? request.to : request.from;
            const user = usersData[friendEmail];
            const isLoading =
              loadingStatus[request._id] || { confirm: false, delete: false };

            return (
              <div
                key={request._id}
                className="bg-gray-800 shadow-lg rounded-xl overflow-hidden  flex flex-col items-center justify-between transform transition-transform hover:scale-105 duration-300"
              >
                <div className="flex flex-col items-center p-4">
                  <Image
                    onClick={() => router.push(`/${user?.username}`)}
                    src={user?.urlimage}
                    alt={`${user?.username}`}
                    width={80}
                    height={80}
                    className="rounded-full mb-4 cursor-pointer"
                  />
                  <span
                    className="block font-bold text-xl text-center"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(user?.fullname),
                    }}
                  ></span>
                  <span
                    className="text-gray-400 text-sm text-center"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(user?.email),
                    }}
                  ></span>
                </div>
                <div className="flex gap-4 w-full px-4 pb-4">
                  <button
                    onClick={() => UpdateFriendRequest(request._id)}
                    className="flex-1 py-2 bg-green-600 rounded-lg hover:bg-blue-500 transition-colors duration-200"
                  >
                    {isLoading.confirm ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      'Accepte'
                    )}
                  </button>
                  <button
                    onClick={() => DeleteRequest(request._id)}
                    className="flex-1 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors duration-200"
                  >
                    {isLoading.delete ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FriendsReq;
