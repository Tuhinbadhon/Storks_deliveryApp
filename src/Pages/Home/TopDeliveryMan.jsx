import React from "react";
import { FaStar } from "react-icons/fa";

const TopDeliveryMan = () => {
  return (
    <div className="lg:mx-24 mx-5">
      <div className=" mx-auto md:w-7/12 text-center mt-20 md:mb-10">
        <h2
          data-aos="fade-up"
          data-aos-duration="2000"
          className="text-3xl uppercase font-bold"
        >
          The Top Delivery Man
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="200"
          className="text-lg mt-3 mx-5"
        >
          Our <span className="text-green-500">Top</span> delivery man ensures
          your packages arrive
          <span className="font-bold text-orange-500"> safely </span> and
          <span className="font-bold text-orange-500"> swiftly</span> in every
          time.
        </p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="300"
        className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        <div className=" flex  pt-8 rounded-lg flex-col justify-center items-center bg-base-100 shadow-xl">
          <figure className=" rounded-full shadow-lg  border-gray-300">
            <img
              src="https://i.ibb.co/xjsyCLx/leo.webp"
              alt="Album"
              className="rounded-full w-52 h-52 object-cover"
            />
          </figure>
          <div className="p-5 mb-5">
            <h2 className="flex justify-center gap-1 items-baseline text-xl font-bold mt-4">
              David Paul{" "}
              <sup>
                <span className="flex gap-1 justify-center items-center">
                  4.7
                  <FaStar className="text-blue-700 text-[10px]" />{" "}
                </span>
              </sup>
            </h2>
            <p className="font-bold"> Percel delivered:30</p>
          </div>
        </div>
        <div className=" flex pt-8 rounded-lg flex-col justify-center items-center bg-base-100 shadow-xl">
          <figure className=" rounded-full shadow-lg  border-gray-300">
            <img
              src="https://i.ibb.co/0yqCgPh/kate.jpg"
              alt="Album"
              className="rounded-full w-52 h-52 object-cover"
            />
          </figure>
          <div className="p-5 mb-5">
            <h2 className="flex justify-center gap-1 items-baseline text-xl font-bold mt-4">
              Anjelina july{" "}
              <sup>
                <span className="flex gap-1 justify-center items-center">
                  4.5
                  <FaStar className="text-blue-700 text-[10px]" />{" "}
                </span>
              </sup>
            </h2>
            <p className="font-bold"> Percel delivered:20</p>
          </div>
        </div>
        <div className=" flex pt-8 rounded-lg flex-col justify-center items-center bg-base-100 shadow-xl">
          <figure className="rounded-full shadow-lg  border-gray-300">
            <img
              src="https://i.ibb.co/FKXPvRS/image11.jpg"
              alt="Album"
              className="rounded-full w-52 h-52 object-cover"
            />
          </figure>
          <div className="p-5  mb-5">
            <h2 className="flex justify-center gap-1 items-baseline text-xl font-bold mt-4">
              David Backham{" "}
              <sup>
                <span className="flex gap-1 justify-center items-center">
                  4.0
                  <FaStar className="text-blue-700 text-[10px]" />{" "}
                </span>
              </sup>
            </h2>
            <p className="font-bold"> Percel delivered:10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryMan;
