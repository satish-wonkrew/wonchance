/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { useUser } from "@/hooks/useUser"; // Adjust the path as necessary
import { IMAGE_API_END_POINT } from "@/utils/constant";

const Gallery = () => {
  const { user } = useUser();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const handleItemClick = (item) => {
    if (item.type === "video") {
      setIsVideo(true);
    }
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsVideo(false);
  };
  const photosWithBaseUrl =
    user?.galleryDetails?.photos?.map((photo) => {
      return `${photo.replace(/\\/g, "/")}`; // Convert to valid URL format
    }) || [];
  // Combine photos and videos into a single array with type information
  const items = [
    ...(user?.galleryDetails?.photos?.map((src) => ({ src, type: "image" })) ||
      []),
    ...(user?.galleryDetails?.videos?.map((src) => ({ src, type: "video" })) ||
      []),
  ];

  console.log("====================================");
  console.log(photosWithBaseUrl);
  console.log("====================================");
  return (
    <div className="py-10 px-5 md:px-20">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Image & Video Gallery
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        centeredSlides={true}
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
            slidesPerView: 5,
          },
        }}
        className="w-full"
        modules={[Navigation, Pagination]}
      >
        {photosWithBaseUrl.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleItemClick(item)}
              className="relative w-full max-w-xs bg-white rounded-lg shadow-lg cursor-pointer"
            >
              <div className="h-52 max-w-full overflow-hidden rounded-md">
                <img
                  src={item}
                  alt={item.type === "video" ? "Video thumbnail" : "Image"}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-200"
                  style={{
                    maxHeight: "200px",
                    maxWidth: "100%",
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 pointer-events-none"></div>

                {/* Prevent Right Click */}
                <div
                  className="absolute inset-0 pointer-events-auto"
                  onContextMenu={(e) => e.preventDefault()}
                ></div>
              </div>

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-8.707l-4-2A1 1 0 008 8v4a1 1 0 001.5.866l4-2A1 1 0 0013 9.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-11/12 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {isVideo ? (
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  src={selectedItem}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                  className="absolute inset-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            ) : (
              <img
                src={selectedItem}
                alt="Selected"
                className="w-full h-auto rounded-lg"
                style={{ maxWidth: "800px", maxHeight: "600px" }} // Restrict modal image size
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
