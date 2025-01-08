import React, { useEffect, useState } from "react";
import { HeartPulse, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage(props) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields");
      return;
    }
    // Here you would typically handle the login logic
    console.log("Login attempted with:", loginData.email, loginData.password);

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginData,
        {
          withCredentials: true, // Important for sending cookies
        }
      );

      const { success, message } = response.data;
      console.log(success);
      if (success) {
        console.log("Login Successfully");
        props.sendDataToApp(true);
      } else {
        console.log(message);
        setError(message);
      }
    } catch (error) {
      console.log("Login Error: ", error);
      setError(error);
      navigate("/");
    }

    setLoginData({ email: "", password: "" });
  };

  if (props.isAuthenticated) {
    navigate("/services");
  }

  return (
    <div className="min-h-full pt-8 pb-10 flex items-center justify-center sm:min-h-screen sm:p-0">
      <div className="bg-white rounded-lg shadow-xl p-4 max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <HeartPulse className="h-12 w-12 text-red-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">MediLogin</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff784b] focus:border-[#ff784b]"
                placeholder="doctor@example.com"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff784b] focus:border-[#ff784b]"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#ff784b] hover:bg-[#ff784b] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-[#ff784b] hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          {/* <a href="#" className="font-medium text-blue-600 hover:underline">
            Sign up
          </a> */}
          <Link
            to="/registration"
            className="font-medium text-[#ff784b] hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
