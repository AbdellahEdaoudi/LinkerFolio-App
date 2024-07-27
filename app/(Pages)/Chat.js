"use client"
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { AuthContext } from './contexts/AuthContext';

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user, logout } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    newSocket.emit('auth', localStorage.getItem('token'));
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message) => {
        if (message.sender === selectedUser?._id || message.receiver === selectedUser?._id) {
          setMessages(prev => [...prev, message]);
        }
      });
    }
  }, [socket, selectedUser]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data.filter(u => u._id !== user.id));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${userId}`);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:5000/api/messages', {
        receiverId: selectedUser._id,
        content: newMessage
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>WhatsApp Clone</h1>
      <button onClick={logout}>Logout</button>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%' }}>
          <h2>Users</h2>
          <ul>
            {users.map(u => (
              <li key={u._id} onClick={() => { setSelectedUser(u); fetchMessages(u._id); }}>
                {u.name}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ width: '70%' }}>
          {selectedUser && (
            <>
              <h2>Chat with {selectedUser.name}</h2>
              <div>
                {messages.map(m => (
                  <p key={m._id}>{m.sender === user.id ? 'You' : selectedUser.name}: {m.content}</p>
                ))}
              </div>
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button onClick={sendMessage}>Send</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}