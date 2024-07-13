"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Link, Link2, QrCode } from "lucide-react";
import { toast } from "sonner"
import {bgcolorOptions} from '@/app/data/data'
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
import QRCode from "qrcode.react";
import download from "downloadjs";
import { useUser } from "@clerk/nextjs";


function UserDetailsPage() {
  const path = usePathname();
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [Bgcolor, setbgcolor] = useState("");
  const {user} = useUser()

  const CopyLinkProfil = () => {
    const urlToCopy = `http://localhost:3000/${userDetails.username}/${userDetails._id}`;
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setCopied(true);
      toast("Copied successfully")
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/user${path}`);
        if (!response.data) {
          throw new Error("User not found");
        }
        setUserDetails(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (path) {
      fetchUserDetails();
    }
  }, [path]);

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-20 bg-red-100 border border-red-400 rounded-lg p-4 shadow-lg">
        <div className="flex items-center ">
          <svg className="h-8 w-8 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="text-red-700 text-lg font-semibold">The link entered by the user does not work</p>
        </div>
      </div>
    );
  }
  const DownloadQRCode = () => {
    const qrCodeDataURL = document
      .getElementById('qrcode')
      .toDataURL('image/png');
    download(qrCodeDataURL, `${user.fullName}.png`, 'image/png');
};


const ShareQRCode = () => {
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
  const ShareLink = () => {
    const url = `http://localhost:3000/${userDetails.username}/${userDetails._id}`;
  
    if (navigator.share) {
      navigator.share({
        url: url,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Share not supported on this browser");
    }
  };

  if (!userDetails) {
    return <p className="flex justify-center items-center py-32 text-8xl">
      <i className="fa fa-spinner fa-spin "></i>
      </p>;
  }


  return (
    <div className={`container mx-auto py-4 ${userDetails.bgcolorp} h-screen`}>
      <div className="max-w-lg mx-auto relative bg-slate-50 p-6 rounded-lg border-2 shadow-lg">
        <div className="flex justify-between ">
          <div className="flex items-center mb-4">
            <div className="mr-2 duration-500 md:mr-4">
              <img
                src={userDetails.urlimage}
                alt="Profile Image"
                className="rounded-full h-24  w-full object-cover"
              />
            </div>
            <div>
              <h2 className=" font-bold">{userDetails.fullname}</h2>
              <p className="text-gray-600">@{userDetails.username}</p>
              <p className="text-gray-600">{userDetails.phoneNumber}</p>
            </div>
          </div>
        </div>
        <button
            onClick={CopyLinkProfil}
            title="Copy link" className="rounded-full absolute right-2 top-0 m-4 hover:scale-110 flex justify-center hover:bg-gray-200 border h-10 w-10 p-2  duration-300"
          >
            {copied ? <p className="text-[14px]">Copied!</p> : <Link />} <br />
          </button>
          {/* Modal Qr and Link */}
          <span className='flex gap-2 cursor-pointer hover:text-sky-700 hover:scale-110 duration-200 absolute right-8 top-[70px] '>
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
                  <QRCode id="qrcode" value={`http://localhost:3000/${userDetails.username}/${userDetails._id}`} />
                  </div>                                
                 <div className="flex flex-row gap-3">
                 <button className='p-2 bg-blue-300 rounded-md my-2 text-black font-medium' onClick={DownloadQRCode}>
                  Download QrCode
                  </button>
                 <button
                        className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                        onClick={ShareQRCode}
                      >Share Qrcode
                 </button>
                 <button
                        className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                        onClick={ShareLink}
                      >Share Link
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
             {/* Email */}
          <div className="border-b border-gray-300 my-2"></div>
             <div className="border-b border-gray-300 my-2">
                 <h3 className="text-lg font-semibold mb-2">Email : <span className=' font-normal text-gray-600'>{userDetails.email}</span></h3>
             </div>
             {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Social Media </h3>
          <ul className="flex space-x-4">
            {userDetails.fb && (
              <li>
                <a href={userDetails.fb} target="_blank">
                  <Image
                    src={"/Icons/fb.svg"}
                    width={40}
                    height={40}
                    alt={userDetails.fb}
                  />
                </a>
              </li>
            )}
            {userDetails.instagram && (
              <li>
                <a href={userDetails.instagram} target="_blank">
                  <Image
                    src={"/Icons/ins.svg"}
                    width={40}
                    height={40}
                    alt={userDetails.instagram}
                  />
                </a>
              </li>
            )}
            {userDetails.Twitter && (
              <li>
                <a href={userDetails.Twitter} target="_blank">
                  <Image
                    src={"/Icons/twit.svg"}
                    width={40}
                    height={40}
                    alt={userDetails.twitter}
                  />
                </a>
              </li>
            )}
            {userDetails.Linkedin && (
              <li>
                <a href={userDetails.Linkedin} target="_blank">
                  <Image
                    src={"/Icons/link.svg"}
                    width={40}
                    height={40}
                    alt={userDetails.linkedin}
                  />
                </a>
              </li>
            )}
            {userDetails.github && (
              <li>
                <a href={userDetails.github} target="_blank">
                  <Image
                    src={"/Icons/github.svg"}
                    width={40}
                    height={40}
                    alt={userDetails.github}
                  />
                </a>
              </li>
            )}
            {userDetails.Youtube && (
              <li>
                <a href={userDetails.Youtube} target="_blank">
                  <Image
                    src={"/Icons/yt.svg"}
                    width={40}
                    height={40}
                    alt={userDetails.Youtube}
                  />
                </a>
              </li>
            )}
            {userDetails.Telegram && (
              <li>
                <a href={userDetails.Telegram} target="_blank">
                  <Image
                    src={"/Icons/tele.svg"}
                    width={40}
                    height={40}
                    alt={userDetails.Telegram}
                  />
                </a>
              </li>
            )}
            {userDetails.snapchat && (
              <li>
                <a href={userDetails.snapchat} target="_blank">
                  <Image
                    src={"/Icons/snap.svg"}
                    width={40}
                    height={40}
                    alt={userDetails.snapchat}
                  />
                </a>
              </li>
            )}
          </ul>
        </div>
        {/* BIO */}
        <div className="border-b border-gray-300 my-2"></div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Bio</h3>
          <p className="text-gray-700 overflow-y-auto  md:max-h-[120px] whitespace-pre-wrap">
            {userDetails.bio}
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

export default UserDetailsPage;
