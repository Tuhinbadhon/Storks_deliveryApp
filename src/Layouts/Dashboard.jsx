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

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAdmin = true;
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

  return (
    <div className="flex">
      {/* Toggle Button for Small Screens */}
      <button className="lg:hidden p-4" onClick={toggleSidebar}>
        <FaList />
      </button>

      {/* dashboard side bar */}
      <div
        className={`w-64 min-h-screen font-semibold bg-[#404345] text-white fixed lg:relative z-10 lg:z-auto transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <ul className="menu min-h-screen p-4">
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
                  <FaBook></FaBook>
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
            </>
          )}
          {/* shared nav links */}
          <div
            className="divider"
            style={{ backgroundColor: "white", height: "1px" }}
          ></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
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
      <div className="flex-1 p-8 lg:ml-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
