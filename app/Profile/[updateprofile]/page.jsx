"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
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
} from "../../../components/ui/alert-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { bgcolorOptions } from "../../data/bgcolorOptions";
import { MyContext } from "../../../app/Context/MyContext";
import UpdatePLoading from "../../Components/Loading/UpdatePLoading";
import { toast } from 'react-toastify';
import { CheckCircle } from "lucide-react";
import ParticleComponent from "../../Components/ParticleComponent";
function NameUser({ params }) {
  const {data,status}=useSession()
  const user = data?.user
  const {SERVER_URL_V,EmailUser,userDetails,setUserDetails} = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const User = userDetails.find((user)=>user._id === params.updateprofile);
  const [fullname, setFullname] = useState(User?.fullname);
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
  const [category,setCategory] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [id, setid] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (User) {
        setFullname(User.fullname);
        setEmail(User.email);
        setUsername(User.username);
        setPhoneNumber(User.phoneNumber);
        setCountry(User.country);
        setUrlimage(User.urlimage);
        setBio(User.bio);
        setFb(User.fb);
        setWhatsapp(User.whatsapp);
        setMessenger(User.messenger);
        setReddit(User.reddit);
        setTwitch(User.twitch);
        setInstagram(User.instagram);
        setTwitter(User.Twitter);
        setLinkedin(User.Linkedin);
        setGithub(User.github);
        setYoutube(User.Youtube);
        setTelegram(User.Telegram);
        setSnapchat(User.snapchat);
        setbgcolorp(User.bgcolorp);
        setSkills(User.skills);
        setServices(User.services);
        setLanguages(User.languages);
        setCategory(User.category);
        setEducation(User.education);
        setExperience(User.experience);
        setid(User._id);
    }
}, [User]);

  
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
  // // Get Detail User
  // useEffect(() => {
  //   axios
  //     .get(`${SERVER_URL_V}/users/${params.updateprofile}`,{
  //       headers: {
  //         'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
  //       }
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       setid(data._id);
  //       setFullname(data.fullname);
  //       setbgcolorp(data.bgcolorp);
  //       setCountry(data.country)
  //       setEmail(data.email);
  //       setUsername(data.username);
  //       setPhoneNumber(data.phoneNumber);
  //       setUrlimage(data.urlimage);
  //       setBio(data.bio);
  //       setCategory(data.category);
  //       setFb(data.fb);
  //       setWhatsapp(data.whatsapp);
  //       setMessenger(data.messenger);
  //       setReddit(data.reddit);
  //       setTwitch(data.twitch);
  //       setInstagram(data.instagram);
  //       setTwitter(data.Twitter);
  //       setLinkedin(data.Linkedin);
  //       setGithub(data.github);
  //       setYoutube(data.Youtube);
  //       setTelegram(data.Telegram);
  //       setSnapchat(data.snapchat);
  //       setEducation(data.education);
  //       setExperience(data.experience);
  //       setSkills(data.skills);
  //       setServices(data.services);
  //       setLanguages(data.languages)
  //     })
  //     .catch((error) => console.error("Error fetching user details:", error))
  //     .finally(() => setLoading(false));
  // }, [SERVER_URL_V,params.updateprofile]);

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
    formData.append('experience', experience);
    formData.append('category', category);
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
        `${SERVER_URL_V}/users/${params.updateprofile}`, formData
        ,{
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
          }
        });
        toast(<p className='flex gap-3 items-center'><CheckCircle /> Updated Successfully</p>, {
          autoClose: 3000,
        });
        setUserDetails((prevUsers) => 
          prevUsers.map((user) => 
            user._id === params.updateprofile 
              ? { ...user, ...response.data }
              : user 
          )
        );
        router.push("/Profile");
    } catch (error) {
      console.error("Error updating user details:", error);
      if (error.response && error.response.status === 400 && error.response.data.error === 'Username already exists') {
        setErrorMessage('Username already exists');
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

  if (!userDetails || userDetails.length === 0) {
    return <UpdatePLoading />
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
  const datamodul = [
    {name : "🔷 Profile" , state:bio , setState:setBio},
    {name : "💼 Services" , state:services , setState:setServices},
    {name : "🎓 Education" , state:education , setState:setEducation},
    {name : "⭐ Experience" , state:experience , setState:setExperience},
    {name : "💡 Skills" , state:skills , setState:setSkills},
    {name : "🌍 Languages" , state:languages , setState:setLanguages},
  ]
  
  return (
    <section>
      {User && (
        <div className={`${bgcolorp} flex items-center justify-center pt-4 pb-6 duration-300`}>
      <ParticleComponent bgcolor={bgcolorp} />
  <form onSubmit={updateProfile} className="z-10">
    <div className="mx-4  md:w-[800px] px-4 md:px-8 pb-14 bg-white p-6 rounded-lg border-2 shadow-lg">
    
    <div className="flex flex-col md:flex-row items-start justify-between mb-8 space-y-8 md:space-y-0 md:space-x-8">
  {/* Profile Image Section */}
  <div className="flex md:ml-5 flex-col items-center bg-white shadow-xl border border-gray-200 rounded-lg p-6 w-full md:w-1/3">
    <Image
      src={Imageprofil || urlimage}
      alt="Profile Image"
      className="rounded-full  w-40 h-40 object-cover mb-4 border-4 border-green-500 shadow-lg"
      width={160}
      height={160}
    />
    <label htmlFor="file-upload" className="bg-gradient-to-r  from-teal-400 to-green-500 text-white font-semibold rounded-full px-4 py-2 cursor-pointer transition duration-300 hover:bg-green-600">
      Upload Image 
    </label>
    <input 
      id="file-upload" 
      type="file" 
      name="urlimage" 
      onChange={ImageProfileUpCloudinary} 
      accept="image/*" 
      className="hidden" 
    />
  </div>

  {/* User Information Section */}
  <div className="bg-white shadow-xl border border-gray-200 rounded-lg p-6 w-full md:w-2/3 space-y-4">
    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{fullname}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Fullname:</label>
        <input
          type="text"
          name="fullname"
          required
          value={fullname}
          onChange={(e) => {
            const capitalizeWords = (str) => {
              return str
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())
                .replace(/\s+/g, ' '); 
            };
            setFullname(capitalizeWords(e.target.value));
          }}
          className="bg-gray-100 border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />


      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            const newValue = e.target.value.replace(/[/\s]/g, "").toLowerCase();
            setUsername(newValue);
          }}
          className="w-full px-4 py-2 border bg-gray-100  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your username" required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Country:</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Phone:</label>
        <input
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Category:</label>
        <input
          type="text"
          name="category"
          placeholder="Developer"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  </div>
    </div>
    {/* Modul */}
<div className="flex flex-wrap gap-2 mb-2 justify-center">
  {datamodul.map((dt) => (
    <div key={dt.name}>
      <AlertDialog>
        <AlertDialogTrigger className={`p-2 bg-slate-100 hover:bg-slate-200 hover:scale-105 duration-300 rounded-lg border-2`}>
          {dt.name}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="bg-gray-200 p-2 border rounded-md">{dt.name}</AlertDialogTitle>
            <AlertDialogDescription className="overflow-y-auto max-h-96 bg-sky-50 p-4 duration-300 rounded-sm border text-black whitespace-break-spaces text-start">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-indigo-500 mb-2">{dt.name}</h3>
                <textarea
                  name={dt.name}
                  value={dt.state}
                  onChange={(e) => dt.setState(e.target.value)}
                  placeholder={`Enter ${(dt.name).split(" ")[1]}`}
                  className="bg-gray-100 border border-gray-300 rounded-lg w-full h-32 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 duration-300">Continue</AlertDialogCancel>
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ))}
</div>

{/* Social Media Section */}
<div className="mb-3">
  <div className="flex flex-wrap gap-4 justify-center">
    {datasocial.map((item, i) => (
      <AlertDialog key={i}>
        <AlertDialogTrigger>
          <div className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-md transition duration-300">
            <Image src={item.iconSrc} width={24} height={24} alt={item.alt} />
            <span className="ml-2 text-gray-800 font-medium">{item.alt}</span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3">
              <Image src={item.iconSrc} width={30} height={30} alt={item.alt} />
              {item.alt.replace("Logo", " Link")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <input
                type="url"
                value={item.state}
                onChange={(e) => item.setState(e.target.value)}
                placeholder={item.placeholder}
                className="bg-gray-100 border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ))}
  </div>
</div>

<div className="flex items-center justify-end mr-10">
        {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className="flex items-center justify-center mb-2 gap-2  bg-gray-800 text-white px-5 py-3 rounded-lg text-[14px] "
      >
        {loading ? (
          <>
            Updating <i className="fa fa-spinner fa-spin"></i>
          </>
        ) : (
          "Save"
        )}
      </button>
      </div>
<div className="border-b border-gray-300 mb-6"></div>
{/* Background Color Selection */}
<div>
        <label htmlFor="bgcolorSelect" className="block mb-2 font-bold">
        <h3 className="text-xl font-semibold  mb-2">🏷️ Select Background Color: </h3>

        </label>
        <div className="grid grid-cols-8 gap-2 pb-2">
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
      <div className="border-b border-gray-300 my-4"></div>


{/* Profile Section */}
<div className="mb-8">
<h3 className="text-2xl font-semibold text-indigo-500 mb-2">🔷 Profile</h3>
<textarea
    name="Profile"
    value={bio}
    onChange={(e) => setBio(e.target.value)}
    placeholder="Enter Profile"
    className="bg-gray-100 border border-gray-300 rounded-lg w-full h-32 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />
</div>

{/* Services Section */}
<div className="mb-8">
<h3 className="text-2xl font-semibold text-indigo-500 mb-2">💼 Services</h3>
<textarea
    name="services"
    value={services}
    onChange={(e) => setServices(e.target.value)}
    placeholder="Enter Services"
    className="bg-gray-100 border border-gray-300 rounded-lg w-full h-32 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />
</div>

{/* Education Section */}
<div className="mb-8">
<h3 className="text-xl font-semibold text-indigo-600 mb-2">🎓 Education</h3>
 <textarea
    name="Education"
    value={education}
    onChange={(e) => setEducation(e.target.value)}
    placeholder="Enter Education"
    className="bg-gray-100 border border-gray-300 rounded-lg w-full h-32 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />
</div>
<div className="border-b border-gray-300 my-8"></div>
{/* Experience Section */}
<div className="mb-8">
<h3 className="text-xl font-semibold text-indigo-600 mb-2">⭐ Experience</h3>
 <textarea
    name="Experience"
    value={experience}
    onChange={(e) => setExperience(e.target.value)}
    placeholder="Enter Experience"
    className="bg-gray-100 border border-gray-300 rounded-lg w-full h-32 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />
</div>
{/* Skills Section */}
<div className="mb-8">
<h3 className="text-xl font-semibold text-indigo-600 mb-2">💡 Skills</h3>
  <textarea
    name="Skills"
    value={skills}
    onChange={(e) => setSkills(e.target.value)}
    placeholder="Enter Skills"
    className="bg-gray-100 border border-gray-300 rounded-lg w-full h-32 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />
</div>
      {/* Languages Section */}
      <div>
      <h3 className="text-xl font-semibold text-indigo-600 mb-2">🌍 Languages</h3>
      <textarea
          name="languages"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          placeholder="Enter Languages"
          className="rounded-lg bg-white w-full px-3 h-32 py-2 border-2"
        />
      </div>
      <div className="border-b border-gray-300 my-4"></div>
      

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className="flex items-center justify-center mb-2 gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg text-[14px] float-right"
      >
        {loading ? (
          <>
            Updating <i className="fa fa-spinner fa-spin"></i>
          </>
        ) : (
          "Save"
        )}
      </button>
      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-600 mt-4">
          <span>{errorMessage}</span>
          <input
  type="text"
  value={username}
  onChange={(e) => {
    const newValue = e.target.value.replace(/[/\s]/g, "").toLowerCase();
    setUsername(newValue);
  }}
  className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
  placeholder="Enter your username" required
/>
        </div>
      )}
    </div>
  </form>
</div>
      )}
    </section>
    

  );
}

export default NameUser;
