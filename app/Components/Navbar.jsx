"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

function Navbar() {
  const { user } = useUser();
  const [setting, setSetting] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState([]);
  const CLIENT_URL = "http://localhost:3000";
  const SERVER_URL = "http://localhost:9999";



  useEffect(() => {
    axios.get(`${SERVER_URL}/users`)
      .then((res) => {
        setUserDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <div>
      <nav className=" border-b border-b-black bg-white shadow-lg">
        <section className="container mx-auto py-3">
          <div className="flex justify-between items-center text-white">
            <Image
              className="cursor-pointer hover:scale-105 duration-300"
              onClick={() => {
                router.push("/");
                setSetting(true);
              }}
              src={"/Logo.png"}
              alt="Logo"
              width={160}
              height={15}
            />
            <SignedIn>
              {user ? (
                userDetails
                  .filter((fl) => fl.fullname === user?.fullName)
                  .map((userr, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <UserButton />
                      <span
                        onClick={() => {
                          router.push(`/${userr.username}`);
                        }}
                        className="font-medium hidden  md:block text-black cursor-pointer hover:scale-105 transition duration-300"
                      >
                        {userr.fullname}
                      </span>
                      <span
                        onClick={() => {
                          setSetting(!setting);
                        }}
                        className="text-gray-800 hover:scale-105 duration-300 cursor-pointer"
                      >
                        <Settings />
                      </span>
                    </div>
                  ))
              ) : (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              )}
            </SignedIn>
            <SignedOut>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[90px] md:w-[250px]" />
                  <Skeleton className="h-4 w-[90px] md:w-[200px]" />
                </div>
              ) : (
                <SignInButton className="bg-green-400 text-black py-2 px-3 hover:bg-green-500 hover:scale-105 transition duration-300 rounded-md" />
              )}
            </SignedOut>
          </div>
        </section>
      </nav>
      {/* SETTING */}
      <nav
  onClick={() => {
    setSetting(!setting);
  }}
  className={`overflow-hidden transition-all duration-500 text-white bg-gray-800 rounded-md w-60 right-2 container absolute flex flex-col  ${
    setting ? " max-h-0" : "max-h-60 p-4"
  }`}
>
  <Link
    href={"/Profile"}
    onClick={() => {
      setSetting(!setting);
    }}
    className="bg-gray-700 py-2 border-b border-gray-600 hover:bg-gray-600 transition duration-300 rounded-sm hover:scale-105 text-center mb-2"
  >
    Profile Details
  </Link>
  <SignOutButton  className="bg-red-500 py-2 border-b border-gray-600 hover:bg-red-600 transition duration-300 rounded-sm hover:scale-105 justify-center flex gap-2" />
      </nav>


    </div>
  );
}

export default Navbar;
