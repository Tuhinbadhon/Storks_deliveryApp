import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./Banner.css";

// import required modules
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";

import img1 from "../../assets/banner1.jpg";
import img2 from "../../assets/banner2.jpg";
import img3 from "../../assets/banner3.jpg";
import img4 from "../../assets/banner4.jpg";
import { FiSearch } from "react-icons/fi";

const Banner = () => {
  return (
    <div className="  mx-auto overflow-auto">
      <Swiper
        autoplay={{
          delay: 5000, // 1000 milliseconds = 1 second
          disableOnInteraction: false,
        }}
        speed={1500}
        effect={"fade"}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Pagination, EffectFade, Autoplay, Navigation]}
        className="mySwiper lg:max-w-full  md:max-w-screen-md sm:max-w-screen-sm  
            "
      >
        <SwiperSlide className="relative">
          <img src={img1} />
          <div className="absolute   h-full flex left-0 top-0 items-center justify-center bg-gradient-to-r from-gray-800  to-[rgba(21,21,21,0)] ">
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="space-y-7 w-8/12  text-center "
            >
              <h2 className="font-bold lg:text-5xl text-white uppercase md:text-2xl ">
                We are <span className="text-orange-500">Experts</span> in
                Global <span className="text-indigo-500">COURIER</span> &
                <span className="text-indigo-500"> DELIVERY</span>
              </h2>
              <p className="max-[450px]:text-xs text-white">
                We have 20 years of experience in the courier industry. Our
                commitment to efficient and reliable service ensures your
                packages are delivered safely and on time. Trust us to handle
                your deliveries with the utmost care and professionalism.{" "}
              </p>
              <form className="md:w-96 mx-auto  ">
                <label className="input   input-bordered flex items-center gap-2">
                  <input type="text" className="grow  " placeholder="Search" />
                  <FiSearch className="" />
                </label>
              </form>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <img src={img2} />
          <div className="absolute   h-full flex left-0 top-0 items-center justify-center bg-gradient-to-r from-gray-800  to-[rgba(21,21,21,0)] ">
            <div className="space-y-7 w-8/12 text-center ">
              <h2 className="font-bold lg:text-5xl text-white  uppercase md:text-2xl ">
                We are <span className="text-orange-500">Experts</span> in
                Global <span className="text-indigo-500">COURIER</span> &
                <span className="text-indigo-500"> DELIVERY</span>
              </h2>
              <p className="max-[450px]:text-xs text-white ">
                We have 20 years of experience in the courier industry. Our
                commitment to efficient and reliable service ensures your
                packages are delivered safely and on time. Trust us to handle
                your deliveries with the utmost care and professionalism.
              </p>
              <div className="md:w-96 mx-auto ">
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow  " placeholder="Search" />
                  <FiSearch className="" />
                </label>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <img src={img3} />
          <div className="absolute   h-full flex left-0 top-0 items-center justify-center bg-gradient-to-r from-gray-800  to-[rgba(21,21,21,0)] ">
            <div className="space-y-7 w-8/12 text-center ">
              <h2 className="font-bold text-white lg:text-5xl uppercase md:text-2xl ">
                We are <span className="text-orange-500">Experts</span> in
                Global <span className="text-indigo-500">COURIER</span> &
                <span className="text-indigo-500"> DELIVERY</span>
              </h2>
              <p className="max-[450px]:text-xs text-white">
                We have 20 years of experience in the courier industry. Our
                commitment to efficient and reliable service ensures your
                packages are delivered safely and on time. Trust us to handle
                your deliveries with the utmost care and professionalism.{" "}
              </p>
              <div className="md:w-96 mx-auto ">
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow  " placeholder="Search" />
                  <FiSearch className="" />
                </label>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <img src={img4} />
          <div className="absolute   h-full flex left-0 top-0 items-center justify-center bg-gradient-to-r from-gray-800  to-[rgba(21,21,21,0)] ">
            <div className="space-y-7 w-8/12  text-center ">
              <h2 className="font-bold lg:text-5xl text-white uppercase md:text-3xl ">
                We are <span className="text-orange-500">Experts</span> in
                Global <span className="text-indigo-500">COURIER</span> &
                <span className="text-indigo-500"> DELIVERY</span>
              </h2>
              <p className="max-[450px]:text-xs text-white">
                We have 20 years of experience in the courier industry. Our
                commitment to efficient and reliable service ensures your
                packages are delivered safely and on time. Trust us to handle
                your deliveries with the utmost care and professionalism.{" "}
              </p>
              <div className="md:w-96 mx-auto ">
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow  " placeholder="Search" />
                  <FiSearch className="" />
                </label>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
