"use client";

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../Context/MyContext';
import { toast } from 'react-toastify';
import { CheckCheck, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from "../../components/ui/button"
import { Input } from "../../@/components/ui/input"
import { Textarea } from "../../@/components/ui/textarea"

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [iduser, setIduser] = useState('');
  const [loading, setLoading] = useState(false);
  const { userDetails, EmailUser, SERVER_URL_V } = useContext(MyContext);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      await axios.post(`${SERVER_URL_V}/contacts`, { iduser, email, phoneNumber, message }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
        }
      });
      toast(<p className='flex gap-3 items-center'><CheckCheck className="text-teal-500" /> Message sent successfully!</p>, {
        autoClose: 2000,
      });
      setMessage('');
    } catch (error) {
      console.error('Error adding contact:', error);
      if (error.response && error.response.status === 429) {
        toast.error(<p className='flex gap-3 items-center'>Too many requests! Please try again later.</p>, {
          autoClose: 2000,
        });
      } else {
        toast.error(<p className='flex gap-3 items-center'>An error occurred while sending the message.</p>, {
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
    <div className="flex items-center justify-center bg-gradient-to-br from-teal-950 to-teal-950 p-4">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-teal-200"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: 0.4,
              transform: `translate(${(mousePos.x - particle.x) / 20}px, ${(mousePos.y - particle.y) / 20}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        ))}
      </div>
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden z-10">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Contact Us</h2>
          <form onSubmit={sendContact} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-teal-600 mb-1">Email</label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  value={email}
                  className="pl-10 border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-800 h-5 w-5" />
              </div>
            </div>
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-teal-600 mb-1">Phone Number</label>
              <div className="relative">
                <Input
                  type="text"
                  id="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Enter your phone number"
                  required
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-800 h-5 w-5" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-teal-600 mb-1">Message</label>
              <div className="relative">
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="pl-10 pt-2 border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                  rows={4}
                  placeholder="Enter your message"
                  required
                />
                <MessageSquare className="absolute left-3 top-3 text-teal-800 h-5 w-5" />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-700 to-teal-800 text-white py-2 px-4 rounded-md hover:from-teal-800 hover:to-teal-900 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;