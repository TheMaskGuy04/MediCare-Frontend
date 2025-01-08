import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import ServicesPage from "./Pages/ServicesPage.jsx";
import Footer from "./components/Footer";
import ContactPage from "./Pages/ContactPage.jsx";
import PhysicalHealthPage from "./Pages/PhysicalHealthPage.jsx";
import WorkoutPlanForm from "./Pages/WorkoutPlanForm.jsx";
import DietPlanForm from "./Pages/DietPlanForm.jsx";
import WomensHealthPage from "./Pages/WomenHealthPage.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    async function check() {
      const response = await axios.get("http://localhost:3000/isAuth", {
        withCredentials: true, // Important for sending cookies
      });

      const { isAuth } = response.data;

      // console.log(response);
      if (isAuth) {
        setIsAuthenticated(true);
      }
    }

    check();
  }, []);

  const handleDataFromNav = async (data) => {
    const response = await axios.post("http://localhost:3000/logout", {
      withCredentials: true, // Important for sending cookies
    });

    setIsAuthenticated(data);
  };

  const handleDataFromLogin = async (data) => {
    setIsAuthenticated(data);
  };

  return (
    <>
      <BrowserRouter>
        {/* <div className="bg-gradient-to-b from-blue-100 to-blue-200"> */}
        <div className="bg-gray-100">
          <Navbar
            isAuthenticated={isAuthenticated}
            sendDataToApp={handleDataFromNav}
          />
          <Routes>
            <Route
              path="/"
              element={<HomePage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  isAuthenticated={isAuthenticated}
                  sendDataToApp={handleDataFromLogin}
                />
              }
            />
            <Route
              path="/registration"
              element={<RegistrationPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/services"
              element={<ServicesPage isAuthenticated={isAuthenticated} />}
            />

            <Route path="/physical-health" element={<PhysicalHealthPage />} />

            <Route
              path="/generate-workout-plan"
              element={<WorkoutPlanForm />}
            />

            <Route path="/generate-diet-plan" element={<DietPlanForm />} />

            <Route path="/womens-health" element={<WomensHealthPage />} />

            <Route
              path="/contact"
              element={<ContactPage isAuthenticated={isAuthenticated} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}
