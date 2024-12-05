import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white min-h-screen p-6">
      {/* Left Side - Image */}
      <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
        <img src="about1.jpeg" alt="Welcome" className="rounded-lg shadow-lg max-w-full h-auto md:max-w-sm" />
      </div>

      {/* Right Side - Content */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to Our Store</h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Discover a world of amazing products tailored to your needs. Shop now and enjoy exclusive deals on a wide range of categories.
        </p>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4">
          With fast delivery and a user-friendly experience, we ensure your satisfaction with every purchase. Start exploring today!
        </p>
        <button className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Shop Now</button>
      </div>
    </div>
  );
};

export default Home;
