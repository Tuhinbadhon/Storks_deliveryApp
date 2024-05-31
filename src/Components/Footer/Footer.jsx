import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="dark:bg-fuchsia-50 dark:text-gray-800 md:py-16 py-7 lg:py-20">
      {/* className="" */}
      <footer
        className="  to-transparent 
      bg-opacity-5  place-items-center w-full gap-4 
            text-base-content flex flex-col  lg:px-28 md:px-14  lg:mt-20 mt-5 px-5 "
      >
        <div className="w-full flex  lg:flex-row md:flex-row md:justify-between flex-col gap-4 lg:justify-between ">
          <div className="flex flex-col items-center ">
            <img
              className="lg:w-16 lg:h-16 md:w-12 md:h-12 w-10 h-10 "
              src="/logo.png"
              alt=""
            />
            <Link
              to="/"
              className="btn   btn-ghost lg:text-3xl md:text-2xl font-bold max-[450px]:text-xl bg-gradient-to-r from-green-500 to-[#59C6D2] text-transparent bg-clip-text p-0"
            >
              STUDY LAB
            </Link>
          </div>
          <div className="flex flex-col  text-center  ">
            <h6 className="footer-title ">Services</h6>
            <a className="link link-hover">Focus Room</a>
            <a className="link link-hover">How it works</a>
            <a className="link link-hover">Community</a>
            <a className="link link-hover">Rules</a>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h6 className="footer-title">Contacts</h6>
            <a className="link link-hover">+8801815-0000000</a>
            <a className="link link-hover">tuhinbadhon@gmail.com</a>
            <a className="link link-hover">Address: Dhanmondi,Dhaka</a>
          </div>
          <div className="text-center">
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4 justify-center">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="font-semibold  text-center mt-7  ">
        <p>
          Copyright © 2024 - All right reserved by{" "}
          <Link
            to="/"
            className=" lg:text-lg font-bold max-[450px]:text-xl bg-gradient-to-r from-green-500 to-[#59C6D2] text-transparent bg-clip-text"
          >
            STUDY LAB{" "}
          </Link>
          Ltd
        </p>
      </div>
    </div>
  );
};

export default Footer;
