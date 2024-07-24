"use client"
import React, { useContext } from 'react'
import CreateProfile from '../Components/CreateProfile'
import { useRouter } from 'next/navigation';
import { MyContext } from '../Context/MyContext';
import { useUser } from '@clerk/nextjs';

function page() {
    const {userDetails} = useContext(MyContext);
    const router = useRouter();
    const {user} = useUser();
    const EmailUser = user?.emailAddresses[0].emailAddress
    const filt = userDetails.find(
        (fl) => fl.email === EmailUser
      );
      if (filt) {
        router.push("/");
        return ;
      }
  return (
    <div><CreateProfile /></div>
  )
}

export default page