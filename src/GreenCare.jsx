import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const GreenCare = () => {
  const location = useLocation();
  const isOnlyOutlet =
    location.pathname.includes("login") ||
    location.pathname.includes("sign-up");
  return (
    <div>
      {!isOnlyOutlet && <Navbar></Navbar>}
      <Outlet></Outlet>
      {!isOnlyOutlet && <Footer></Footer>}
    </div>
  );
};

export default GreenCare;
