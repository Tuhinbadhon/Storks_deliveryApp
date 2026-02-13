import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Banner.css";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import img1 from "../../assets/banner1.jpg";
import img2 from "../../assets/banner2.jpg";
import img3 from "../../assets/banner3.jpg";
import img4 from "../../assets/banner4.jpg";

const slides = [
  { img: img1, alt: "courier delivery 1" },
  { img: img2, alt: "courier delivery 2" },
  { img: img3, alt: "courier delivery 3" },
  { img: img4, alt: "courier delivery 4" },
];

const Banner = () => {
  return (
    <div className="mx-auto max-w-screen-xl overflow-hidden">
      <Swiper
        autoplay={{
          delay: 5000,
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
        className="mySwiper w-full"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx} className="relative">
            <img
              src={s.img}
              alt={s.alt}
              loading="lazy"
              className="w-full h-[520px] object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-gray-800/80 to-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="space-y-6 max-w-4xl w-full px-4 text-center text-white"
              >
                <motion.h2
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.05 + idx * 0.05 }}
                  className="font-bold text-3xl sm:text-4xl md:text-5xl uppercase"
                >
                  We are <span className="text-orange-500">Experts</span> in
                  Global <span className="text-indigo-500">COURIER</span> &
                  <span className="text-indigo-500"> DELIVERY</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.12 + idx * 0.05 }}
                  className="text-sm sm:text-base max-w-3xl mx-auto"
                >
                  We have 20 years of experience in the courier industry. Our
                  commitment to efficient and reliable service ensures your
                  packages are delivered safely and on time.
                </motion.p>

                <motion.form
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="max-w-md mx-auto"
                >
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="search"
                      aria-label="Search deliveries"
                      className="grow bg-transparent placeholder-gray-200"
                      placeholder="Search"
                    />
                    <FiSearch className="text-white" />
                  </label>
                </motion.form>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
