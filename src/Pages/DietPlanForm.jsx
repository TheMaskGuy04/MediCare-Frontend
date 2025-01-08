import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function DietPlanForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    dietaryRestrictions: "",
    healthGoals: "",
    allergies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // TODO: Add logic to generate and display the diet plan
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="flex items-center mb-6">
              <Link
                to="/physical-health"
                className="text-primary hover:text-primary-dark mr-2"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h2 className="text-2xl font-bold text-gray-900">
                Generate Diet Plan
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700"
                >
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="activityLevel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Activity Level
                </label>
                <select
                  name="activityLevel"
                  id="activityLevel"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.activityLevel}
                  onChange={handleChange}
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="lightly active">Lightly Active</option>
                  <option value="moderately active">Moderately Active</option>
                  <option value="very active">Very Active</option>
                  <option value="extra active">Extra Active</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="dietaryRestrictions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dietary Restrictions
                </label>
                <textarea
                  name="dietaryRestrictions"
                  id="dietaryRestrictions"
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="healthGoals"
                  className="block text-sm font-medium text-gray-700"
                >
                  Health Goals
                </label>
                <textarea
                  name="healthGoals"
                  id="healthGoals"
                  rows="3"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.healthGoals}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="allergies"
                  className="block text-sm font-medium text-gray-700"
                >
                  Allergies (if any)
                </label>
                <textarea
                  name="allergies"
                  id="allergies"
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  value={formData.allergies}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Generate Diet Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
