import React, { useEffect, useState } from "react";
import { Menu, X, HeartPulse, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // console.log(props);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = async (route) => {
    if (route === "/login") {
      navigate("/login");
    }
    switch (route) {
      case "/logout":
        props.sendDataToApp(false);
        break;
      case "/services":
        props.isAuthenticated ? navigate("/services") : navigate("/login");
        break;
      case "/home":
        navigate("/");
        break;
      case "/contact":
        navigate("/contact");
        break;
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => handleClick("/home")}
            >
              <HeartPulse className="h-8 w-8 text-[#ff784b]" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                MediCare
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <p
                onClick={() => handleClick("/home")}
                className="border-[#ff784b] text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
              >
                Home
              </p>
              <p
                onClick={() => handleClick("/services")}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
              >
                Services
              </p>
              <p
                onClick={() => handleClick("/contact")}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer"
              >
                Contact
              </p>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {props.isAuthenticated == true ? (
              <button
                onClick={() => handleClick("/logout")}
                className="bg-[#ff784b] hover:bg-[#ff784b] text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => handleClick("/login")}
                className="bg-[#ff784b] hover:bg-[#ff784b] text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Log In
              </button>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff784b]"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <p
              onClick={() => handleClick("/home")}
              className="bg-blue-50 border-[#ff784b] text-[#ff784b] block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer"
            >
              Home
            </p>
            <p
              onClick={() => handleClick("/services")}
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium cursor-pointer"
            >
              Services
            </p>
            <p
              onClick={() => handleClick("/contact")}
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Contact
            </p>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="mt-3 space-y-1">
              <button
                onClick={() => handleClick("/login")}
                className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
