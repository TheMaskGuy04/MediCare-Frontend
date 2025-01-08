import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Calendar,
  Stethoscope,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (props.isAuthenticated == true) {
      navigate("/services");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <main>
        {/* Hero Section */}
        <section className="bg-[#ff784b] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Your Health, Our Priority
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
                Providing compassionate care and cutting-edge medical services
                to our community.
              </p>
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => handleClick("/services")}
                  className="bg-white text-[#ff784b] hover:bg-blue-50 px-6 py-3 rounded-md text-lg font-medium"
                >
                  Book an Appointment
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#ff784b] font-semibold tracking-wide uppercase">
                Our Services
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#ff784b] sm:text-4xl">
                Comprehensive Healthcare Solutions
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ff784b] text-white">
                      <Calendar className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Easy Scheduling
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Book appointments online or through our website for your
                      convenience.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ff784b] text-white">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Expert Care
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Our team of experienced doctors provides top-notch medical
                      care.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ff784b] text-white">
                      <Phone className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      24/7 Support
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Our helpline is always open to address your health
                      concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#ff784b]">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-white">
                Book your appointment today.
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <p
                  onClick={() => handleClick("/services")}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#ff784b] bg-white hover:bg-blue-50 cursor-pointer"
                >
                  Get started
                  <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
