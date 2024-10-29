/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import Image from "next/image";

const Gallery = ({ profile }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // Safeguard against null values
  const photosWithBaseUrl = Array.isArray(profile.galleryDetails?.photos)
    ? profile.galleryDetails.photos.map((photo) => photo?.replace(/\\/g, "/"))
    : [];

  const items = [
    ...(photosWithBaseUrl.map((src) => ({ src, type: "image" })) || []),
    ...(Array.isArray(profile.galleryDetails?.videos)
      ? profile.galleryDetails.videos.map((src) => {
          const thumbnail = `${src.replace("videos", "Img/Logo")}.png`;
          return {
            src,
            type: "video",
            thumbnail: thumbnail.startsWith("/") ? thumbnail : `/${thumbnail}`, // Ensure leading slash
            defaultThumbnail: "/Img/Logo.png", // Path to default thumbnail
          };
        })
      : []),
  ];

  return (
    <div className="py-10 px-5 md:px-20">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Gallery
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full"
        modules={[Navigation, Pagination]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleItemClick(item)}
              className="relative w-full max-w-xs bg-white rounded-xl shadow-lg cursor-pointer overflow-hidden"
            >
              {item.type === "video" ? (
                <div className="relative">
                  <Image
                    src={item.defaultThumbnail} // Use default thumbnail if none exists
                    width={400}
                    height={300}
                    alt="Video thumbnail"
                    style={
                      item.thumbnail
                        ? { objectFit: "contain" }
                        : { objectFit: "contain" } // Fallback to contain if no thumbnail exists
                    }
                    className="absolute inset-0 m-auto h-full w-full object-cover opacity-90" // Changed to object-cover for better scaling
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/play.png" // Path to your play button image
                      alt="Play"
                      width={60} // Adjust width as necessary
                      height={60} // Adjust height as necessary
                      style={
                        item.thumbnail
                          ? { objectFit: "contain" }
                          : { objectFit: "contain" } // Fallback to contain if no thumbnail exists
                      }
                      className="opacity-100 hover:opacity-100 transition-opacity duration-300" // Ensure visibility
                    />
                  </div>
                  <Image
                    src={item.src}
                    alt="Video thumbnail"
                    loading="lazy"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              ) : (
                <Image
                  src={item.src}
                  alt="Image"
                  loading="lazy"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl"
                />
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeModal}
        >
          <div
            className="relative w-11/12 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            >
              <svg
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
            {selectedItem.type === "video" ? (
              <iframe
                src={selectedItem.src}
                className="w-full h-auto rounded-lg"
                style={{
                  aspectRatio: "16/9",
                  maxWidth: "800px",
                  maxHeight: "600px",
                  pointerEvents: "none",
                }} // Adjust aspect ratio
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              ></iframe>
            ) : (
              <img
                src={selectedItem.src}
                alt="Selected"
                className="w-full h-auto rounded-lg object-contain"
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
