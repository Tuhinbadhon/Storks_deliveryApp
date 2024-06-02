import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "./Banner.css";

// import required modules
import { Pagination, Navigation, EffectFade } from "swiper/modules";

import img1 from "../../assets/banner1.jpg";
import img2 from "../../assets/banner2.jpg";
import img3 from "../../assets/banner3.jpg";
import img4 from "../../assets/banner4.jpg";

const Banner = () => {
  return (
    <div>
      <div className="  overflow-auto">
        <Swiper
          speed={1500}
          effect={"fade"}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, EffectFade, Navigation]}
          className="mySwiper lg:max-w-full  md:max-w-screen-md sm:max-w-screen-sm  
            "
        >
          <SwiperSlide className="relative">
            <img src={img1} />
            <div className="absolute   h-full flex left-0 top-0 items-center justify-center bg-gradient-to-r from-gray-800  to-[rgba(21,21,21,0)] max-[450px]:hidden">
              <div className="space-y-7 w-1/2 text-white text-center ">
                <h2 className="font-bold lg:text-5xl md:text-2xl ">
                  Your Child is Our Asset
                </h2>
                <p>
                  We have 20 years Experience on this profession.it is pleasure
                  but because those who do not know how to pursue pleasure
                  rationally encounter consequences that are extremley painfull{" "}
                </p>
                <div className="">
                  <button className="btn btn-primary mr-5">
                    CONTACT US TODAY
                  </button>
                  <button className="btn btn-outline btn-secondary">
                    ENROL NOW
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <img src={img2} />
            <div className="absolute   h-full flex left-0 top-0 items-center justify-center bg-gradient-to-r from-gray-800 to-[rgba(21,21,21,0)] max-[450px]:hidden">
              <div className="space-y-7 w-1/2 text-white text-center ">
                <h2 className="font-bold lg:text-5xl md:text-2xl ">
                  Your Child is Our Asset
                </h2>
                <p>
                  We have 20 years Experience on this profession.it is pleasure
                  but because those who do not know how to pursue pleasure
                  rationally encounter consequences that are extremley painfull{" "}
                </p>
                <div className="">
                  <button className="btn btn-primary mr-5">
                    CONTACT US TODAY
                  </button>
                  <button className="btn btn-outline btn-secondary">
                    ENROL NOW
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <img src={img3} />
            <div className="absolute   h-full flex left-0 top-0 items-center justify-center bg-gradient-to-r from-gray-800 to-[rgba(21,21,21,0)] max-[450px]:hidden">
              <div className="space-y-7 w-1/2 text-white text-center ">
                <h2 className="font-bold lg:text-5xl md:text-2xl ">
                  Your Child is Our Asset
                </h2>
                <p>
                  We have 20 years Experience on this profession.it is pleasure
                  but because those who do not know how to pursue pleasure
                  rationally encounter consequences that are extremley painfull{" "}
                </p>
                <div className="">
                  <button className="btn btn-primary mr-5">
                    CONTACT US TODAY
                  </button>
                  <button className="btn btn-outline btn-secondary">
                    ENROL NOW
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <img src={img4} />
            <div className="absolute   h-full flex left-0 top-0 items-center justify-center bg-gradient-to-r from-gray-800 to-[rgba(21,21,21,0)] max-[450px]:hidden">
              <div className="space-y-7 w-1/2 text-white text-center ">
                <h2 className="font-bold lg:text-5xl md:text-2xl ">
                  Your Child is Our Asset
                </h2>
                <p>
                  We have 20 years Experience on this profession.it is pleasure
                  but because those who do not know how to pursue pleasure
                  rationally encounter consequences that are extremley painfull{" "}
                </p>
                <div className="">
                  <button className="btn btn-primary mr-5">
                    CONTACT US TODAY
                  </button>
                  <button className="btn btn-outline btn-secondary">
                    ENROL NOW
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
