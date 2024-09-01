"use client";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { MyContext } from '@/app/Context/MyContext';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function Page() {
    const { SERVER_URL_V, SERVER_URL, EmailUser, userDetails } = useContext(MyContext);
    const [socket, setSocket] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        const socket = io(SERVER_URL);
        setSocket(socket);

        socket.on("receiveMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        socket.on("receiveUpdatedMessage", (updatedMessage) => {
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg._id === updatedMessage._id ? updatedMessage : msg
                )
            );
        });

        socket.on("receiveDeletedMessage", (deletedMessageId) => {
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg._id !== deletedMessageId)
            );
        });

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

        return () => {
            socket.disconnect();
        };
    }, [SERVER_URL]);

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
    }, [SERVER_URL_V]);

    const highlightText = (text) => {
        if (!searchTerm.trim()) return text;
        const regex = new RegExp(`(${searchTerm.trim()})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };

    const UpdateRequest = async (requestId) => {
        const confirmUpdate = window.confirm('Are you sure you want to accept this request?');
        if (!confirmUpdate) return;

        setLoadingStatus((prev) => ({ ...prev, [requestId]: { update: true } }));
        try {
            const response = await axios.put(`${SERVER_URL_V}/friend/${requestId}`, { status: 'accepted' });
            setRequests((prev) => prev.filter((req) => req._id !== requestId));
            socket.emit('updateFriendRequest', response.data.data);
            toast('Request accepted successfully!');
        } catch (error) {
            console.error('Error updating request:', error.message);
            toast.error('Failed to update request.');
        } finally {
            setLoadingStatus((prev) => ({ ...prev, [requestId]: { update: false } }));
        }
    };

    const DeleteRequest = async (requestId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this request?');
        if (!confirmDelete) return;

        setLoadingStatus((prev) => ({ ...prev, [requestId]: { delete: true } }));
        try {
            await axios.delete(`${SERVER_URL_V}/friend/${requestId}`);
            setRequests((prev) => prev.filter((req) => req._id !== requestId));
            socket.emit('deleteFriendRequest', requestId);
            toast('Request deleted successfully');
        } catch (error) {
            console.error('Error deleting request:', error.message);
            toast.error('Failed to delete request');
        } finally {
            setLoadingStatus((prev) => ({ ...prev, [requestId]: { delete: false } }));
        }
    };

    return (
        <div>
            <div className='flex items-center justify-between sticky top-0 bg-gray-900 pb-4 mb-2 w-full z-50'>
                <h1 className="text-sm font-bold">Friend Requests</h1>
                <input
                    type="text"
                    placeholder="Search for friend requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500"
                />
            </div>
            {friendRequests
                .filter((fl) => fl.status === "pending" && fl.to === EmailUser)
                .filter((mp) => 
                    mp.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    userDetails.find(user => user.email === mp.from)?.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    userDetails.find(user => user.email === mp.from)?.username.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((mp, i) => {
                    const filtUser = userDetails.filter((user) => user.email === mp.from);
                    return (
                        <div key={i}>
                            <div>
                                {filtUser.map((user, i) => {
                                    const highlightedName = highlightText(user?.fullname);
                                    const highlightedEmail = highlightText(user?.email);
                                    return (
                                        <div
                                            key={i}
                                            className="hover:scale-95 duration-300 shadow-lg mb-2 bg-gray-800 rounded-xl flex flex-row items-center justify-between"
                                        >
                                            <div className="flex flex-row items-center px-4 py-3 gap-2">
                                                <Image
                                                    onClick={() => router.push(`/${user?.username}`)}
                                                    src={user?.urlimage}
                                                    alt={`${user?.username}`}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full cursor-pointer"
                                                />
                                                <div>
                                                    <span className="block font-bold text-sm">
                                                        <span dangerouslySetInnerHTML={{ __html: highlightedName }} />
                                                    </span>
                                                    <span className="text-gray-400 text-xs break-all line-clamp-1">
                                                        <span dangerouslySetInnerHTML={{ __html: highlightedEmail }} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 mr-4">
                                                <button
                                                    className="bg-green-600 text-sm hover:scale-95 rounded-lg p-1 duration-200"
                                                    onClick={() => UpdateRequest(mp._id)} 
                                                    disabled={loadingStatus[mp._id]?.update}
                                                >
                                                    {loadingStatus[mp._id]?.update ? 
                                                        <i className="fa fa-spinner fa-spin"></i> 
                                                        : 'Accept'}
                                                </button>
                                                <button 
                                                    className="bg-red-600 text-sm hover:scale-95 rounded-lg p-1 duration-200"
                                                    onClick={() => DeleteRequest(mp._id)} 
                                                    disabled={loadingStatus[mp._id]?.delete}
                                                >
                                                    {loadingStatus[mp._id]?.delete ? 
                                                        <i className="fa fa-spinner fa-spin"></i> 
                                                        : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default Page;
