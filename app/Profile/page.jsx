"use client"
import { SignIn, useUser } from '@clerk/nextjs';
import QRCode from 'qrcode.react';
import download from 'downloadjs';
import axios from 'axios';
import {Link2, PenOff, QrCode } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@chakra-ui/react';
import { toast } from 'sonner';
  
  

function ProfilePage() {
    const { user } = useUser();
    const [userDetails, setUserDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:9999/users`)
            .then((res) => {
                setUserDetails(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
                setLoading(false);
            });
    }, []);

    // if(!user){
    //     return  <div className="flex justify-center py-20">
    //     <SignIn />
    // </div>
    // }

    
    const handleDownloadQRCode = () => {
          const qrCodeDataURL = document
            .getElementById('qrcode')
            .toDataURL('image/png');
          download(qrCodeDataURL, `${user.fullName}.png`, 'image/png');
      };
      const handleShareQRCode = () => {
        const canvas = document.getElementById("qrcode");
        const tempCanvas = document.createElement('canvas');
        const context = tempCanvas.getContext('2d');
      
        tempCanvas.width = canvas.width + 40;
        tempCanvas.height = canvas.height + 40;
        
        context.fillStyle = 'white';
        context.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      
        context.drawImage(canvas, 20, 20);
      
        tempCanvas.toBlob((blob) => {
          const file = new File([blob], "qrcode.png", { type: "image/png" });
      
          if (navigator.share) {
            navigator.share({
              title: `${userDetails.fullname}'s QR Code`,
              files: [file],
            })
            .then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing", error));
          } else {
            alert("Share not supported on this browser");
          }
        }, "image/png", 1.0);
      };

    if (isLoading) {
        return <p className="flex justify-center items-start h-screen py-32 text-8xl">
        <i className="fa fa-spinner fa-spin "></i>
        </p>;
    }
    
    return (
        <div>
            {userDetails
                .filter((fl) => fl.fullname === user?.fullName)
                .map((user, i) => (
                    <div className={`container mx-auto h-screen ${user.bgcolorp} py-4`}>
                    <div key={i} className={`max-w-lg mx-auto relative bg-slate-100  p-6 rounded-lg border-2 shadow-lg`}>
                        <div className='flex justify-between'>
                            <div className="flex items-center mb-4">
                                <div className="mr-3 md:mr-4 duration-500">
                                    <img src={user.urlimage} alt="Profile Image" className="rounded-full h-24 w-full object-cover" />
                                </div>
                                <div>
                                    <h2 className="font-bold">{user.fullname}</h2>
                                    <p className="text-gray-600">@{user.username}</p>
                                    <p className="text-gray-600">{user.phoneNumber}</p>
                                </div>
                            </div>
                            <Link href={`/Profile/${user._id}`} className='bg-green-400 hover:bg-green-500 hover:rounded-lg duration-300 p-2 h-10 rounded-md'>
                                <PenOff />
                            </Link>
                        </div>
                        <div className='flex gap-2 hover:scale-105 duration-300 hover:text-sky-400 absolute right-7 top-20 ' href={`/${user.username}/${user._id}`}>                        
                        <AlertDialog>
                         <AlertDialogTrigger asChild>
                           <Button variant="outline"className='gap-1' >Link <Link2 /></Button>
                         </AlertDialogTrigger>
                         <AlertDialogContent>
                           <AlertDialogHeader>
                             <AlertDialogTitle>Link Profile : </AlertDialogTitle>
                             <AlertDialogDescription className="flex justify-center gap-4">
                                  <div>
                                  <button
                                         className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                                         onClick={()=>{
                                            const url = `http://localhost:3000/${user.username}/${user._id}`;
      
                                           if (navigator.share) {
                                             navigator.share({
                                               url: url,
                                             })
                                             .then(() => console.log("Successful share"))
                                             .catch((error) => console.log("Error sharing", error));
                                           } else {
                                             alert("Share not supported on this browser");
                                           }
                                         }}
                                       >Share Link
                                  </button>
                                  </div>
                                  <button
                                         className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                                         onClick={()=>{
                                            const urlToCopy = `http://localhost:3000/${user.username}/${user._id}`;
                                             navigator.clipboard.writeText(urlToCopy).then(() => {
                                               setCopied(true);
                                               toast("Copied successfully")
                                               setTimeout(() => setCopied(false), 2000);
                                             });
                                         }}
                                       >{copied ? "Copied!" : "Copy Link"} <br />
                                  </button>
                             </AlertDialogDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                             <AlertDialogCancel>Cancel</AlertDialogCancel>
                             {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                           </AlertDialogFooter>
                         </AlertDialogContent>
                       </AlertDialog>
                       </div>
                       {/* QrCode */}
                        <span className='flex gap-2 cursor-pointer hover:text-sky-700 hover:scale-110 duration-200 absolute right-7 top-[110px] '>
                        <AlertDialog>
                          <AlertDialogTrigger>
                          <QrCode />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>QR Code Profile</AlertDialogTitle>
                              <AlertDialogDescription>
                              <div className='flex flex-col justify-center items-center '>
                                <div className='border-2 rounded-md p-2'>
                                <QRCode id="qrcode" value={`http://localhost:3000/${user.username}/${user._id}`} />
                                </div>                                
                                <div className="flex gap-3">
                                  <button className='p-2 bg-blue-300 rounded-md my-2 text-black font-medium' onClick={handleDownloadQRCode}>Download</button>
                                  <button
                                         className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                                         onClick={handleShareQRCode}
                                       >Share</button>
                                   </div>                              
                              </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        </span>
                        <div className="border-b border-gray-300 my-2"></div>
                        <div className="border-b border-gray-300 my-2">
                            <h3 className="text-lg font-semibold mb-2">Email: <span className='font-normal text-gray-600'>{user.email}</span></h3>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                            <ul className="flex space-x-4">
                                {user.fb && (
                                    <li>
                                        <a href={user.fb} target="_blank" rel="noopener noreferrer">
                                            <Image src={"/Icons/fb.svg"} width={40} height={40}  alt="Facebook" />
                                        </a>
                                    </li>
                                )}
                                {user.instagram && (
                                    <li>
                                        <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                                            <Image src={"/Icons/ins.svg"} width={40} height={40}  alt="Instagram" />
                                        </a>
                                    </li>
                                )}
                                {user.Twitter && (
                                    <li>
                                        <a href={user.Twitter} target="_blank" rel="noopener noreferrer">
                                            <Image src={"/Icons/twit.svg"} width={40} height={40}  alt="Twitter" />
                                        </a>
                                    </li>
                                )}
                                {user.Linkedin && (
                                    <li>
                                        <a href={user.Linkedin} target="_blank" rel="noopener noreferrer">
                                            <Image src={"/Icons/link.svg"} width={40} height={40}  alt="LinkedIn" />
                                        </a>
                                    </li>
                                )}
                                {user.github && (
                                    <li>
                                        <a href={user.github} target="_blank" rel="noopener noreferrer">
                                            <Image src={"/Icons/github.svg"} width={40} height={40}  alt="GitHub" />
                                        </a>
                                    </li>
                                )}
                                {user.Youtube && (
                                    <li>
                                        <a href={user.Youtube} target="_blank" rel="noopener noreferrer">
                                            <Image src={"/Icons/yt.svg"} width={40} height={40}  alt="YouTube" />
                                        </a>
                                    </li>
                                )}
                                {user.Telegram && (
                                    <li>
                                        <a href={user.Telegram} target="_blank" rel="noopener noreferrer">
                                            <Image src={"/Icons/tele.svg"} width={40} height={40}  alt="Telegram" />
                                        </a>
                                    </li>
                                )}
                                {user.snapchat && (
                                    <li>
                                        <a href={user.snapchat} target="_blank" rel="noopener noreferrer">
                                            <Image src={"/Icons/snap.svg"} width={40} height={40}  alt="Snapchat" />
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="border-b border-gray-300 my-2"></div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Bio</h3>
                            <p className="text-gray-700 overflow-y-auto md:max-h-[120px] whitespace-pre-wrap">{user.bio}</p>
                        </div>
                    </div>
                    </div>
                ))}
        </div>
    );
}

export default ProfilePage;
