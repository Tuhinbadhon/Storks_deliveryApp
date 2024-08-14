import {
  FaAd,
  FaBook,
  FaBox,
  FaBoxOpen,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaPaypal,
  FaPeopleCarry,
  FaRegUser,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
  FaTimes,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuListChecks } from "react-icons/lu";
import { IoMdCheckboxOutline } from "react-icons/io";
import { ImBoxAdd } from "react-icons/im";
import { FaListCheck } from "react-icons/fa6";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useDeliveryMan from "../hooks/useDeliveryMan";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { GrTransaction } from "react-icons/gr";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdmin] = useAdmin();
  const [isDeliveryMan] = useDeliveryMan();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const helmetContext = {};
  return (
    <div className="lg:flex">
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
      </HelmetProvider>

      {/* Toggle Button for Small Screens */}
      {!isSidebarOpen && (
        <button
          className="lg:hidden md:p-8 p-4 focus:outline-none"
          onClick={toggleSidebar}
        >
          <FaList />
        </button>
      )}

      {/* dashboard side bar */}
      <div
        className={`w-64 max-[450px]:h-svh min-h-screen font-semibold bg-[#404345] text-white fixed  z-40  transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-700 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl">Dashboard</h2>
          <button
            className="lg:hidden text-2xl  focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>
        <ul className="menu h-svh overflow-y-auto p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/allparcels">
                  <FaBoxOpen />
                  All Parcels
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers />
                  All Users ({users.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all_delivery_men">
                  <FaPeopleCarry />
                  All Delivery Men
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/statistics">
                  <BsGraphUpArrow />
                  Statistics
                </NavLink>
              </li>
            </>
          ) : isDeliveryMan ? (
            <>
              <li>
                <NavLink to="/dashboard/deliveryList">
                  <FaListCheck />
                  My Delivery List
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myReviews">
                  <FaBook />
                  My Reviews
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/bookAParcel">
                  <ImBoxAdd />
                  Book A Parcel
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myParcels">
                  <FaBox />
                  My Parcels
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myProfile">
                  <FaRegUser />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <GrTransaction />
                  Payment History
                </NavLink>
              </li>
            </>
          )}
          {/* shared nav links */}
          <div
            className="divider"
            style={{ backgroundColor: "white", height: "1px" }}
          ></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Overlay for Sidebar on Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* dashboard content */}
      <div className="flex-1 p-5 lg:ml-[260px] overflow-auto  transition-all duration-200 ease-in-out">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
