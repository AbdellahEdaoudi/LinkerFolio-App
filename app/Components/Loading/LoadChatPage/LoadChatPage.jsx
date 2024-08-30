import React from 'react'
import LUserList from './LUserList'
import LMessages from './LMessages'

function LoadChatPage() {
  return (
    <div className='flex '>
        <div className='bg-gray-800 w-full md:h-auto min-h-screen md:w-1/3 p-4 '>
            <LUserList />
        </div>
        <div className='w-full md:block hidden'>
            <LMessages />
        </div>
    </div>
  )
}

export default LoadChatPage