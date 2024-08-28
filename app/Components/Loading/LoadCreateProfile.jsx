import React from 'react'

function LoadCreateProfile() {
  return (
    <div className="flex md:items-start items-start justify-center md:h-[580px] h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-6">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg transform transition duration-500 hover:scale-105">
      <div className="flex items-center justify-around mb-6">
        {/* User Image Placeholder */}
        <div className="rounded-full bg-gray-500 animate-pulse w-28 h-28 object-cover border-4 border-purple-500 shadow-lg"></div>
      </div>
      <div className="space-y-6">
        {/* Loading Message */}
        <div className="bg-gray-300 rounded-md text-sm w-full h-8 animate-pulse  mb-2">
          
        </div>
        <div className="bg-gray-300 rounded-md text-sm w-full h-16 animate-pulse  mb-2">
          
        </div>
        {/* Optional: Placeholder for additional content */}
        <div className="bg-gray-300 h-6 rounded-md animate-pulse"></div>
      </div>
    </div>
  </div>
  )
}

export default LoadCreateProfile