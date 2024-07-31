"use client";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Link, MailCheck, MessageCircleMore, Phone, Pin, QrCode } from "lucide-react";
import { toast } from "sonner";
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
import QRCode from "qrcode.react";
import download from "downloadjs";
import { useUser } from "@clerk/nextjs";
import { MyContext } from "../Context/MyContext";

function UserDetailsPage({params}) {
  const path = usePathname();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const {CLIENT_URL,SERVER_URL} = useContext(MyContext);
  
  const CopyLinkProfil = () => {
    const urlToCopy = `${CLIENT_URL}/${userDetails.username}`;
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setCopied(true);
      toast("Copied successfully");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/user/${params.username}`);
        if (!response.data) {
          throw new Error("User not found");
        }
        setUserDetails(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
      fetchUserDetails();
  }, [SERVER_URL,params.username]);

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
              The link entered by the user does not work
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
    download(qrCodeDataURL, `${userDetails.username}-QrCode-Profile.png`, "image/png");
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

  const ShareLink = () => {
    const url = `${CLIENT_URL}/${userDetails.username}`;

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

  if (!userDetails) {
    return (
      <p className="flex justify-center h-screen items-start py-32 text-8xl">
        <i className="fa fa-spinner fa-spin "></i>
      </p>
    );
  }
  const datasocial = [
    { id: 1, icon: '/Icons/wts.svg', alt: 'WhatsApp', link: userDetails.whatsapp },
    { id: 8, icon: '/Icons/link.svg', alt: 'LinkedIn', link: userDetails.Linkedin },
    { id: 9, icon: '/Icons/github.svg', alt: 'GitHub', link: userDetails.github },
    { id: 11, icon: '/Icons/tele.svg', alt: 'Telegram', link: userDetails.Telegram },
    { id: 2, icon: '/Icons/messenger.svg', alt: 'Messenger', link: userDetails.messenger },
    { id: 6, icon: '/Icons/ins.svg', alt: 'Instagram', link: userDetails.instagram },
    { id: 7, icon: '/Icons/twit.svg', alt: 'Twitter', link: userDetails.Twitter },
    { id: 10, icon: '/Icons/yt.svg', alt: 'YouTube', link: userDetails.Youtube },
    { id: 3, icon: '/Icons/reddit.svg', alt: 'Reddit', link: userDetails.reddit },
    { id: 4, icon: '/Icons/twitch.svg', alt: 'Twitch', link: userDetails.twitch },
    { id: 5, icon: '/Icons/fb.svg', alt: 'Facebook', link: userDetails.fb },
    { id: 12, icon: '/Icons/snap.svg', alt: 'Snapchat', link: userDetails.snapchat },
  ];
  

  const boldNumbers = (text) => {
    if (!text) {
      return [];
    }
    const parts = text.split(/(\d+|:)/);
    return parts.map((part, index) =>
      /\d+|:/.test(part) ? <span key={index} className="text-black font-bold">{part}</span> : part
    );
  };
  return (
    <div className={` flex items-center justify-center md:h-auto  pt-4 pb-96 ${userDetails.bgcolorp}`}>
      <div className="w-[640px] mx-4 relative  bg-slate-50 px-5 py-3 rounded-lg border-2 shadow-lg">

          <div className="flex md:flex-row md:w-auto md:mt-4 w-full flex-col items-center mb-2">
            <div className="mr-2 duration-500 md:mr-4">
            <div className="w-24 mb-2 h-24 rounded-full overflow-hidden">
              <Image
                width={96}  // 24 * 4
                height={96} // 24 * 4
                src={userDetails.urlimage}
                alt="Profile Image"
                className="object-cover"
              />
            </div>  
            </div>
            <div>
              <h2 className=" font-bold text-2xl md:text-start   text-center ">{userDetails.fullname}</h2>
              <p className="text-gray-600 flex gap-1"><span className="text-green-500"><MailCheck width={15} /></span> {userDetails.email}</p>
              <p className="text-gray-600"><span className="text-green-700">@</span> {userDetails.username}</p>
              <p className="text-gray-600 flex gap-1"><Pin width={15}   className={`${userDetails.country ? "text-red-700" : " md:block hidden md:text-white"}`} />{userDetails.country}</p>
              <p className="text-gray-600 flex gap-1"><Phone width={15} className={`${userDetails.phoneNumber ? "text-blue-700" : "md:block hidden md:text-white"}`}  />{userDetails.phoneNumber}</p>
            </div>
          </div>
        {/* CopyLinkProfil */}
        <button className="rounded-full absolute right-2 top-0 m-4 hover:scale-110 flex justify-center hover:bg-gray-200 border h-10 w-10 p-2  duration-300"
          onClick={CopyLinkProfil}
          title="Copy link"
        >
          {copied ? <p className="text-[14px]">Copied!</p> : <Link />} <br />
        </button>
        {/* Modal Qr and Link */}
        <span className="flex gap-2 cursor-pointer hover:text-red-700 hover:scale-110 duration-200 absolute right-8 top-[64px] ">
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
                        value={`${CLIENT_URL}/${userDetails.username}`}
                      />
                    </div>
                    <div className="flex flex-row gap-3">
                      <button
                        className="p-2 bg-blue-300 rounded-md my-2 text-black font-medium"
                        onClick={DownloadQRCode}
                      >
                        Download QrCode
                      </button>
                      <button
                        className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                        onClick={ShareQRCode}
                      >
                        Share Qrcode
                      </button>
                      <button
                        className="p-2 bg-green-300 rounded-md my-2 text-black font-medium"
                        onClick={ShareLink}
                      >
                        Share Link
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
        {/* messageTo */}
        <button className="flex gap-2 cursor-pointer hover:text-blue-500 hover:scale-110 duration-200 absolute right-8 top-[103px] "
           onClick={() => {router.push(`/message/to/${path}`);}}><MessageCircleMore />
        </button>
        {/* category */}
        <p className="text-base font-semibold text-center text-gray-800 bg-gray-100 p-2 my-2 rounded border border-gray-300">
                 {userDetails.category}
               </p>
        {/* Email */}
        {/* <div className="border-b border-gray-300 my-2">
        <div className="border-b border-gray-300 my-2"></div>
          <h3 className="text-lg font-semibold mb-2">
            Email :{" "}
            <a
              href={`mailto:${userDetails.email}`}
              className=" font-normal text-gray-600 cursor-grabbing"
            >
              {userDetails.email}{""}
            </a>
          </h3>
        </div> */}
        {/* Profile */}
        <div>
          <h3 className={`${userDetails.bio ? "" : "hidden"} text-lg font-semibold pt-1 mb-2`}>Profile</h3>
          <p className="text-gray-700  whitespace-pre-wrap">
            {userDetails.bio}
          </p>
        </div>
        {/* Services */}
        <div className={`${userDetails.services === "" && "hidden"}`}>
                <div className="border-b border-gray-300 my-2"></div>
                <h3 className="text-lg font-semibold mb-2">Services</h3>
                <p className="text-gray-700 overflow-y-auto md:max-h-[120px] whitespace-pre-wrap">
                  {userDetails.services}
                </p>
              </div>
        {/* Social Media */}
        <div className="mb-4">
        <div className="border-b border-gray-300 my-2"></div>
          <h3 className="text-lg hidden font-semibold">Social Media:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 duration-500  gap-2">
            {datasocial.filter((social) => social.link)
              .map((social,i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-md transition duration-300"
                >
                  <Image src={social.icon} alt={social.alt} width={25} height={25} />
                  <span>{social.alt}</span>
                </a>
              ))}
          </div>
        </div>
        {/* Education */}
        <div className={`${userDetails.education === "" && "hidden"}`}>
        <div className="border-b border-gray-300 my-2"></div>
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          {/* overflow-y-auto md:max-h-[120px] */}
          <p className="text-gray-700  whitespace-pre-wrap">
            {boldNumbers(userDetails.education)}
          </p>
        </div>
        {/* skills */}
        <div className={`${userDetails.skills === "" && "hidden"}`}>
        <div className="border-b border-gray-300 my-2"></div>
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <p className="text-gray-700  whitespace-pre-wrap">
            {userDetails.skills}
          </p>
        </div>
        <div className={`${userDetails.languages === "" && "hidden"}`}>
        <div className="border-b border-gray-300 my-2"></div>
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                <p className="text-gray-700 overflow-y-auto md:max-h-[120px] whitespace-pre-wrap">
                  {userDetails.languages}
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
