"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { MyContext } from "../Context/MyContext";
import LoadChatPage from "../Components/Loading/LoadChatPage/LoadChatPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateProfile = () => {
  const { data, status } = useSession();
  const EmailUser = data?.user?.email;
  const fullName = data?.user?.name;
  const UrlImage = data?.user?.image;
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { SERVER_URL_V,userDetails} = useContext(MyContext);
  const filt = userDetails.find((fl) => fl.email === EmailUser);

  // if (status === "authenticated" && filt) {
  //   router.push("/Home")
  // }

  const postData = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true);
      const data = {
        fullname: fullName || "",
        email: EmailUser || "",
        urlimage: UrlImage || "",
        username: username,
        phoneNumber: "",
        country: "",
        bio: "",
        fb: "",
        whatsapp: "",
        messenger: "",
        reddit: "",
        twitch: "",
        isOnline: false,
        instagram: "",
        snapchat: "",
        Linkedin: "",
        category: "",
        github: "",
        Twitter: "",
        Youtube: "",
        Telegram: "",
        bgcolorp: "",
        education: "",
        experience: "",
        skills: "",
        languages: "",
        services: "",
        aboni: false,
        blocked: false,
      };
      const response = await axios.post(`${SERVER_URL_V}/users`, data,{
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` 
        }
      });
      console.log("Response:", response.data);
      setSuccessMessage("Your profile has been created!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error posting user data:", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Username already exists"
      ) {
        setErrorMessage("Username already exists");
      } else {
        setErrorMessage(
          "An error occurred while creating your profile. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!data || !EmailUser || !fullName || !UrlImage) {
    return <LoadChatPage />;
  }

  return (
    <form onSubmit={postData}>
      <div className="flex md:items-start items-start justify-center md:h-[580px] h-screen bg-slate-800 p-6">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg transform transition duration-500 hover:scale-105">
          <div className="flex items-center justify-around mb-6">
            {UrlImage? (
              <Image
                width={100}
                height={100}
                src={UrlImage}
                className="rounded-full w-28 h-28 object-cover border-4 border-purple-500 shadow-lg"
                alt="User profile"
              />
            ) : (
              <div className="rounded-full bg-gray-500 animate-pulse w-28 h-28 object-cover border-4 border-purple-500 shadow-lg"></div>
            )}
          </div>
          <div className="space-y-6">
            {successMessage && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {successMessage}</span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setSuccessMessage("")}
                >
                  <svg
                    className="fill-current h-6 w-6 text-green-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path
                      fillRule="evenodd"
                      d="M14.348 5.652a.5.5 0 0 1 0 .707l-8.485 8.485a.5.5 0 0 1-.707-.707l8.485-8.485a.5.5 0 0 1 .707 0z"
                    />
                  </svg>
                </span>
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                required
                onChange={(e) => {
                  const newValue = e.target.value
                    .replace(/[/\s]/g, "")
                    .toLowerCase();
                  setUsername(newValue);
                }}
                className="w-full p-3 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 px-4 bg-purple-500 text-white font-bold rounded-lg shadow-md transition duration-300 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  Creating <i className="fa fa-spinner fa-spin"></i>
                </>
              ) : (
                <>Submit</>
              )}
            </button>
            {errorMessage && (
              <p style={{ color: "red" }}>{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProfile;
