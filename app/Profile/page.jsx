"use client";
import { useUser } from "@clerk/nextjs";
import QRCode from "qrcode.react";
import download from "downloadjs";

import { Link2, MailCheck, PenOff, Phone, Pin, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@chakra-ui/react";
import { toast } from "sonner";
import { MyContext } from "../Context/MyContext";

function ProfilePage() {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const {CLIENT_URL,userDetails} = useContext(MyContext);



  const DownloadQRCode = () => {
    const qrCodeDataURL = document
      .getElementById("qrcode")
      .toDataURL("image/png");
    download(qrCodeDataURL, `${user.fullName}.png`, "image/png");
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
              title: `${userDetails.fullname}'s QR Code`,
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

  if (!userDetails) {
    return (
      <p className="flex justify-center items-start h-screen py-32 text-8xl">
        <i className="fa fa-spinner fa-spin "></i>
      </p>
    );
  }
  const datasocial = [
    { key: "Linkedin", src: "/Icons/link.svg", alt: "LinkedIn" },
    { key: "github", src: "/Icons/github.svg", alt: "GitHub" },
    { key: "whatsapp", src: "/Icons/wts.svg", alt: "WhatsApp" },
    { key: "Telegram", src: "/Icons/tele.svg", alt: "Telegram" },
    { key: "messenger", src: "/Icons/messenger.svg", alt: "Messenger" },
    { key: "reddit", src: "/Icons/reddit.svg", alt: "Reddit" },
    { key: "twitch", src: "/Icons/twitch.svg", alt: "Twitch" },
    { key: "fb", src: "/Icons/fb.svg", alt: "Facebook" },
    { key: "instagram", src: "/Icons/ins.svg", alt: "Instagram" },
    { key: "Twitter", src: "/Icons/twit.svg", alt: "Twitter" },
    { key: "Youtube", src: "/Icons/yt.svg", alt: "YouTube" },
    { key: "snapchat", src: "/Icons/snap.svg", alt: "Snapchat" },
  ];
  const boldNumbers = (text) => {
    if (!text) {
      return [];
    }
    const parts = text.split(/(\d+|:)/);
    return parts.map((part, index) =>
      /\d+|:/.test(part) ? (
        <span key={index} className="text-black font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      {userDetails
        .filter((fl) => fl.fullname === user?.fullName)
        .map((user, i) => (
          <div
            key={i}
            className={`flex items-center  justify-center pt-4 pb-96 ${user.bgcolorp}  `}
          >
            <div
              className={`w-[800px] mx-4 relative  bg-slate-50 px-4 md:px-8 pt-6 pb-8 rounded-lg border-2 shadow-lg`}
            >
              {/* Image Profile and info user */}
             <div className=" border flex flex-col md:flex-row items-center mb-4 p-4 bg-white rounded-lg shadow-md">
               <div className="w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 duration-500">
                 <Image
                   width={96}
                   height={96}
                   src={user.urlimage}
                   alt="Profile Image"
                   className="object-cover"
                 />
               </div>
               <div className="text-center md:text-left">
                 <h2 className="font-bold text-2xl text-gray-800">{user.fullname}</h2>
                 <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                   <span className="text-green-500"><MailCheck width={18} /></span> {user.email}
                 </p>
                 <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                   <span className="text-green-700">@</span> {user.username}
                 </p>
                 <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                   <Pin width={18} style={{ color: "red" }} />{user.country}
                 </p>
                 <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                   <Phone width={18} style={{ color: "blue" }} />{user.phoneNumber}
                 </p>
               </div>
             </div>
              {/* Setting */}
              <div className="absolute top-8 space-y-2 right-7 md:top-10  md:right-12">
                {/* Link to Update */}
               <Link
                 href={`/Profile/${user._id}`}
                 className="flex items-center justify-center bg-gradient-to-r from-teal-400 to-green-500 hover:scale-105 duration-500 p-2 rounded-full shadow-lg border border-teal-600 text-white transform transition-transform"
               >
                 <PenOff className="w-6 h-6" />
               </Link>
              {/* QrCode Profile */}
              <span className="border p-2 rounded-full  flex gap-2 cursor-pointer hover:text-red-700 hover:scale-110 duration-200  ">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <QrCode />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>QR Code Profile</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="flex flex-col justify-center items-center ">
                          <div className="border-2 rounded-md p-2">
                            <QRCode
                              id="qrcode"
                              value={`${CLIENT_URL}/${user.username}`}
                            />
                          </div>
                          <div className="flex gap-3">
                            <button
                              className="p-2 bg-blue-300 rounded-md my-2 text-black font-medium"
                              onClick={DownloadQRCode}
                            >
                              Download
                            </button>
                            <button
                              className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                              onClick={ShareQRCode}
                            >
                              Share
                            </button>
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
              {/* Link Profile */}
              <div
                className="flex gap-2 hover:scale-105 duration-300 hover:text-sky-400  "
                href={`/${user.username}`}
              >
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="gap-1 p-2 border rounded-full">
                       <Link2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Link Profile : </AlertDialogTitle>
                      <AlertDialogDescription className="flex justify-center gap-4">
                        <div>
                          <button
                            className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                            onClick={() => {
                              const url = `${CLIENT_URL}/${user.username}`;

                              if (navigator.share) {
                                navigator
                                  .share({
                                    url: url,
                                  })
                                  .then(() => console.log("Successful share"))
                                  .catch((error) =>
                                    console.log("Error sharing", error)
                                  );
                              } else {
                                alert("Share not supported on this browser");
                              }
                            }}
                          >
                            Share Link
                          </button>
                        </div>
                        <button
                          className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                          onClick={() => {
                            const urlToCopy = `${CLIENT_URL}/${user.username}`;
                            navigator.clipboard
                              .writeText(urlToCopy)
                              .then(() => {
                                setCopied(true);
                                toast("Copied successfully");
                                setTimeout(() => setCopied(false), 2000);
                              });
                          }}
                        >
                          {copied ? "Copied!" : "Copy Link"} <br />
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
              </div>
              {/* category */}
              <p className="text-base font-semibold text-center text-gray-800 bg-gray-100 p-2 my-2 rounded border border-gray-300">
                 {user.category}
               </p>
              {/* Profile */}
        <div className=" border p-4 mt-4 bg-white rounded-lg shadow-md duration-500 hover:scale-105">
          {user.bio && (
            <>
              <h3 className="text-xl font-semibold text-indigo-500 mb-2">🔷 Profile</h3>
              <p className="text-gray-800 whitespace-pre-wrap leading-normal tracking-normal text-base">
                {user.bio}
              </p>
            </>
          )}
        </div>
        
        {/* Services */}
        {user.services && (
          <div className=" border mt-3 p-4 bg-white rounded-lg shadow-md duration-500 hover:scale-105">
            {/* <div className="border-b-2 border-indigo-500 mb-3"></div> */}
            <h3 className="text-xl font-semibold text-indigo-500 mb-2">💼 Services</h3>
            <p className="text-gray-800 overflow-y-auto max-h-[120px] whitespace-pre-wrap leading-normal tracking-normal text-base">
              {user.services}
            </p>
          </div>
        )}
              {/* datasocial */}
              <div className="my-4">
                <ul className="flex flex-wrap gap-4 justify-center">
                  {datasocial.map(
                    (item, i) =>
                      user[item.key] && (
                        <li key={i}>
                          <a
                           className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-md transition duration-300"

                            href={user[item.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={item.src}
                              width={25}
                              height={25}
                              alt={item.alt}
                            />
                            <span className="ml-2 text-gray-800 font-medium">{item.alt}</span>
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </div>

              {/* Education */}
        <div className={`${!user.education && "hidden"} border p-4 bg-white rounded-lg shadow-md mb-6 hover:scale-105 duration-500`}>
          {/* <div className="border-b-2 border-indigo-500 mb-3"></div> */}
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">🎓 Education</h3>
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {boldNumbers(user.education)}
          </p>
        </div>
        
        {/* Skills */}
        <div className={`${!user.skills && "hidden"} border p-4 bg-white rounded-lg shadow-md mb-6 hover:scale-105 duration-500`}>
          {/* <div className="border-b-2 border-indigo-500 mb-3"></div> */}
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">💡 Skills</h3>
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {user.skills}
          </p>
        </div>
        
        {/* Languages */}
        <div className={`${!user.languages && "hidden"} border p-4 bg-white rounded-lg shadow-md hover:scale-105 duration-500`}>
          {/* <div className="border-b-2 border-indigo-500 mb-3"></div> */}
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">🌍 Languages</h3>
          <p className="text-gray-800 overflow-y-auto max-h-[120px] whitespace-pre-wrap leading-relaxed">
            {user.languages}
          </p>
        </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProfilePage;
