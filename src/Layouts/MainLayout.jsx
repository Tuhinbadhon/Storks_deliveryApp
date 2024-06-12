import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import TopArrow from "../Components/TopArrow/TopArrow";

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("registration");
  return (
    <div className="">
      <div className="">{noHeaderFooter || <Navbar />}</div>
      <Outlet />
      <TopArrow />
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default MainLayout;
