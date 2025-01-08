import React from "react";
import { Utensils, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

export default function PhysicalHealthPage() {
  return (
    <div className="flex min-h-screen justify-center items-between bg-gray-100">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Physical Health Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ServiceCard
            title="Generate Diet Plan"
            icon={<Utensils className="w-16 h-16 text-green-500" />}
            description="Get a personalized diet plan tailored to your health goals and dietary preferences."
            linkTo="/generate-diet-plan"
          />
          <ServiceCard
            title="Generate Workout Plan"
            icon={<Dumbbell className="w-16 h-16 text-blue-500" />}
            description="Receive a customized workout plan designed to help you achieve your fitness objectives."
            linkTo="/generate-workout-plan"
          />
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ title, icon, description, linkTo }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link
          to={linkTo}
          className="bg-primary text-black font-semibold py-2 px-6 border-4 rounded-full hover:bg-primary-dark transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
