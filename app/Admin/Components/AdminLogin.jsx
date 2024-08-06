"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "@/app/Context/MyContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [Loading, setLoading] = useState(false);
  const { userDetails,EmailUser,SERVER_URL_V } = useContext(MyContext);

  const LOGIN = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL_V}/login`, {
        email,
        password,
      });

      setSuccess("Login successful");
      window.location.reload();
      setError("");
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setSuccess("");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = userDetails.find((user) => user.email === EmailUser);
    if (user && user.email === "abdellahedaoudi80@gmail.com") {
      setEmail(user.email);
    }
  }, [userDetails, EmailUser]);

  return (
    <div className="flex justify-center items-start py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={LOGIN} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 bg-white text-black py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white text-black border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            {Loading ? (
              <>
                Login <i className="fa fa-spinner fa-spin "></i>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
