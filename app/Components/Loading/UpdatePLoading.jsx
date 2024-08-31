import { bgcolorOptions } from '@/app/data/bgcolorOptions';
import React from 'react'

function UpdatePLoading() {
    const datasocial = [
        { iconSrc: "/Icons/wts.svg", alt: "WhatsApp", placeholder: "WhatsApp Link" },
        { iconSrc: "/Icons/link.svg", alt: "LinkedIn",placeholder: "LinkedIn Link" },
        { iconSrc: "/Icons/github.svg", alt: "GitHub",placeholder: "GitHub Link" },
        { iconSrc: "/Icons/tele.svg", alt: "Telegram",placeholder: "Telegram Link" },
        { iconSrc: "/Icons/messenger.svg", alt: "Messenger",placeholder: "Messenger Link" },
        { iconSrc: "/Icons/twit.svg", alt: "Twitter",placeholder: "Twitter Link" },
        { iconSrc: "/Icons/fb.svg", alt: "Facebook",placeholder: "Facebook Link" },
        { iconSrc: "/Icons/reddit.svg", alt: "Reddit",placeholder: "Reddit Link" },
        { iconSrc: "/Icons/twitch.svg", alt: "Twitch",placeholder: "Twitch Link" },
        { iconSrc: "/Icons/ins.svg", alt: "Instagram",placeholder: "Instagram Link" },
        { iconSrc: "/Icons/yt.svg", alt: "YouTube",placeholder: "YouTube Link" },
        { iconSrc: "/Icons/snap.svg", alt: "Snapchat",placeholder: "Snapchat Link" }
      ];
      const datamodul = [
        {name : "🔷 Profile"},
        {name : "💼 Services"},
        {name : "🎓 Education"},
        {name : "⭐ Experience"},
        {name : "💡 Skills"},
        {name : "🌍 Languages"},
      ]
  return (
    <div className={` cursor-progress  flex items-center justify-center pt-4 pb-6 duration-300`}>
        <div className="mx-4  md:w-[800px] px-4 md:px-8 pb-14 bg-white p-6 rounded-lg border-2 shadow-lg">
        
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 space-y-8 md:space-y-0 md:space-x-8">
  {/* Profile Image Section */}
  <div className="flex md:ml-5 flex-col items-center bg-white shadow-xl border border-gray-200 rounded-lg p-6 w-full md:w-1/3">
    <div
      className="rounded-full bg-gray-300 animate-pulse  w-40 h-40 object-cover mb-4 border-4 border-green-500 shadow-lg"
      width={160}
      height={160}
    />
    <label htmlFor="file-upload" className="bg-gradient-to-r  from-teal-400 to-green-500 text-white font-semibold rounded-full px-4 py-2 cursor-pointer transition duration-300 hover:bg-green-600">
      Upload Image 
    </label>
  </div>

  {/* User Information Section */}
  <div className=" bg-white shadow-xl border border-gray-200 rounded-lg p-6 w-full md:w-2/3 space-y-4">
    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800"></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Fullname:</label>
        <input
  type="text"
  name="fullname"
  required
  className="bg-gray-100 animate-pulse border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
/>


      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Username:</label>
        <input
          type="text"
          className="w-full animate-pulse px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Country:</label>
        <input
          type="text"
          name="country"
          className="bg-gray-100 animate-pulse border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Phone:</label>
        <input
          type="text"
          name="phoneNumber"
          className="bg-gray-100 animate-pulse border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Category:</label>
        <input
          type="text"
          name="category"
          className="bg-gray-100 animate-pulse border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  </div>
    </div>
    {/* Modul */}
<div className="flex flex-wrap gap-2 mb-2 justify-center">
  {datamodul.map((dt) => (
    <div key={dt.name}>
      <div className={`p-2 bg-slate-100 hover:bg-slate-200 hover:scale-105 duration-300 rounded-lg border-2`}>
          {dt.name}
        </div>
    </div>
  ))}
</div>

{/* Social Media Section */}
<div className="mb-8">
  <div className="flex flex-wrap gap-4 justify-center">
    {datasocial.map((item, i) => (
      <div key={i} className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-md transition duration-300">
      <img src={item.iconSrc} width={24} height={24} alt={item.alt} />
      <span className="ml-2 text-gray-800 font-medium">{item.alt}</span>
    </div>
    ))}
  </div>
</div>
        </div>
    </div>
  )
}

export default UpdatePLoading