"use client";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { MyContext } from '../Context/MyContext';
import { toast } from 'react-toastify';
import { CheckCheck } from 'lucide-react';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [iduser, setIduser] = useState('');
  const [Loading, setLoading] = useState(false);
  const {userDetails,EmailUser,SERVER_URL_V}=useContext(MyContext);
  const [particles, setParticles] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const user = userDetails.find(user => user.email === EmailUser);
    if (user) {
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setIduser(user._id);
    }
  }, [userDetails, EmailUser]);

  const sendContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${SERVER_URL_V}/contacts`, {iduser, email, phoneNumber, message },{
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
        }
      });
      toast(<p className='flex gap-3 items-center'><CheckCheck /> Sent successfully!</p>, {
        autoClose: 2000,
      }); 
      setMessage('');
    } catch (error) {
      console.error('Error adding contact:', error);
      if (error.response && error.response.status === 429) {
        toast.error(<p className='flex gap-3 items-center'>
            Too many requests! Please try again later.
        </p>, {
            autoClose: 2000,
        });
    } else {
        toast.error(<p className='flex gap-3 items-center'>
            An error occurred while adding the contact.
        </p>, {
            autoClose: 2000,
        });
    }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 50 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
      }))
    }

    setParticles(generateParticles())

    const handleResize = () => {
      setParticles(generateParticles())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const moveParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
        }))
      )
    }

    const intervalId = setInterval(moveParticles, 50)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  return (
    <div className='relative'>
      <div className="absolute inset-0">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-[#00a896]"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: 0.6,
              transform: `translate(${(mousePos.x - particle.x) / 20}px, ${(mousePos.y - particle.y) / 20}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        ))}
      </div>
      <div className="  pt-4 pb-28 px-4 flex flex-col-reverse md:flex-row items-center justify-center">
      <div className="md:w-1/2 w-full bg-white p-6 rounded-lg shadow-md mb-3 md:mb-0 z-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Contact Us</h2>
        <form onSubmit={sendContact}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-base font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              // onChange={(e)=>{setEmail(e.target.value)}}
              className="w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block text-gray-700 text-base font-medium mb-1">Phone Number</label>
            <input
              type="text"
              id="number"
              value={phoneNumber}
              onChange={(e)=>{setPhoneNumber(e.target.value)}}
              className="w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-base font-medium mb-1">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e)=>{setMessage(e.target.value)}}
              className="w-full px-3 py-2 border border-gray-300 text-black bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              rows="3"
              placeholder="Enter your message"
              required
            />
          </div>
          <button
            disabled={Loading}
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-teal-500 text-white py-2 px-4  rounded-md hover:from-teal-500 hover:to-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-500 duration-300"
          >
            {Loading ? <>Sending <i className="fa fa-spinner fa-spin "></i></> : "Send"}
          </button>
        </form>
      </div>
    </div>
    </div>
    
  );
};

export default ContactForm;
