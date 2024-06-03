import React from "react";
import { FaRocket, FaShippingFast, FaUserTie } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { RxRocket } from "react-icons/rx";
import { TbWorldCheck } from "react-icons/tb";
import { CiDeliveryTruck } from "react-icons/ci";
import CountUp, { useCountUp } from "react-countup";

const Features = () => {
  useCountUp({
    ref: "counter",
    end: 1234567,
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
  });
  return (
    <div className="md:mx-24 mx-5">
      <div className=" text-center mt-20">
        <h2
          data-aos="fade-up"
          data-aos-duration="2000"
          className="text-3xl uppercase font-bold"
        >
          Features
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="200"
          className="text-lg mt-3 mx-5"
        >
          We're leading{" "}
          <span className="font-bold text-orange-500">Parcel Service</span> in
          the world
        </p>
      </div>

      {/*features cards  */}

      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="300"
        className=" mt-7 grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        <div className="card p-5  lg:card-side bg-base-100 shadow-xl">
          <div className="p-4 justify-center items-center flex">
            <RxRocket className="w-20 text-gray-300 h-20  " />
          </div>
          <div className="flex flex-col max-[450px]:mt-3 justify-center ">
            <h2 className="text-lg font-bold uppercase mb-2">
              Super Fast Delivery
            </h2>
            <p className="text-sm">
              Speedy parcel delivery is our specialty, ensuring your packages
              arrive swiftly and securely.
            </p>
          </div>
        </div>
        <div className="card p-5  lg:card-side bg-base-100 shadow-xl">
          <div className="p-4 justify-center items-center flex">
            <MdOutlineSecurity className="w-20 text-gray-300 h-20  " />
          </div>
          <div className="flex flex-col max-[450px]:mt-3 justify-center ">
            <h2 className="text-lg font-bold uppercase mb-2">Secure Service</h2>
            <p className="text-sm">
              Experience our secure parcel delivery service, providing peace of
              mind as your packages are swiftly and safely transported to their
              destination
            </p>
          </div>
        </div>
        <div className="card p-5  lg:card-side bg-base-100 shadow-xl">
          <div className="p-4 justify-center items-center flex">
            <FaShippingFast className="w-20 text-gray-300 h-20  " />
          </div>
          <div className="flex flex-col max-[450px]:mt-3 justify-center ">
            <h2 className="text-lg font-bold uppercase mb-2">
              World wide shipping
            </h2>
            <p className="text-sm">
              Explore global possibilities with our world-class shipping
              service, delivering your parcels swiftly and securely to
              destinations across the globe.
            </p>
          </div>
        </div>
      </div>

      {/* statistic cards */}
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="400"
        className="mt-2  "
      >
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className=" p-2   bg-gray-800 shadow-xl">
            <div className="p-2 justify-center items-center flex">
              <TbWorldCheck className="w-10 text-gray-300 h-10  " />
            </div>
            <div className="flex flex-col  max-[450px]:mt-3 justify-center items-center ">
              <h2 className="text-3xl text-orange-500 font-bold uppercase mb-2">
                +<CountUp start={-875.039} end={100527.012} enableScrollSpy />
                {/* <CountUp duration={4} start={-875.039} end={100527.012} /> */}
              </h2>
              <p className="text-lg text-white">Parcel Booked</p>
            </div>
          </div>
          <div className=" p-2 bg-gray-800   shadow-xl">
            <div className="p-2 justify-center items-center flex">
              <CiDeliveryTruck className="w-10 text-gray-300 h-10  " />
            </div>
            <div className="flex flex-col  max-[450px]:mt-3 justify-center items-center ">
              <h2 className="text-3xl text-orange-500 font-bold uppercase mb-2">
                +<CountUp start={-875.039} end={90527.012} enableScrollSpy />
              </h2>
              <p className="text-lg text-white">Parcel Delivered</p>
            </div>
          </div>
          <div className=" p-2 bg-gray-800   shadow-xl">
            <div className="p-2 justify-center items-center flex">
              <FaUserTie className="w-10 text-gray-300 h-10  " />
            </div>
            <div className="flex flex-col  max-[450px]:mt-3 justify-center items-center ">
              <h2 className="text-3xl text-orange-500 font-bold uppercase mb-2">
                +<CountUp start={-875.039} end={180527.012} enableScrollSpy />
              </h2>
              <p className="text-lg text-white">Total Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
