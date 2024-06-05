import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-500 text-black py-10">
      <div className="container mx-auto px-4 md:flex md:justify-between">
        {/* About Section */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-xl font-bold mb-2">About Us</h3>
          <p className="">
            We are dedicated to providing top-notch medical camps and wellness
            programs to improve the health and well-being of our community.
          </p>
        </div>

        {/* Links Section */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-xl font-bold mb-2">Quick Links</h3>
          <ul>
            <li className="mb-1">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li className="mb-1">
              <Link to="/available-camps" className="hover:text-white">
                Available Camps
              </Link>
            </li>
            <li className="mb-1">
              <Link to="dashboard" className=" hover:text-white">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p className="">
            Email: greencare@medicalcamps.com
            <br />
            Phone: +1 234 567 890
          </p>
          <div className="flex space-x-4 mt-4">
            <Link to="#" className=" hover:text-white">
              <FaFacebookF />
            </Link>
            <Link to="#" className=" hover:text-white">
              <FaTwitter />
            </Link>
            <Link to="#" className=" hover:text-white">
              <FaInstagram />
            </Link>
            <Link to="#" className=" hover:text-white">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-black mt-8">
        &copy; 2024 Medical Camps. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
