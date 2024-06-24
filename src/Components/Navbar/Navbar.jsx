import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { LuLogIn, LuLogOut, LuAlignJustify } from "react-icons/lu";
import { MdAppRegistration } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../../public/logo.png";
import useAdmin from "../../hooks/useAdmin";
import useDeliveryMan from "../../hooks/useDeliveryMan";
import { FaGooglePlay, FaPlayCircle } from "react-icons/fa";
import { CiLock, CiPlay1 } from "react-icons/ci";

defineElement(lottie.loadAnimation);

const Navbar = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMan();
  const { user, signOutUser, loading: userLoading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  const handleToogle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdownAvatar = () => {
    setOpen(!Open);
    setDropdownOpen(!DropdownOpen);
  };
  if (isAdminLoading || isDeliveryManLoading || userLoading) {
    return (
      <div className="navbar py-3  fixed z-10 bg-opacity-60 max-w-screen-xl mx-auto text-white bg-black">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  const navlink = (
    <>
      <li>
        <Link
          to="/"
          className="block hover:bg-black hover:bg-opacity-20 hover:border"
          onClick={() => setIsDropdownOpen(false)}
        >
          Home
        </Link>
      </li>

      {user && isAdmin && (
        <li>
          <Link
            to="/dashboard/statistics"
            className="block hover:bg-black hover:bg-opacity-20 hover:border"
          >
            Dashboard
          </Link>
        </li>
      )}
      {user && !isAdmin && !isDeliveryMan && (
        <li>
          <Link
            to="/dashboard/myProfile"
            className="hover:bg-black hover:bg-opacity-20 hover:border"
          >
            Dashboard
          </Link>
        </li>
      )}
      {user && isDeliveryMan && (
        <li>
          <Link
            to="/dashboard/deliveryList"
            className="hover:bg-black hover:bg-opacity-20 hover:border"
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
    <div>
      <ToastContainer />
      <div className="navbar py-3  fixed z-10 bg-opacity-60 max-w-screen-xl mx-auto text-white bg-black">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn  btn-ghost pl-4 lg:hidden"
              onClick={toggleDropdown}
            >
              {isOpen ? (
                <IoCloseSharp className="text-xl" />
              ) : (
                <LuAlignJustify className="text-xl" />
              )}
            </div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu  menu-sm dropdown-content mt-2 z-[10] p-2 shadow bg-black bg-opacity-60 rounded-lg w-52 font-semibold "
              >
                {navlink}
              </ul>
            )}
          </div>
          <div className="flex gap-1 w-full items-center ">
            <Link to="/">
              {" "}
              <img className="w-24 max-[450px]:w-20  " src={logo} alt="" />{" "}
            </Link>
            <Link to="/" className=" max-[450px]:hidden">
              <div className=" flex flex-col text-start items-start p-0 ml-0  ">
                <h2 className="uppercase text-2xl max-[450px]:text-xl  font-extrabold ">
                  storks
                </h2>
                <p className="uppercase text-xs font-bold  ">
                  We deliver parcel worldwide{" "}
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold  ">
            {navlink}
          </ul>
        </div>
        <div className="navbar-end flex gap-4">
          <div>
            <button className="flex justify-center  items-center">
              <IoMdNotificationsOutline className="text-2xl" />
            </button>
          </div>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="dark"
              onChange={handleToogle}
            />

            {/* sun icon */}
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          {user ? (
            <>
              <div className="dropdown dropdown-end  z-50">
                <div
                  tabIndex={0}
                  role="button"
                  onClick={toggleDropdownAvatar}
                  className="btn btn-ghost  btn-circle avatar "
                >
                  <button
                    style={{ width: "44px", height: "44px" }} // Add width and height to make it a square
                  >
                    {user.photoURL ? (
                      <img
                        className="w-10 h-10 rounded-full" // Change to w-full h-full
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
                    className="menu menu-sm rounded-md dropdown-content mt-3 z-[1] p-2 shadow bg-black bg-opacity-60  w-52"
                  >
                    <li>
                      <div className="uppercase">{user.displayName}</div>
                    </li>

                    {user && isAdmin && (
                      <li>
                        <Link
                          to="/dashboard/statistics"
                          className="block hover:bg-black hover:bg-opacity-60 "
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {user && !isAdmin && !isDeliveryMan && (
                      <li>
                        <Link
                          to="/dashboard/myProfile"
                          className="hover:bg-black hover:bg-opacity-60 "
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    {user && isDeliveryMan && (
                      <li>
                        <Link
                          to="/dashboard/deliveryList"
                          className="hover:bg-black hover:bg-opacity-60 "
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}

                    <li className="mt-2">
                      <button
                        className="hover:bg-black hover:bg-opacity-60 block text-center "
                        onClick={logOutHandler}
                      >
                        Log Out{" "}
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              {/* <div className="btn btn-ghost btn-circle avatar">
                
                {!user}
              </div> */}
              <Link to="/login">
                <button className="btn  rounded-3xl max-[450px]:py-1 text-blue-400 bg-black border-none bg-opacity-60 hover:bg-black hover:bg-opacity-40 hover:text-red-400 max-[450px]:px-2 ">
                  {" "}
                  <CiLock className="text-lg" />
                  Login
                </button>
              </Link>
              {/* <Link to="/registration">
                <button className="btn max-[450px]:py-1 max-[450px]:px-2 ">
                  {" "}
                  <MdAppRegistration className="max-[450px]:hidden" />
                  Register
                </button>
              </Link> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
