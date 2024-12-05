import React from "react";

const About: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-50 min-h-screen p-6">
      {/* Left Side - Image */}
      <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
        <img
          src="about1.jpeg" // Replace with your image URL
          alt="About Us"
          className="rounded-lg shadow-lg max-w-full h-auto md:max-w-sm"
        />
      </div>

      {/* Right Side - Content */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Welcome to our demo application! This project is designed to showcase the capabilities of React Router v6. Here, you'll find examples of
          routing, dynamic content, and seamless navigation.
        </p>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4">
          Whether you're exploring this application for learning or inspiration, we hope it provides valuable insights into building modern,
          responsive, and user-friendly web applications.
        </p>
      </div>
    </div>
  );
};

export default About;
