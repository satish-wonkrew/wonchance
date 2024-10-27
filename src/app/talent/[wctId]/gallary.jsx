import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const Gallery = ({ profile }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const handleItemClick = (item) => {
    setIsVideo(item.type === "video");
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsVideo(false);
  };

  const photosWithBaseUrl = profile.galleryDetails?.photos?.map((photo) => `${photo.replace(/\\/g, "/")}`) || [];
  const items = [
    ...(photosWithBaseUrl.map((src) => ({ src, type: "image" })) || []),
    ...(profile?.galleryDetails?.videos?.map((src) => ({ src, type: "video" })) || []),
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
        grabCursor={true}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="w-full"
        modules={[Navigation, Pagination]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleItemClick(item)}
              className="relative w-full max-w-xs bg-white rounded-lg shadow-lg cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.type === "video" ? "Video thumbnail" : "Image"}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-200 rounded-lg"
                style={{ maxHeight: "200px" }}
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <svg className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-8.707l-4-2A1 1 0 008 8v4a1 1 0 001.5.866l4-2A1 1 0 0013 9.293z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={closeModal}>
          <div className="relative w-11/12 max-w-3xl mx-auto bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {isVideo ? (
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  src={selectedItem.src}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                  className="absolute inset-0 w-full h-full rounded-lg"
                />
              </div>
            ) : (
              <img
                src={selectedItem.src}
                alt="Selected"
                className="w-full h-auto rounded-lg object-contain max-w-4xl max-h-[80vh]"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
