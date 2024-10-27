/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


const RoleCarousel = ({ roles }) => {
  
  return (
    <div className="py-10 px-5 md:px-20">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Recommend Same Role
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="w-full"
        modules={[Navigation, Pagination]}
      >
        {roles?.map((role, index) => (
          <SwiperSlide key={index}>
            <div className="p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={role?.image}
                alt={role?.title} // Changed from role?.name to role?.title
                className="rounded-t-lg w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-center text-gray-800">
                  {role?.title} //Changed from role?.name to role?.title
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RoleCarousel;
