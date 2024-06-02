import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" ">
      {/* className="" */}
      <footer
        className="  to-transparent dark:bg-indigo-50 dark:text-black md:py-20 py-7
      bg-opacity-5  place-items-center w-full gap-4 
            text-base-content flex flex-col   md:px-14  lg:mt-20 mt-5 px-5 "
      >
        <div className="w-full flex  lg:flex-row md:flex-row md:justify-between flex-col gap-4 lg:justify-between ">
          <div className="flex flex-col max-[450px]:items-center ">
            <img className="w-28 max-[450px]:w-20" src="/logo.png" alt="" />
            <Link to="/" className=" ">
              <div className=" flex flex-col  lg:text-start md:items-start items-center p-0 ml-0  ">
                <h2 className="uppercase text-2xl max-[450px]:text-xl  text-black   font-extrabold ">
                  storks
                </h2>
                <p className="uppercase text-xs  text-black  font-bold  ">
                  We deliver parcel worldwide{" "}
                </p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col  text-center  ">
            <h6 className="font-bold text-black md:mb-5 ">USEFUL LINKS</h6>
            <a className="link link-hover text-gray-700">History</a>
            <a className="link link-hover text-gray-700">Services</a>
            <a className="link link-hover text-gray-700">About Us</a>
            <a className="link link-hover text-gray-700">Company Timeline</a>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h6 className="font-bold text-black md:mb-5">Contacts</h6>
            <a className="link link-hover text-gray-700">+8801815-0000000</a>
            <a className="link link-hover text-gray-700">
              tuhinbadhon@gmail.com
            </a>
            <a className="link link-hover text-gray-700">
              Address: Dhanmondi,Dhaka
            </a>
          </div>
          <div className="text-center">
            <h6 className="font-bold text-black md:mb-5 ">Social</h6>
            <div className="grid grid-flow-col gap-4 justify-center">
              <a href="">
                <FaFacebook className="text-4xl text-blue-600" />
              </a>
              <a href="">
                <FaTwitter className="text-4xl text-blue-500" />
              </a>
              <a href="">
                <FaYoutube className="text-4xl text-red-600" />
              </a>
            </div>
          </div>
          <div>
            <form className=" flex flex-col items-center  ">
              <h6 className="font-bold text-black md:mb-5">Newsletter</h6>
              <fieldset className="form-control w-80">
                <label className="label">
                  <span className="text-gray-700">
                    Enter your email address
                  </span>
                </label>
                <div className="join">
                  <input
                    type="text"
                    placeholder="username@site.com"
                    className="input input-bordered join-item"
                  />
                  <button className="btn btn-primary join-item">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </footer>
      <div className="font-semibold p-2  text-center  bg-neutral text-neutral-content  ">
        <p>
          Copyright © 2024 - All right reserved by{" "}
          <Link
            to="/"
            className=" lg:text-lg font-bold max-[450px]:text-xl bg-gradient-to-r from-green-500 to-[#59C6D2] text-transparent bg-clip-text"
          >
            storks{" "}
          </Link>
          Ltd
        </p>
      </div>
    </div>
  );
};

export default Footer;
