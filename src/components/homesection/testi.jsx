"use client";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";

const Testimo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // The content for each testimonial page (slide)
  const pages = [
    {
      text: "2023 Indian Tamil-language psychological thriller film directed by Nawin Ghanesh, starring Srikanth & Vidya Pradeep in lead roles.",
    },
    {
      text: "A captivating drama showcasing the emotional journey of two families facing unexpected challenges.",
    },
    {
      text: "An action-packed adventure through the scenic landscapes of South India, starring well-known local talent.",
    },
  ];

  // Swipe Handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pages.length);
  };

  // Go to the previous slide
  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + pages.length) % pages.length
    );
  };

  // Auto-swipe functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto swipe every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-white  flex flex-col items-center justify-center px-4"
      {...swipeHandlers}
    >
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        From Wonchance to Ad Spotlight!
      </h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
          <Image
            src="/Img/TalentHero.png" // Replace with your image path
            alt="Profile"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
      </div>

      {/* Description Card (swipeable content) */}
      <div className="bg-gray-50 rounded-lg p-6 w-full md:w-2/3 lg:w-1/2 text-center transition-all duration-500 transform">
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          {pages[currentIndex].text}
        </p>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8">
        {pages.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 mx-1 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-black" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>

      {/* Navigation Arrows */}
      {/* <div className="flex justify-between w-full md:w-2/3 lg:w-1/2 mt-6">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-white rounded-full p-2"
          onClick={handlePrevious}
        >
          &#8592;
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-white rounded-full p-2"
          onClick={handleNext}
        >
          &#8594;
        </button>
      </div> */}
    </div>
  );
};

export default Testimo;
