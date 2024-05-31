import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("registration");
  return (
    <div className="mx-auto">
      <div className="lg:mt-10 mt-5 lg:mx-20">
        {noHeaderFooter || <Navbar />}
      </div>
      <Outlet />
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default MainLayout;
