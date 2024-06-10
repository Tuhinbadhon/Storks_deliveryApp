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
// import useAdmin from "../hooks/useAdmin";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuListChecks } from "react-icons/lu";
import { IoMdCheckboxOutline } from "react-icons/io";
import { ImBoxAdd } from "react-icons/im";
import { FaListCheck } from "react-icons/fa6";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import useDeliveryMan from "../hooks/useDeliveryMan"; // New hook for delivery man

const Dashboard = () => {
  const isAdmin = true;
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // const [isDeliveryMan] = useDeliveryMan(); // Get delivery man status

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen font-semibold bg-[#404345] text-white">
        <ul className="menu p-4">
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
            className="divider  "
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
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
