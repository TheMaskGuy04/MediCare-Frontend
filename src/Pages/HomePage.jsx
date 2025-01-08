import React from "react";
import {
  Menu,
  X,
  ChevronDown,
  Brain,
  Heart,
  UserCircle2,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (props.isAuthenticated === true) {
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
                Comprehensive Healthcare Solutions
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
                Empowering your mental, physical, and women's health with
                personalized care and cutting-edge technology.
              </p>
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
                Tailored Healthcare for Your Needs
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ff784b] text-white">
                      <Brain className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Mental Health
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Comprehensive care for your mental well-being, including
                      depression treatment, anxiety management, and cognitive
                      behavioral therapy.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ff784b] text-white">
                      <Heart className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Physical Health
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Personalized diet plans, customized workout routines, and
                      expert nutritional guidance to achieve your fitness goals.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ff784b] text-white">
                      <UserCircle2 className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Women's Health
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      Specialized care including daily exercise routines,
                      PCOD/PCOS prediction, and hormonal health analysis.
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
              <span className="block">Ready to prioritize your health?</span>
              <span className="block text-white">
                Explore our personalized services today.
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handleClick("/services")}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#ff784b] bg-white hover:bg-blue-50 cursor-pointer"
                >
                  Get started
                  <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
