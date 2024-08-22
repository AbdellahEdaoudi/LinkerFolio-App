"use client";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Link, Mail, MailCheck, MapPin, MessageCircleMore, Phone, Pin, QrCode, UserPlus } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import QRCode from "qrcode.react";
import download from "downloadjs";
import { MyContext } from "../Context/MyContext";
import UserLinks from "./UserLinks";
import Loadingpage from "../Components/LoadingPage";
import FriendRequest from "./FriendRequest";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInComponents from "../Components/SignInComponents";
import QrcodeProfile from "./QrcodeProfile";

function GetUserByUsername({params}) {
  const path = usePathname();
  const router = useRouter();
  const [userDetailsG, setUserDetailsG] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const {CLIENT_URL,SERVER_URL_V,userLinks,EmailUser} = useContext(MyContext);
  
  const CopyLinkProfil = () => {
    const urlToCopy = `${CLIENT_URL}/${userDetailsG.username}`;
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setCopied(true);
      toast("Copied successfully");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${SERVER_URL_V}/user/${params.username}`);
        if (!response.data) {
          throw new Error("User not found");
        }
        setUserDetailsG(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
      fetchUserDetails();
  }, [SERVER_URL_V,params.username]);

  if (error) {
    return (
      <div className="h-screen">
        <div className="max-w-lg mx-auto mt-20 bg-red-100 border border-red-400 rounded-lg p-4 shadow-lg">
          <div className="flex items-center ">
            <svg
              className="h-8 w-8 text-red-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <p className="text-red-700 text-lg font-semibold">
               Account not found
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  const DownloadQRCode = () => {
    const qrCodeDataURL = document
      .getElementById("qrcode")
      .toDataURL("image/png");
    download(qrCodeDataURL, `${userDetailsG.username}-QrCode-Profile.png`, "image/png");
  };

  const ShareQRCode = () => {
    const canvas = document.getElementById("qrcode");
    const tempCanvas = document.createElement("canvas");
    const context = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width + 40;
    tempCanvas.height = canvas.height + 40;

    context.fillStyle = "white";
    context.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    context.drawImage(canvas, 20, 20);

    tempCanvas.toBlob(
      (blob) => {
        const file = new File([blob], "qrcode.png", { type: "image/png" });

        if (navigator.share) {
          navigator
            .share({
              title: `${userDetailsG.fullname}'s QR Code`,
              files: [file],
            })
            .then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing", error));
        } else {
          alert("Share not supported on this browser");
        }
      },
      "image/png",
      1.0
    );
  };

  const ShareLink = () => {
    const url = `${CLIENT_URL}/${userDetailsG.username}`;

    if (navigator.share) {
      navigator
        .share({
          url: url,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Share not supported on this browser");
    }
  };

  if (!userDetailsG) {
    return (
      <div>
        <Loadingpage />
      </div>
      // <p className="flex justify-center h-screen items-start py-32 text-8xl">
      //   <i className="fa fa-spinner fa-spin "></i>
      // </p>
    );
  }
  const datasocial = [
    { id: 1, icon: '/Icons/wts.svg', alt: 'WhatsApp', link: userDetailsG.whatsapp },
    { id: 8, icon: '/Icons/link.svg', alt: 'LinkedIn', link: userDetailsG.Linkedin },
    { id: 9, icon: '/Icons/github.svg', alt: 'GitHub', link: userDetailsG.github },
    { id: 11, icon: '/Icons/tele.svg', alt: 'Telegram', link: userDetailsG.Telegram },
    { id: 2, icon: '/Icons/messenger.svg', alt: 'Messenger', link: userDetailsG.messenger },
    { id: 6, icon: '/Icons/ins.svg', alt: 'Instagram', link: userDetailsG.instagram },
    { id: 7, icon: '/Icons/twit.svg', alt: 'Twitter', link: userDetailsG.Twitter },
    { id: 10, icon: '/Icons/yt.svg', alt: 'YouTube', link: userDetailsG.Youtube },
    { id: 3, icon: '/Icons/reddit.svg', alt: 'Reddit', link: userDetailsG.reddit },
    { id: 4, icon: '/Icons/twitch.svg', alt: 'Twitch', link: userDetailsG.twitch },
    { id: 5, icon: '/Icons/fb.svg', alt: 'Facebook', link: userDetailsG.fb },
    { id: 12, icon: '/Icons/snap.svg', alt: 'Snapchat', link: userDetailsG.snapchat },
  ];
  const datamodul = [
    {name : "🔷 Profile" , data:userDetailsG.bio },
    {name : "💼 Services" , data:userDetailsG.services },
    {name : "🎓 Education" , data:userDetailsG.education },
    {name : "⭐ Experience" , data:userDetailsG.experience },
    {name : "💡 Skills" , data:userDetailsG.skills },
    {name : "🌍 Languages" , data:userDetailsG.languages },
  ]

  const boldNumbers = (text) => {
    if (!text) {
      return [];
    }
    const parts = text.split(/(\d+|:)/);
    return parts.map((part, index) =>
      /\d+|:/.test(part) ? <span key={index} className="text-black font-bold">{part}</span> : part
    );
  };
  const ListDisk = (data) => {
    return (
      <ul className="list-disc ml-6">
        {data.split('\n').map((sp, i) => (
          <li key={i}>{sp}</li>
        ))}
      </ul>
    );
  };
  const emailuser =userDetailsG.email
  return (
    <div className={` flex items-start justify-center   pt-4 pb-96 ${userDetailsG.bgcolorp}`}>
      <div className="w-[800px] mx-4 relative  bg-slate-50 px-4 md:px-8 pt-4 pb-8 rounded-lg border-2 shadow-lg">
           {/* Image Profile and info user */}
           <div className=" border flex flex-col md:flex-row md:items-start items-center mb-4 p-4 bg-white rounded-lg shadow-md">
               <div>
                 <AlertDialog>
                  <AlertDialogTrigger>
                    {!userDetailsG.urlimage ? (
                      <div
                      width={140}
                      height={0}
                      src={"/prifil Loading.png"}
                      alt="Profile Image"
                      className="object-cover bg-gray-300 animate-pulse w-32 h-32  cursor-pointer"
                      />
                    ):(
                      <div className="border-4  border-green-600 shadow-lg  rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 duration-500">
                   <Image
                     width={136}
                     height={0}
                     src={userDetailsG.urlimage}
                     alt="Profile Image"
                     className="object-cover cursor-pointer"
                     />
                     </div>
                    )}
                    
                  </AlertDialogTrigger>
                  <AlertDialogContent >
                    <AlertDialogHeader>
                      <AlertDialogDescription className="flex justify-center">
                                <Image
                             width={400}
                             height={400}
                             src={userDetailsG.urlimage}
                             alt="Profile Image"
                             className="object-cover rounded-full cursor-pointer"
                           />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 duration-300 hover:scale-105">Cancel</AlertDialogCancel>
                      {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
               </div>
               <div className="text-center md:text-left">
                 <h2 className="font-bold text-2xl text-gray-800">
                  {userDetailsG.fullname}
                 </h2>
                 <p className="hidden text-gray-600 fle items-center justify-center md:justify-start gap-2 mt-1">
                   <span className="text-green-500"><MailCheck width={18} /></span> {userDetailsG.email}
                 </p>
                 <p className="text-gray-600 md:flex items-center md:justify-start justify-center   md:gap-2 mt-1">
                   <span className="text-green-900">@ {userDetailsG.username}</span>
                   {userDetailsG.country &&
                  <span className="flex gap-1 justify-center"><MapPin  width={18} style={{ color: "red" }} />{userDetailsG.country}</span>
                   }
                 </p>
                 {userDetailsG.phoneNumber &&
                 <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                   <Phone width={18} style={{ color: "green" }} />{userDetailsG.phoneNumber}
                 </p>
                 }
                 
                 {/* Business Links */}
                 <p>
                 <UserLinks emailuser={emailuser}  /> 
                 </p>
                 {/* Social Media */}
                    <div className="flex flex-wrap gap-4 justify-center my-2 ">
                      {datasocial.filter((social) => social.link)
                        .map((social, i) => (
                          <a
                            key={i}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex hover:scale-105 items-center justify-center bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md shadow-md transition duration-300"
                          >
                            <Image src={social.icon} alt={social.alt} width={24} height={24} />
                            {/* <span className="ml-2 text-gray-800 font-medium">{social.alt}</span> */}
                          </a>
                        ))}
                  </div>
                 {/* className={`${userDetails.phoneNumber ? "text-blue-700" : "md:block hidden md:text-white"}`} */}
                 {/* className={`${userDetails.country ? "text-red-700" : " md:block hidden md:text-white"}`} */}
               </div>
             </div>
              {/* Setting  */}
              <nav className="grid grid-cols-1 md:grid-cols-2 absolute md:right-24 right-7 top-10 md:gap-5 duration-300 gap-4">
                {/* CopyLinkProfil */}
                 <button className="rounded-full hover:scale-110 flex justify-center hover:bg-gray-200 border h-10 w-10 p-2  duration-300" 
                  onClick={CopyLinkProfil}
                  title="Copy link"
                >
                  {copied ? <p className="text-[14px]">Copied!</p> : <Link />} <br />
                 </button>
                 {/* Modal Qr and Link */}
                  <QrcodeProfile userDetailsG={userDetailsG} />
                 {/* Email User */}
                 <span className="flex gap-2 border p-2 rounded-full w-10 cursor-pointer hover:text-red-700 hover:scale-110 duration-200  "> 
                 <a className="hover:scale-105 duration-500 hover:text-green-700" href={`mailto:${userDetailsG.email}`}><Mail width={23} /></a>

                 </span>
                 {/* messageTo */}
                 <SignedIn >
                 <FriendRequest userDetailsG={userDetailsG} emailuser={emailuser} path={path} />
                 </SignedIn>
                 <SignedOut>
                 <SignInComponents />
                 </SignedOut>
              </nav>
        {/* Category */}
        <p className="text-base font-semibold text-center text-gray-800 bg-gray-100 p-2 my-2 rounded border border-gray-300">
                 {userDetailsG.category}
         </p>
         {/* Modul */}
         <div className="flex flex-wrap gap-2 mb-2 justify-center">
         {datamodul.map((dt,i)=>{
          return (
            <div key={i} >
              <AlertDialog>
               <AlertDialogTrigger className={`p-2 ${!dt.data && "hidden"} bg-slate-100  hover:bg-slate-200 hover:scale-105 duration-300 rounded-lg border-2`}>{dt.name}</AlertDialogTrigger>
               <AlertDialogContent>
                 <AlertDialogHeader>
                   <AlertDialogTitle className=" bg-gray-200 p-2 border rounded-md">{dt.name}</AlertDialogTitle>
                   <AlertDialogDescription className="overflow-y-auto max-h-96 bg-sky-50  p-4 duration-300 rounded-sm border text-black whitespace-break-spaces text-start">
                   {ListDisk(dt.data)}
                   </AlertDialogDescription>
                 </AlertDialogHeader>
                 <AlertDialogFooter>
                   <AlertDialogCancel className='bg-gray-100 hover:bg-gray-200 duration-300'>Cancel</AlertDialogCancel>
                   {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                 </AlertDialogFooter>
               </AlertDialogContent>
             </AlertDialog>
            </div>
          )
         })}
         </div>
         
        {/* Profile */}
          {userDetailsG.bio && (
        <div className="p-4 mt-4 bg-white rounded-lg shadow-md border duration-500 hover:scale-100">
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">🔷 Profile</h3>
              <p className="text-gray-800 whitespace-pre-wrap leading-normal tracking-normal text-base">
                {ListDisk(userDetailsG.bio)}
              </p>
        </div>
          )}
        
        {/* Services */}
        {userDetailsG.services && (
          <div className="mt-3 p-4 bg-white rounded-lg border shadow-md duration-500 hover:scale-100">
            {/* <div className="border-b-2 border-indigo-500 mb-3"></div> */}
            <h3 className="text-xl font-semibold text-indigo-500 mb-2">💼 Services</h3>
            <p className="text-gray-800 overflow-y-auto whitespace-pre-wrap leading-normal tracking-normal text-base">
              {ListDisk(userDetailsG.services)}
            </p>
          </div>
        )}

        {/* Education */}
        <div className={`${!userDetailsG.education && "hidden"} mt-3 border p-4 bg-white rounded-lg shadow-md mb-6 hover:scale-100 duration-500`}>
          {/* <div className="border-b-2 border-indigo-500 mb-3"></div> */}
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">🎓 Education</h3>
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {ListDisk(userDetailsG.education)}
          </p>
        </div>

        {/* Experience */}
        <div className={`${!userDetailsG.experience && "hidden"} border p-4 bg-white rounded-lg shadow-md mb-6 hover:scale-100 duration-500`}>
          {/* <div className="border-b-2 border-indigo-500 mb-3"></div> */}
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">⭐ Experience</h3>
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {ListDisk(userDetailsG.experience)}
          </p>
        </div>
        
        {/* Skills */}
        <div className={`${!userDetailsG.skills && "hidden"} border p-4 bg-white rounded-lg shadow-md mb-6 hover:scale-100 duration-500`}>
          {/* <div className="border-b-2 border-indigo-500 mb-3"></div> */}
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">💡 Skills</h3>
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {ListDisk(userDetailsG.skills)}
          </p>
        </div>
        
        {/* Languages */}
        <div className={`${!userDetailsG.languages && "hidden"} border p-4 bg-white rounded-lg shadow-md hover:scale-100 duration-500`}>
          {/* <div className="border-b-2 border-indigo-500 mb-3"></div> */}
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">🌍 Languages</h3>
          <p className="text-gray-800 overflow-y-auto max-h-[120px] whitespace-pre-wrap leading-relaxed">
            {ListDisk(userDetailsG.languages)}
          </p>
        </div>

        {/* <div>
        <div className="border-b border-gray-300 my-2"></div>
        <label htmlFor="bgcolorSelect" className="block mb-2 font-bold">
          Select Background Color:
        </label>
        <div className="grid grid-cols-8 gap-2">
        {bgcolorOptions.map((bg, index) => (
              <div
                key={index}
                className={`p-4 rounded-md shadow-md cursor-pointer ${bg} ${bg === Bgcolor ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setbgcolor(bg)}
              >
        </div>
      ))}
        </div>
        </div> */}
      </div>
    </div>
  );
}

export default GetUserByUsername;
