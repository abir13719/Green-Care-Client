import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiUserCircle, HiMenu } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import logo from "../assets/logo.webp";
import {
  FaCampground,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logoutUser, loading } = useAuth();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = () => {
    logoutUser().then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest(".menu-toggle")
      ) {
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navlinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="bg-green-500 p-3 mx-1 rounded-md font-medium flex items-center gap-1"
        >
          <FaHome></FaHome>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-camps"
          className="bg-green-500 p-3 mx-1 rounded-md font-medium flex items-center gap-1"
        >
          <FaCampground></FaCampground>
          Available Camps
        </NavLink>
      </li>
    </>
  );

  if (loading) {
    return (
      <div className="flex justify-end items-center h-20 container  mx-auto p-5">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <nav className="bg-gray-100 shadow-lg py-4 fixed left-0 right-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Part */}
        <div className="flex items-center">
          <Link to="/" className="mr-4 flex items-center gap-1">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="font-bold text-3xl text-green-600">
              Green<span className="font-bold text-3xl text-black">Care</span>
            </span>
          </Link>
        </div>

        {/* Middle Part */}
        <ul className="hidden sm:flex items-center">{navlinks}</ul>

        {/* Right Part */}
        <div className="flex items-center">
          {user ? (
            <div ref={userMenuRef} className="relative">
              <button className="mr-4 menu-toggle" onClick={toggleUserMenu}>
                {user.photoURL ? (
                  <>
                    <div>
                      <img
                        className="h-12 w-12 rounded-full mt-1"
                        src={user.photoURL}
                      />
                    </div>
                  </>
                ) : (
                  <HiUserCircle className="inline-block mr-1" size={40} />
                )}
              </button>
              {/* User Menu */}
              <div
                className={`absolute top-14 right-0 bg-black shadow-md p-4 w-40 space-y-1 rounded-md ${
                  isUserMenuOpen ? "block" : "hidden"
                }`}
              >
                <p className="text-lg text-white">{user?.displayName}</p>
                <Link
                  to="dashboard"
                  className="bg-green-500 text-white w-full p-3 rounded-md flex items-center gap-1"
                >
                  <MdDashboard></MdDashboard>
                  Dashboard
                </Link>
                <button
                  className="bg-red-500 text-white w-full p-3 rounded-md flex items-center gap-1"
                  onClick={logout}
                >
                  <FaSignOutAlt></FaSignOutAlt>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="mr-4 bg-green-500 p-3 mx-1 rounded-md font-medium flex items-center gap-1"
            >
              <FaSignInAlt></FaSignInAlt>
              Join Us
            </Link>
          )}

          <button className="sm:hidden menu-toggle" onClick={toggleMobileMenu}>
            <HiMenu className="inline-block" size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`sm:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-gray-800 p-4`}
      >
        <ul>{navlinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
