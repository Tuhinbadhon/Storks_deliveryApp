import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { LuAlignJustify } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import logo from "../../../public/logo.png";
import useAdmin from "../../hooks/useAdmin";
import useDeliveryMan from "../../hooks/useDeliveryMan";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMan();
  const { user, signOutUser, loading: userLoading } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToogle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const toggleDropdownAvatar = () => {
    setOpen(!Open);
    setDropdownOpen(!DropdownOpen);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isAdminLoading || isDeliveryManLoading || userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  const navlink = (
    <>
      {!user && !isAdmin && !isDeliveryMan && (
        <ul>
          <li>
            <NavLink
              to="/"
              onClick={() => setIsDropdownOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-white/20 text-white shadow-md ring-1 ring-white/20"
                    : "text-white/90 hover:bg-white/10"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              onClick={() => setIsDropdownOpen(false)}
              className={({ isActive }) =>
                `px-2 py-1 rounded-md transition-colors lg:hidden ${
                  isActive
                    ? "text-indigo-300 underline"
                    : "hover:text-indigo-200"
                }`
              }
            >
              Login / Sign Up
            </NavLink>
          </li>
        </ul>
      )}

      {user && isAdmin && (
        <li>
          <Link
            to="/dashboard/statistics"
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-white/90 hover:bg-white/10"
          >
            Dashboard
          </Link>
        </li>
      )}
      {user && !isAdmin && !isDeliveryMan && (
        <li>
          <Link
            to="/dashboard/myProfile"
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-white/90 hover:bg-white/10"
          >
            Dashboard
          </Link>
        </li>
      )}
      {user && isDeliveryMan && (
        <li>
          <Link
            to="/dashboard/deliveryList"
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-white/90 hover:bg-white/10"
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  const photoIcon = (
    <div className="w-10 rounded-full">
      <lord-icon
        className="w-full h-full"
        src="https://cdn.lordicon.com/kthelypq.json"
        trigger="loop"
        delay="500"
        colors="primary:#000"
        style={{ width: "40px", height: "40px" }}
      ></lord-icon>
    </div>
  );

  const logOutHandler = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          text: "Successfully logout",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="">
      <ToastContainer />
      <motion.div
        initial={false}
        animate={isScrolled ? "scrolled" : "top"}
        variants={{
          top: { y: 0, opacity: 1 },
          scrolled: { y: 0, opacity: 1 },
        }}
        transition={{ duration: 0.25 }}
        className={`navbar py-3 max-w-screen-xl mx-auto text-white transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 left-0 right-0 z-30 bg-black bg-opacity-50 backdrop-blur-md shadow-md"
            : "absolute top-0 left-0 right-0 z-20 bg-transparent"
        }`}
      >
        <div className="navbar-start">
          <button
            className="lg:hidden  mx-2  border border-gray-600 p-1 rounded-[4px] focus:outline-none"
            onClick={toggleSidebar}
          >
            <LuAlignJustify size={14} className="text-[#ccd0d9]" />
          </button>

          {/* Sidebar for small screens */}
          <div
            className={`fixed inset-0 z-40 flex ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transform transition-transform duration-700 ease-in-out lg:hidden`}
          >
            <div className="w-64 max-[450px]:h-svh min-h-screen font-semibold bg-[#515e68]    flex flex-col">
              <div className="flex p-6 items-center gap-1">
                <img className="w-16" src={logo} alt="" />
                <h2 className=" text-lg uppercase  ">Storks</h2>

                {/* <button
                  className=" focus:outline-none  "
                  onClick={(e) => {
                    e.stopPropagation(); // Stop propagation to prevent sidebar from closing
                    toggleSidebar();
                  }}
                >
                  <IoCloseSharp className="text-3xl" />
                </button> */}
              </div>
              <ul className="menu p-2 mt-2 z-[10]">{navlink}</ul>
              {/* <div className="flex-grow"></div>
              <div className="mt-auto font-semibold p-4">
                <p className="text-sm">
                  Copyright © {currentYear} - All right reserved by storks Ltd
                </p>
              </div> */}
            </div>
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={toggleSidebar}
            ></div>
          </div>

          <div className="flex gap-2 w-full items-center ">
            <Link to="/" aria-label="Home">
              <img
                className={`transition-all duration-300 ${isScrolled ? "w-16" : "w-24"}`}
                src={logo}
                alt="Storks logo"
              />
            </Link>
            <Link to="/" className="">
              <div className="flex flex-col text-start items-start p-0 ml-0">
                <h2
                  className={`uppercase font-bold transition-all duration-300 ${isScrolled ? "text-lg" : "text-2xl"}`}
                >
                  storks
                </h2>
                <p className=" max-[450px]:hidden uppercase text-xs md:text-[10px] font-bold">
                  We deliver parcel worldwide
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">{navlink}</ul>
        </div>
        <div className="navbar-end flex gap-4 items-center">
          {/* primary CTA for large screens */}

          {/* <div>
            <button className="flex justify-center items-center">
              <IoMdNotificationsOutline className="text-2xl" />
            </button>
          </div> */}

          {user ? (
            <>
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  onClick={toggleDropdownAvatar}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <button style={{ width: "44px", height: "44px" }}>
                    {user.photoURL ? (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.photoURL}
                        alt="User Avatar"
                      />
                    ) : (
                      photoIcon
                    )}
                  </button>
                </div>

                {DropdownOpen && (
                  <ul
                    tabIndex={0}
                    className="menu menu-sm rounded-md dropdown-content mt-3  z-[1] p-2 shadow bg-black bg-opacity-60 w-52"
                  >
                    <li>
                      <div className="uppercase">{user.displayName}</div>
                    </li>

                    {user && isAdmin && (
                      <li>
                        <Link
                          to="/dashboard/statistics"
                          className="block hover:bg-black hover:bg-opacity-60"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {user && !isAdmin && !isDeliveryMan && (
                      <li>
                        <Link
                          to="/dashboard/myProfile"
                          className="hover:bg-black hover:bg-opacity-60"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {user && isDeliveryMan && (
                      <li>
                        <Link
                          to="/dashboard/deliveryList"
                          className="hover:bg-black hover:bg-opacity-60"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}

                    <li className="mt-2">
                      <button
                        className=" hover:bg-black hover:bg-opacity-60 block text-center"
                        onClick={logOutHandler}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              {/* login button removed from navbar */}
              <Link
                to="/dashboard/bookAParcel"
                className={`hidden lg:inline-block px-4 py-2 rounded-full font-semibold transition ${isScrolled ? "bg-indigo-500 text-white" : "bg-white text-indigo-700"}`}
              >
                Book a Parcel
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
