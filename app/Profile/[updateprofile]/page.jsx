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
import { useToast } from "@/components/ui/use-toast";
import { bgcolorOptions } from "@/app/data/bgcolorOptions";
function NameUser({ params }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true); // Initialize loading state
  const router = useRouter();
  const { toast } = useToast();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [urlimage, setUrlimage] = useState("");
  const [Imageprofil, setImageprofil] = useState(null);
  const [bio, setBio] = useState("");
  const [fb, setFb] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [messenger, setMessenger] = useState("");
  const [reddit, setReddit] = useState("");
  const [twitch, setTwitch] = useState("");
  const [instagram, setInstagram] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [Linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [Youtube, setYoutube] = useState("");
  const [Telegram, setTelegram] = useState("");
  const [snapchat, setSnapchat] = useState("");
  const [bgcolorp, setbgcolorp] = useState("");
  const [skills, setSkills] = useState("");
  const [services, setServices] = useState("");
  const [languages,setLanguages] = useState("");
  const [education, setEducation] = useState("");
  const [id, setid] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const EmailUser = user?.emailAddresses[0]?.emailAddress ;
  const SERVER_URL = "http://localhost:9999";
  const datasocial = [
    { iconSrc: "/Icons/wts.svg", alt: "WhatsApp", state: whatsapp, setState: setWhatsapp, placeholder: "WhatsApp Link" },
    { iconSrc: "/Icons/link.svg", alt: "LinkedIn", state: Linkedin, setState: setLinkedin, placeholder: "LinkedIn Link" },
    { iconSrc: "/Icons/github.svg", alt: "GitHub", state: github, setState: setGithub, placeholder: "GitHub Link" },
    { iconSrc: "/Icons/tele.svg", alt: "Telegram", state: Telegram, setState: setTelegram, placeholder: "Telegram Link" },
    { iconSrc: "/Icons/messenger.svg", alt: "Messenger", state: messenger, setState: setMessenger, placeholder: "Messenger Link" },
    { iconSrc: "/Icons/twit.svg", alt: "Twitter", state: Twitter, setState: setTwitter, placeholder: "Twitter Link" },
    { iconSrc: "/Icons/fb.svg", alt: "Facebook", state: fb, setState: setFb, placeholder: "Facebook Link" },
    { iconSrc: "/Icons/reddit.svg", alt: "Reddit", state: reddit, setState: setReddit, placeholder: "Reddit Link" },
    { iconSrc: "/Icons/twitch.svg", alt: "Twitch", state: twitch, setState: setTwitch, placeholder: "Twitch Link" },
    { iconSrc: "/Icons/ins.svg", alt: "Instagram", state: instagram, setState: setInstagram, placeholder: "Instagram Link" },
    { iconSrc: "/Icons/yt.svg", alt: "YouTube", state: Youtube, setState: setYoutube, placeholder: "YouTube Link" },
    { iconSrc: "/Icons/snap.svg", alt: "Snapchat", state: snapchat, setState: setSnapchat, placeholder: "Snapchat Link" }
  ];
  // Get Detail User
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/users/${params.updateprofile}`)
      .then((res) => {
        const data = res.data;
        setid(data._id);
        setFullname(data.fullname);
        setbgcolorp(data.bgcolorp);
        setCountry(data.country)
        setEmail(data.email);
        setUsername(data.username);
        setPhoneNumber(data.phoneNumber);
        setUrlimage(data.urlimage);
        setBio(data.bio);
        setFb(data.fb);
        setWhatsapp(data.whatsapp);
        setMessenger(data.messenger);
        setReddit(data.reddit);
        setTwitch(data.twitch);
        setInstagram(data.instagram);
        setTwitter(data.Twitter);
        setLinkedin(data.Linkedin);
        setGithub(data.github);
        setYoutube(data.Youtube);
        setTelegram(data.Telegram);
        setSnapchat(data.snapchat);
        setEducation(data.education);
        setSkills(data.skills);
        setServices(data.services);
        setLanguages(data.languages)
      })
      .catch((error) => console.error("Error fetching user details:", error))
      .finally(() => setLoading(false));
  }, [params.updateprofile]);

  
  const updateProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Create FormData for sending mixed data types (including file)
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('bgcolorp', bgcolorp);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('phoneNumber', phoneNumber);
    formData.append('country', country);
    formData.append('bio', bio);
    formData.append('fb', fb);
    formData.append('whatsapp', whatsapp);
    formData.append('messenger', messenger);
    formData.append('reddit', reddit);
    formData.append('twitch', twitch);
    formData.append('instagram', instagram);
    formData.append('snapchat', snapchat);
    formData.append('Linkedin', Linkedin);
    formData.append('github', github);
    formData.append('Twitter', Twitter);
    formData.append('Youtube', Youtube);
    formData.append('Telegram', Telegram);
    formData.append('skills', skills);
    formData.append('education', education);
    formData.append('languages', languages);
    formData.append('services', services);
    formData.append('aboni', false);
  
    if (Imageprofil) {
      const imageData = await fetch(Imageprofil);
      const imageBlob = await imageData.blob();
      formData.append('urlimage', new File([imageBlob], 'profile_image'));
    } else {
      formData.append('urlimage', urlimage);
    }
    try {
      const response = await axios.put(
        `${SERVER_URL}/users/${params.updateprofile}`, formData
      );
      toast({
        description: "Profile updated successfully.",
      });
      router.push("/Profile");
      console.log("User details updated successfully", response.data);
    } catch (error) {
      console.error("Error updating user details:", error);
      if (error.response && error.response.status === 400 && error.response.data.error === 'Username already exists') {
        setErrorMessage('Username already exists');
      } else {
        setErrorMessage('An error occurred while updating your profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const ImageProfileUpCloudinary = (e) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageprofil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  if (!user) {
    return <p className="flex justify-center items-start h-screen duration-500  md:h-[515px] py-20 text-8xl">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
  }
  if (!email || !EmailUser) {
    return <p className="flex justify-center items-start h-screen duration-500  md:h-[515px] py-20 text-8xl">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
  }
  if (email !== EmailUser) {
    return (<div className="flex justify-center items-start py-4 h-screen">
      <Image width={600} height={600}
        src="/prfl.png"
        alt="prfl.png"
        className="  rounded-md object-cover"
      />
    </div>); 
  }
  
  return (
    <div className={`${bgcolorp} flex items-center justify-center pt-4 pb-6 duration-300 `}>
        <form onSubmit={updateProfile}>
          <div className=" mx-4 md:w-[640px] pb-14 bg-white p-6 rounded-lg border-2 shadow-lg">
            <div className="md:flex md:flex-row  duration-500 items-start md:justify-between mb-4 flex flex-col ">
            <div className="md:mr-4 relative md:flex md:flex-col  flex flex-col items-center w-full mb-1 justify-center duration-300">
            <Image
              src={Imageprofil ? Imageprofil : urlimage}
              alt="Profile Image"
              className="rounded-full  md:mb-0 duration-300 mb-1 w-36 object-cover"
              width={100} height={100}
            />
            {/*  file input */}
             <label htmlFor="file-upload" className=" border text-center rounded-full mt-1 mb-2 border-gray-300 inline-block px-4 py-2 cursor-pointer">
                 Upload Image 
             </label>
             <input id="file-upload" type="file"
              name="urlimage"
              onChange={ImageProfileUpCloudinary}
              accept="image/*"  className="hidden" />

          </div>
         
              <div>
                <h2 className=" md:block hidden text-xl font-bold md:text-start text-center duration-300 mb-2">
                  {fullname}
                </h2>
                <table>
                  <tr>
                    <td>UserName:</td>
                    <td>
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-gray-600 bg-white rounded-lg border-2  mb-2 px-3 py-1"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Country :</td>
                    <td>
                      <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="text-gray-600 bg-white rounded-lg border-2  px-3 py-1"
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
                        className="text-gray-600 bg-white rounded-lg border-2  px-3 py-1"
                      />
                    </td>
                  </tr>
                  
                </table>
              </div>
            </div>
            <div className="border-b border-gray-300 my-2"></div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Profile</h3>
              <textarea
                name="Profile"
                value={bio}
                onChange={(e) => {setBio(e.target.value);}}
                placeholder="Enter Profile"
                className="rounded-lg bg-white  w-full px-3 h-32  py-2"
              />
            </div>
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Services</h3>
              <textarea
                name="services"
                value={services}
                onChange={(e)=>{setServices(e.target.value);}}
                placeholder="Enter Services"
                className="rounded-lg bg-white  w-full px-3 h-32  py-2"
              />
            </div>
            <div className="border-b border-gray-300 my-2"></div>
            <div>
              <h3 className="text-lg font-semibold mb-2 hidden">Social Media</h3>
              <div className="grid grid-cols-2  md:grid-cols-3 gap-2">
                {datasocial.map((item, i) => (
                  <AlertDialog key={i}>
                    <AlertDialogTrigger>
                      <div        
                      className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-md transition duration-300"                      >
                      <Image
                        src={item.iconSrc}
                        width={25}
                        height={25}
                        alt={item.alt}
                      />
                       <span>{item.alt}</span>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-3">
                          <Image
                            src={item.iconSrc}
                            width={40}
                            height={40}
                            alt={item.alt}
                          />
                          {item.alt.replace("Logo", " Link")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <input
                            type="text"
                            value={item.state}
                            onChange={(e) => item.setState(e.target.value)}
                            placeholder={item.placeholder}
                            className="rounded-lg bg-white text-black px-3 py-2 mb-2 w-full border-2 border-black"
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ))}
              </div>
            </div>
        
            {/* Education */}
            <div className="border-b border-gray-300 my-2"></div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <textarea
                name="Education"
                value={education}
                onChange={(e) => {setEducation(e.target.value);}}
                placeholder="Enter Education"
                className="rounded-lg bg-white w-full px-3 h-32  py-2"
              />
            </div>
            {/* Skills */}
            <div className="border-b border-gray-300 my-2"></div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <textarea
                name="Skills"
                value={skills}
                onChange={(e) => {setSkills(e.target.value);}}
                placeholder="Enter Skills"
                className="rounded-lg bg-white w-full px-3 h-32  py-2"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Languages</h3>
              <textarea
                name="languages"
                value={languages}
                onChange={(e) => {setLanguages(e.target.value);}}
                placeholder="Enter Languages"
                className="rounded-lg bg-white  w-full px-3 h-32  py-2"
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
                    className={`p-4 rounded-md shadow-md cursor-pointer ${bg} ${
                      bg === bgcolorp ? "border-2 border-blue-500" : ""
                    }`}
                    onClick={() => setbgcolorp(bg)}
                  ></div>
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
          {errorMessage && 
          <div>
            <span  style={{ color: 'red' }}>{errorMessage}</span>
            <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-gray-600 bg-white rounded-lg border-2  mb-2 px-3 py-1"
                      />
            </div>}
          </div>
        </form>
    </div>
  );
}

export default NameUser;
