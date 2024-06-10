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
          Our top delivery man ensures your packages arrive
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
        <div className=" flex flex-col justify-center items-center bg-base-100 shadow-xl">
          <figure className="p-5 ">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="Album"
              className="rounded-full"
            />
          </figure>
          <div className="p-5 mb-5">
            <h2 className="flex justify-center gap-1 items-baseline text-xl font-bold mt-4">
              Abdul Jobbar{" "}
              <sup>
                <span className="flex justify-center items-center">
                  5<FaStar />{" "}
                </span>
              </sup>
            </h2>
            <p className="font-bold"> Percel delivered:300</p>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center bg-base-100 shadow-xl">
          <figure className="p-5 ">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="Album"
              className="rounded-full"
            />
          </figure>
          <div className="p-5 mb-5">
            <h2 className="flex justify-center gap-1 items-baseline text-xl font-bold mt-4">
              Abdul Jobbar{" "}
              <sup>
                <span className="flex justify-center items-center">
                  5<FaStar />{" "}
                </span>
              </sup>
            </h2>
            <p className="font-bold"> Percel delivered:300</p>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center bg-base-100 shadow-xl">
          <figure className="p-5 ">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="Album"
              className="rounded-full"
            />
          </figure>
          <div className="p-5 mb-5">
            <h2 className="flex justify-center gap-1 items-baseline text-xl font-bold mt-4">
              Abdul Jobbar{" "}
              <sup>
                <span className="flex justify-center items-center">
                  5<FaStar />{" "}
                </span>
              </sup>
            </h2>
            <p className="font-bold"> Percel delivered:300</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryMan;
