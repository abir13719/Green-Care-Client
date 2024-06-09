import React, { useState } from "react";

import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <header className="flex justify-between items-center bg-white shadow-md p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none md:hidden"
          >
            <FaBars className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
