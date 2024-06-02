import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Banner.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

import img1 from "../../assets/banner1.jpg";
import img2 from "../../assets/banner2.jpg";
import img3 from "../../assets/banner3.jpg";
import img4 from "../../assets/banner4.jpg";

const Banner = () => {
  return (
    <div className=" overflow-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper lg:max-w-full  md:max-w-screen-md sm:max-w-screen-sm  
            "
      >
        <SwiperSlide>
          <img src={img1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
