"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { bgcolorOptions } from "@/app/data/data";
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
function NameUser({ params }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true); // Initialize loading state
  const router = useRouter();
  const { toast } = useToast()
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [urlimage, setUrlimage] = useState("");
  const [bio, setBio] = useState("");
  const [fb, setFb] = useState("");
  const [instagram, setInstagram] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [Linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [Youtube, setYoutube] = useState("");
  const [Telegram, setTelegram] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [bgcolorp, setbgcolorp] = useState("");
  const [id, setid] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9999/users/${params.updateprofile}`)
      .then((res) => {
        const data = res.data;
        setid(data._id);
        setFullname(data.fullname);
        setbgcolorp(data.bgcolorp);
        setEmail(data.email);
        setUsername(data.username);
        setPhoneNumber(data.phoneNumber);
        setUrlimage(data.urlimage);
        setBio(data.bio);
        setFb(data.fb);
        setInstagram(data.instagram);
        setTwitter(data.Twitter);
        setLinkedin(data.Linkedin);
        setGithub(data.github);
        setYoutube(data.Youtube);
        setTelegram(data.Telegram);
        setSnapchat(data.snapchat);
      })
      .catch((error) => console.error("Error fetching user details:", error))
      .finally(() => setLoading(false)); 
  }, [params.updateprofile]);

  const updateProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const userDetails = {
      fullname,
      bgcolorp,
      email,
      username,
      phoneNumber,
      urlimage,
      bio,
      fb,
      instagram,
      snapchat,
      Linkedin,
      github,
      Twitter,
      Youtube,
      Telegram,
    };
    try {
      await axios.put(`http://localhost:9999/users/${params.updateprofile}`, userDetails);
      toast({
        description: "updated successfully.",
      })
      router.push("/Profile");
      console.log("User details updated successfully");
    } catch (error) {
      console.error("Error updating user details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return <p className="flex justify-center items-center py-32 text-8xl">
    <i className="fa fa-spinner fa-spin "></i>
    </p>;
  }
  
  return (
    <div className={`${bgcolorp} container mx-auto py-3 duration-300 `}>
      {email === user?.emailAddresses[0]?.emailAddress ?
      (<form onSubmit={updateProfile}>
        <div className="max-w-lg pb-14 mx-auto bg-white p-6 rounded-lg border-2 shadow-lg">
          <div className="md:flex md:flex-row  duration-500 items-center md:justify-between mb-4 flex flex-col ">
            <div className="md:mr-4">
              <img
                src={urlimage}
                alt="Profile Image"
                className="rounded-full md:mb-0 duration-300 mb-4 w-36 object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold md:text-start text-center duration-300 mb-2">{fullname}</h2>
              <table>
                <tr>
                  <td>UserName:</td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="text-gray-600 rounded-lg border-2  mb-2 px-3 py-1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Phone :</td>
                  <td>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="text-gray-600 rounded-lg border-2  px-3 py-1"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="border-b border-gray-300 my-4"></div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Social Media</h3>
            <div className="flex justify-center space-x-2">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Image
                    src="/Icons/fb.svg"
                    width={40}
                    height={40}
                    alt="Facebook Logo"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <Image
                        src="/Icons/fb.svg"
                        width={40}
                        height={40}
                        alt="Facebook Logo"
                      />
                      Facebook Link
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <input
                        type="text"
                        value={fb}
                        onChange={(e) => setFb(e.target.value)}
                        placeholder="Facebook Link"
                        className="rounded-lg px-3 py-2 mb-2 w-full border-2 border-black"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
  
              <AlertDialog>
                <AlertDialogTrigger>
                  <Image
                    src="/Icons/ins.svg"
                    width={40}
                    height={40}
                    alt="Instagram Logo"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <Image
                        src="/Icons/ins.svg"
                        width={40}
                        height={40}
                        alt="Instagram Logo"
                      />
                      Instagram Link
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="Instagram Link"
                        className="rounded-lg px-3 py-2 mb-2 w-full border-2 border-black"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
  
              <AlertDialog>
                <AlertDialogTrigger>
                  <Image
                    src="/Icons/twit.svg"
                    width={40}
                    height={40}
                    alt="Twitter Logo"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <Image
                        src="/Icons/twit.svg"
                        width={40}
                        height={40}
                        alt="Twitter Logo"
                      />
                      Twitter Link
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <input
                        type="text"
                        value={Twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="Twitter Link"
                        className="rounded-lg px-3 py-2 mb-2 w-full border-2 border-black"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
  
              <AlertDialog>
                <AlertDialogTrigger>
                  <Image
                    src="/Icons/link.svg"
                    width={40}
                    height={40}
                    alt="LinkedIn Logo"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <Image
                        src="/Icons/link.svg"
                        width={40}
                        height={40}
                        alt="LinkedIn Logo"
                      />
                      LinkedIn Link
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <input
                        type="text"
                        value={Linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="LinkedIn Link"
                        className="rounded-lg px-3 py-2 mb-2 w-full border-2 border-black"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
  
              <AlertDialog>
                <AlertDialogTrigger>
                  <Image
                    src="/Icons/github.svg"
                    width={40}
                    height={40}
                    alt="GitHub Logo"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <Image
                        src="/Icons/github.svg"
                        width={40}
                        height={40}
                        alt="GitHub Logo"
                      />
                      GitHub Link
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="GitHub Link"
                        className="rounded-lg px-3 py-2 mb-2 w-full border-2 border-black"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
  
              <AlertDialog>
                <AlertDialogTrigger>
                  <Image
                    src="/Icons/yt.svg"
                    width={40}
                    height={40}
                    alt="YouTube Logo"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <Image
                        src="/Icons/yt.svg"
                        width={40}
                        height={40}
                        alt="YouTube Logo"
                      />
                      YouTube Link
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <input
                        type="text"
                        value={Youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                        placeholder="YouTube Link"
                        className="rounded-lg px-3 py-2 mb-2 w-full border-2 border-black"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
  
              <AlertDialog>
                <AlertDialogTrigger>
                  <Image
                    src="/Icons/tele.svg"
                    width={40}
                    height={40}
                    alt="Telegram Logo"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <Image
                        src="/Icons/tele.svg"
                        width={40}
                        height={40}
                        alt="Telegram Logo"
                      />
                      Telegram Link
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <input
                        type="text"
                        value={Telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        placeholder="Telegram Link"
                        className="rounded-lg px-3 py-2 mb-2 w-full border-2 border-black"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
  
              <AlertDialog>
                <AlertDialogTrigger>
                  <Image
                    src="/Icons/snap.svg"
                    width={40}
                    height={40}
                    alt="Snapchat Logo"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-3">
                      <Image
                        src="/Icons/snap.svg"
                        width={40}
                        height={40}
                        alt="Snapchat Logo"
                      />
                      Snapchat Link
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <input
                        type="text"
                        value={snapchat}
                        onChange={(e) => setSnapchat(e.target.value)}
                        placeholder="Snapchat Link"
                        className="rounded-lg px-3 py-2 mb-2 w-full border-2 border-black"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="border-b border-gray-300 my-2"></div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Bio</h3>
            <textarea
              name="bio"
              value={bio}
              onChange={(e) => {
                const words = e.target.value
                  .split(/\s+/)
                  .filter((word) => word.length > 0);
                if (words.length <= 200) {
                  setBio(e.target.value);
                }
              }}
              placeholder="Enter bio"
              className="rounded-lg w-full px-3 h-32  py-2"
            />
          </div>
          <div>
        <div className="border-b border-gray-300 my-2"></div>
        <label htmlFor="bgcolorSelect" className="block mb-2 font-bold">
          Select Background Color:
        </label>
        <div className="grid  grid-cols-8 gap-2 pb-2">
        {bgcolorOptions.map((bg, index) => (
              <div
                key={index}
                className={`p-4 rounded-md shadow-md cursor-pointer ${bg} ${bg === bgcolorp ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setbgcolorp(bg)}
              >
        </div>
      ))}
        </div>
        </div>
          <button
            disabled={loading}
            type="submit"
            className=" gap-2 bg-gray-800 text-white px-5 py-3 float-end rounded-lg text-[14px]"
          >
            {loading ? (
              <>
                Updating <i className="fa fa-spinner fa-spin"></i>
              </>
            ) : (
              <>Update</>
            )}
          </button>
        </div>
      </form>) : (
        // <p className="flex justify-center items-center py-32 text-8xl">
        // <i className="fa fa-spinner fa-spin "></i>
        // </p>
        <div className="flex justify-center items-center h-[490px]">
        <img src='/prfl.png' alt="prfl.png" className=" h-96 rounded-md object-cover" />
        </div>
      )}
    </div>
  );
}

export default NameUser;
