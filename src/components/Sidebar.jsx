import React from "react";
import { NavLink } from "react-router-dom";
import { FaCampground, FaEdit, FaHome, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdManageHistory, MdPayments } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
import { IoIosAnalytics } from "react-icons/io";
import useAdmin from "../hooks/useAdmin";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isAdmin] = useAdmin();

  return (
    <div
      className={`fixed inset-0 bg-green-500 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-72`}
    >
      <div className="flex items-center justify-between p-4 md:hidden shadow-md">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <FaTimes className="h-6 w-6" />
        </button>
      </div>

      <nav className="space-y-2 pr-4 pl-2 py-2">
        {/* Admin Routes */}
        {isAdmin && isAdmin ? (
          <>
            <NavLink
              to="dashboard/manage-admin-profile"
              className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
            >
              <CgProfile className="h-6 w-6"></CgProfile>
              Manage Profile
            </NavLink>
            <NavLink
              to="dashboard/add-camp"
              className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
            >
              <GiCampingTent className="w-6 h-6"></GiCampingTent>
              Add A Camp
            </NavLink>
            <NavLink
              to="dashboard/manage-camps"
              className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
            >
              <MdManageHistory className="w-6 h-6"></MdManageHistory>
              Manage Camps
            </NavLink>
            <NavLink
              to="dashboard/manage-registered-camps"
              className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
            >
              <FaEdit className="w-[22px] h-[22px]"></FaEdit>
              Manage Registered Camps
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="dashboard/analytics"
              className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
            >
              <IoIosAnalytics className="w-6 h-6"></IoIosAnalytics>
              Analytics
            </NavLink>
            <NavLink
              to="dashboard/manage-user-profile"
              className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
            >
              <CgProfile className="h-6 w-6"></CgProfile>
              Manage Profile
            </NavLink>
            <NavLink
              to="dashboard/registered-camps"
              className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
            >
              <GiCampingTent className="w-6 h-6"></GiCampingTent>
              Registered Camps
            </NavLink>
            <NavLink
              to="dashboard/payment-history"
              className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
            >
              <MdPayments className="w-6 h-6"></MdPayments>
              Payment History
            </NavLink>
          </>
        )}

        {/* User Routes */}

        <NavLink
          to="/"
          className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
        >
          <FaHome className="w-6 h-6"></FaHome>
          Home
        </NavLink>
        <NavLink
          to="/available-camps"
          className="w-full border border-green-600 p-3 mx-1 rounded-md flex items-center gap-1 font-medium hover:bg-black hover:text-white"
        >
          <FaCampground className="w-[22px] h-[22px]"></FaCampground>
          Available Camps
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
