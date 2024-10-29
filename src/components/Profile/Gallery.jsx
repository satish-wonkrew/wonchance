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
import Image from "next/image";

const Gallery = () => {
  const { user } = useUser();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item.src); // Set the src for selected item
    setIsVideo(item.type === "video");
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
              onClick={() => handleItemClick({ src: item, type: "image" })} // Pass type as image
              className="relative w-full max-w-xs bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden"
            >
              <div className="relative h-80 max-w-full overflow-hidden rounded-md">
                <Image
                  src={item}
                  alt="Gallery item"
                  loading="lazy"
                  width={600}
                  height={400} // Set the height of the image
                  style={{
                    maxHeight: "300px",
                    maxWidth: "100%", // Ensure the image doesn't exceed its container width
                    objectFit: "cover", // Ensure the image covers the entire container
                  }}
                  className="w-full h-full object-fill transition-transform duration-200"
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
        {user?.galleryDetails?.videos?.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleItemClick({ src: item, type: "video" })} // Pass type as video
              className="relative w-full max-w-xs bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden"
            >
              <div className="relative h-80 max-w-full overflow-hidden rounded-md">
                <img
                  src={"/Img/Logo.png"} // Thumbnail from YouTube
                  alt="Video thumbnail"
                  loading="lazy"
                  style={{
                    maxHeight: "300px",
                    maxWidth: "100%", // Ensure the image doesn't exceed its container width
                    objectFit: "cover", // Ensure the image covers the entire container
                  }}
                  className="w-full h-full object-cover transition-transform duration-200"
                />
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
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-11/12 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-800 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
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
                  style={{ pointerEvents: "none" }} // Prevents video download
                ></iframe>
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-800 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
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
              </div>
            ) : (
              <img
                src={selectedItem}
                alt="Selected"
                className="w-full h-auto rounded-lg"
                style={{
                  maxWidth: "800px",
                  maxHeight: "600px",
                  objectFit: "contain", // Maintains aspect ratio
                  display: "block", // Prevents space below
                  margin: "0 auto", // Center the image
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
