// src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/47a59d108677535.62c7ebd2c9907.gif"

import React, { useState } from "react";
import { ArrowRight, Upload } from "lucide-react";

const exerciseOfTheDay = {
  name: "Gentle Yoga Stretch",
  description:
    "A series of gentle yoga stretches designed to improve flexibility and reduce stress. Perfect for starting your day or unwinding in the evening.",
  duration: "15 minutes",
  benefits: [
    "Improves flexibility",
    "Reduces stress and anxiety",
    "Enhances body awareness",
    "Promotes better sleep",
  ],
};

export default function WomensHealthPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      // Here you would typically send the file to your backend
      console.log("File submitted:", file.name);
      // TODO: Add logic to send file to backend and get prediction
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Women's Health Hub
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Exercise of the Day Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 flex justify-center">
              <img
                src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/47a59d108677535.62c7ebd2c9907.gif"
                alt="Exercise of the day demonstration"
                className="object-cover h-64"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {exerciseOfTheDay.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {exerciseOfTheDay.description}
              </p>
              <p className="text-gray-800 font-medium mb-2">
                Duration: {exerciseOfTheDay.duration}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Benefits:
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                {exerciseOfTheDay.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* PCOD/PCOS Prediction Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                PCOD/PCOS Prediction
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your medical report and get a prediction for PCOD/PCOS.
                Our advanced AI model will analyze your report and provide
                insights.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, PNG, JPG (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.png,.jpg"
                    />
                  </label>
                </div>
                {file && (
                  <p className="text-sm text-gray-500">
                    Selected file: {file.name}
                  </p>
                )}
                <button
                  type="submit"
                  className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#ff784b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                    !file && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!file}
                >
                  Get PCOD/PCOS Prediction
                  <ArrowRight
                    className="ml-2 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
