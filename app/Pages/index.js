"use clinet"
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Chat from './Chat';
import Login from './Login';


export default function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? <Chat /> : <Login />}
    </div>
  );
}