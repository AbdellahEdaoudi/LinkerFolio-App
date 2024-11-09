"use client";

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../Context/MyContext';
import { toast } from 'react-toastify';
import { CheckCheck, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from "../../components/ui/button"
import { Input } from "../../@/components/ui/input"
import { Textarea } from "../../@/components/ui/textarea"
import ParticleComponent from '../Components/ParticleComponent';
import WarningModal from "./Pages/WarningModal"

export default function ContactForm() {
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [iduser, setIduser] = useState('')
  const [loading, setLoading] = useState(false)
  const { userDetails, EmailUser, SERVER_URL_V, contacts, setContacts } = useContext(MyContext)
  
  useEffect(() => {
    const user = userDetails.find(user => user.email === EmailUser)
    if (user) {
      setEmail(user.email || "")
      setPhoneNumber(user.phoneNumber || "")
      setIduser(user._id || "")
    }
  }, [userDetails, EmailUser])  

  const sendContact = async (e) => {
    e.preventDefault()
    setLoading(true)
    const regex = /<script.*?>.*?<\/script>|<iframe.*?>.*?<\/iframe>|javascript:|eval\(|alert\(|document\.cookie|window\.location|<a\s+href=["']?javascript:.*?["']?/i;

    if (regex.test(phoneNumber) || regex.test(message)) {
      setLoading(false)
        document.getElementById('my_modal_2').showModal();
        return;
    }
    try {
      await axios.post(`${SERVER_URL_V}/contacts`, { iduser, email, phoneNumber, message }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
        }
      })
      toast(<p className='flex gap-3 items-center'><CheckCheck className="text-teal-500" /> Message sent successfully!</p>, {
        autoClose: 2000,
      })
      setMessage('')
    } catch (error) {
      console.error('Error adding contact:', error)
      if (error.response && error.response.status === 429) {
        toast.error(<p className='flex gap-3 items-center'>Too many requests! Please try again later.</p>, {
          autoClose: 2000,
        })
      } else {
        toast.error(<p className='flex gap-3 items-center'>An error occurred while sending the message.</p>, {
          autoClose: 2000,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center  ">
      <div className="absolute inset-0 ">
        <ParticleComponent bgcolor={"bg-gradient-to-br from-teal-950 to-teal-950"}  />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="lg:flex">
            <div className="lg:w-1/2 bg-teal-800 p-4 lg:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-teal-100 mb-6">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              <div className="space-y-4">
                <div className="flex items-center text-teal-100">
                  <Mail className="h-6 w-6 mr-3" />
                  <span>linkerfolio@gmail.com</span>
                </div>
                <div className="flex items-center text-teal-100">
                  <Phone className="h-6 w-6 mr-3" />
                  <span>+212 609085357</span>
                </div>
                <div className="flex items-center text-teal-100">
                  <MessageSquare className="h-6 w-6 mr-3" />
                  <span>El-Aaiun,Morocco</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 p-8 lg:p-8">
              <h2 className="text-3xl font-bold text-teal-800 mb-6">Contact Us</h2>
              <form onSubmit={sendContact} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-teal-600 mb-1">Email</label>
                  <div className="relative">
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      className="pl-10 border-teal-300 focus:border-teal-500 focus:ring-teal-500 w-full"
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
                      type="tel"
                      id="number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10 border-teal-300 focus:border-teal-500 focus:ring-teal-500 w-full"
                      placeholder="Enter your phone number"
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
                      className="pl-10 pt-2 border-teal-300 focus:border-teal-500 focus:ring-teal-500 w-full"
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
              <WarningModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}