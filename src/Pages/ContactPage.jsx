import React from "react";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className=" bg-gray-100">
      <main className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              We're here to help and answer any question you might have.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#ff784b] text-white px-4 py-2 rounded-md hover:bg-[#ff784b] focus:outline-none focus:ring-2 focus:ring-[#ff784b] focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-[#ff784b] mr-3" />
                    <div>
                      <p className="text-gray-800 font-medium">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-[#ff784b] mr-3" />
                    <div>
                      <p className="text-gray-800 font-medium">Email</p>
                      <p className="text-gray-600">contact@medicare.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-[#ff784b] mr-3" />
                    <div>
                      <p className="text-gray-800 font-medium">Address</p>
                      <p className="text-gray-600">
                        Vidyalankar Campus, Vidyalankar College Marg, Wadala
                        (East),Mumbai – 400037 Maharashtra,India.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Our Location
                  </h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1885.9786678252894!2d72.8696936560627!3d19.021601581276173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf3949dda405%3A0xefd46c9d73152f82!2sVIDYALANKAR%20INSTITUTE%20OF%20TECHNOLOGY%2C%20Mumbai%2C%20Maharashtra%20400037!5e0!3m2!1sen!2sin!4v1727885571240!5m2!1sen!2sin"
                      width="600"
                      height="450"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
