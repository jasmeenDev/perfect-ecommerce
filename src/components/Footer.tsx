import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 px-6">
        {/* Left Side - Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-white transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white transition duration-300">
                Products
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Contact Info */}
        <div className="text-center md:text-right">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300">Email: support@store.com</p>
          <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-300 mt-4">© {new Date().getFullYear()} Our Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
