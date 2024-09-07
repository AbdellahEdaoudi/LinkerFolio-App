"use client"
import React, { useEffect, useState,useContext } from 'react'
import axios from "axios"
function page() {
  const [userDetails, setUserDetails] = useState([]);
//   const SERVER_URL_V = "http://localhost:9999" ;
//   const SERVER_URL_V = "https://saas-app-api.vercel.app";
  const SERVER_URL_V = "https://socketserver-muhp.onrender.com";


   // Fetch users
   useEffect(() => {
    axios.get(`${SERVER_URL_V}/users`,{
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
        }
      })
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [SERVER_URL_V]);
  return (
    <div className='min-h-screen'>
        {
    userDetails.map((mp,i)=>{
        return(
            <div key={i} className='p-4 bg-white'>
                {mp.email}
            </div>
        )
    })
    }
    {!userDetails && (
        <div>
            Mazal ma khdma
        </div>
    )}
    </div>
  )
}

export default page