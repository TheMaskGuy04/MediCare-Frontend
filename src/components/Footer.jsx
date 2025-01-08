import React from "react";
import { HeartPulse } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <HeartPulse className="h-8 w-8 text-[#ff784b]" />
              <span className="ml-2 text-xl font-bold text-white">
                MediCare
              </span>
            </div>
            {/* <p className="text-gray-400 text-base">
                Providing quality healthcare services to our community since
                1990.
              </p> */}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Mental Health
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Physical Health
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Women's Health
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-300 hover:text-white"
                    >
                      Patient Portal
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2024 MediCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
