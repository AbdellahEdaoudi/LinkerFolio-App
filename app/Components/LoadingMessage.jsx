import React from 'react'

function LoadingMessage() {
  return (
    <div className='flex flex-col justify-between md:w-auto w-screen pb-10'>
        <div className='w-ful h-14 bg-gray-300 mx-3 animate-pulse rounded-md my-3'></div>
        <div className='w-ful h-96 bg-gray-300 mx-3 animate-pulse rounded-md '></div>
    </div>
  )
}

export default LoadingMessage