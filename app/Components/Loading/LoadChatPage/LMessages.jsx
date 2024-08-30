"use client"
import { Button } from '@/components/ui/button';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { EllipsisVertical } from 'lucide-react';
import React, { useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs';
import InputLoadMessages from '../InputLoadMessages';

function LMessages() {
  const [emoji, setEmoji] = useState(true);
  const [loading, setLoading] = useState(true);
  return (
    <section className='p-2 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600'>
      <div className='w-full bg-sky-50 h-14 mb-2 rounded-lg flex items-center justify-between px-4'>
        {/* 1 */}
        <div className='flex animate-pulse items-center'>
        <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
        <div className='w-44 ml-4 h-4 rounded-md bg-gray-300'></div>
        </div>
        <div className='w-72 animate-pulse h-4 rounded-md bg-gray-300'></div>
        <div className='w-60 animate-pulse h-4 rounded-md bg-gray-300'></div>
      </div>
        {/* 2 */}
      <div className='w-full bg-gray-100 h-[350px]  mb-2 rounded-lg px-6 pt-6 overflow-y-auto pb-5'>
        {[1,2].map((mp,i)=>{
          return(
            <div key={i} className='flex flex-col animate-pulse '>
        <div className='flex mb-2 '>
        <div className='flex  items-center gap-3'>
          <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
          <div className='w-52 h-9 bg-gray-300 rounded-md'></div>
          <EllipsisVertical className='text-gray-400' width={18} />
        </div>
        </div>
        <div className='flex '>
        <div className='flex  items-center gap-3'>
          <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
          <div className='w-52 h-9 bg-gray-300 rounded-md'></div>
          <EllipsisVertical className='text-gray-400' width={18} />
        </div>
        </div>
        <div className='flex mb-2 justify-end'>
        <div className='flex flex-row-reverse  items-center gap-3'>
          <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
          <div className='w-52 h-9 bg-gray-300 rounded-md'></div>
          <EllipsisVertical className='text-gray-400' width={18} />
        </div>
        </div>
        <div className='flex justify-end'>
        <div className='flex flex-row-reverse  items-center gap-3'>
          <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
          <div className='w-52 h-9 bg-gray-300 rounded-md'></div>
          <EllipsisVertical className='text-gray-400' width={18} />
        </div>
        </div>
        </div>
          )
        })}
      </div>
      {/* 3 */}
      <div>
        <InputLoadMessages />
      </div>
        
    </section>
  )
}

export default LMessages