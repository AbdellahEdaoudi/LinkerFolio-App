"use client";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { MyContext } from '../../Context/MyContext';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function FriendsReq() {
    const { SERVER_URL_V, SERVER_URL, EmailUser, userDetails,
        friendRequests, setFriendRequests,socket, setSocket} =
        useContext(MyContext);
    const [requests, setRequests] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();


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
            const response = await axios.put(`${SERVER_URL_V}/friend/${requestId}`, { status: 'accept' },{
                headers: {
                  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
                }
              });
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
            await axios.delete(`${SERVER_URL_V}/friend/${requestId}`,{
                headers: {
                  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
                }
              });
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
    const frCount = friendRequests
    .filter((fl) => fl.status === "pending" && fl.to === EmailUser).length;

return (
    <div>
        <div className='flex items-center justify-between gap-2 bg-gray-900 pb-4 mb-2 w-full z-50'>
            <div className="text-sm font-bold">{frCount} Friend Requests</div>
            <input
                type="text"
                placeholder="Search for friend requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500"
            />
        </div>

        {!friendRequests ? (
            <div className='rounded-md mb-2 w-full flex-1'>
            {[1].map((_, i) => (
                <div key={i} className='p-3 hover:scale-95 duration-300 bg-gray-800 w-full rounded-md mb-2 flex justify-between gap-5'>
                    <div className='flex items-center gap-1'>
                        <div className='w-9 h-9 bg-gray-400 rounded-full animate-pulse'></div>
                        <div className='space-y-1'>
                            <p className='w-32 h-3 rounded-md bg-gray-400 animate-pulse'></p>
                            <p className='w-32 h-3 rounded-md bg-gray-400 animate-pulse'></p>
                        </div>
                    </div>
                    <div className="flex gap-2 mr-4">
                        <button className="bg-green-600 flex-shrink-0 text-xs hover:scale-95 rounded-lg px-1 duration-200">Accept</button>
                        <button className="bg-red-600 text-xs hover:scale-95 rounded-lg px-1 duration-200">Delete</button>
                    </div>
                </div>
            ))}
        </div>
        ) : (
            <div className='overflow-y-auto max-h-60'> 
                {
                    friendRequests
                    .filter((fl) => fl.status === "pending" && fl.to === EmailUser)
                    .filter((mp) => 
                        mp.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        userDetails.find(user => user.email === mp.from)?.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        userDetails.find(user => user.email === mp.from)?.username.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((mp, i) => {
                        const filtUser = userDetails.find((user) => user.email === mp.from);
                        const highlightedName = highlightText(filtUser?.fullname);
                        const highlightedEmail = highlightText(filtUser?.email);
    
                        return (
                            <div key={i}>
                                <div className="hover:scale-95 duration-300 shadow-lg mb-2 bg-gray-800 rounded-xl flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center px-4 py-3 gap-2">
                                        <Image
                                            onClick={() => router.push(`/${filtUser?.username}`)}
                                            src={filtUser?.urlimage}
                                            alt={`${filtUser?.username}`}
                                            width={40}
                                            height={40}
                                            className="rounded-full cursor-pointer"
                                        />
                                        <div>
                                            <span className="block font-bold text-xs md:text-sm  break-all line-clamp-1">
                                                <span dangerouslySetInnerHTML={{ __html: highlightedName }} />
                                            </span>
                                            <span className="text-gray-400 text-xs break-all line-clamp-1">
                                                <span dangerouslySetInnerHTML={{ __html: highlightedEmail }} />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row-reverse gap-2 mr-4">
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
                            </div>
                        );
                    })
                }
            </div>
        )}
        {frCount === 0 && (
            <p className="text-sm py-5 flex items-center justify-center">No pending friend requests</p>

        )}
    </div>
);

}

export default FriendsReq;