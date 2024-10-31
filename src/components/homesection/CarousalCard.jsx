/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";

export default function CastingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const castingCalls = [
    {
      name: "Casting Call 1",
      description: "Sun Tv Serial",
      image: "/Img/home/sect2/2.png",
    },
    {
      name: "Casting Call 2",
      description: "Sun Tv Serial",
      image: "/Img/home/sect2/won3.png",
    },
    {
      name: "Casting Call 3",
      description: "Sun Tv Serial",
      image: "/Img/home/sect2/won1.png",
    },
    {
      name: "Casting Call 4",
      description: "Sun Tv Serial",
      image: "/Img/home/sect2/won1.png",
    },
    {
      name: "Casting Call 5",
      description: "Sun Tv Serial",
      image: "/Img/home/sect2/won1.png",
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? castingCalls.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= castingCalls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getDisplayedImages = () => {
    const displayCount = window.innerWidth < 768 ? 1 : 3; // 1 image for mobile, 3 for web
    return castingCalls
      .slice(currentIndex, currentIndex + displayCount)
      .map((call, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-full sm:w-64 bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={call.image}
            alt={call.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{call.name}</h3>
            <p className="text-gray-500">{call.description}</p>
          </div>
        </div>
      ));
  };

  return (
    <div className="flex-1 min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-10 text-center">
        From Wonchance to Ad Spotlight!
      </h1>
      <div className="flex-1 p-8 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-60 bg-slate-200 shadow-lg rounded-lg p-4 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold mt-1">Casting Calls</h2>
          <ul>
            <li className="flex items-center space-x-2 mb-2">
              <span role="img" aria-label="icon">
                🎥
              </span>
              <button className="bg-black text-white rounded-lg w-full p-2 text-left">
                Casting Call's
              </button>
            </li>
            <li className="flex items-center space-x-2">
              <span role="img" aria-label="icon">
                🎥
              </span>
              <button className="text-gray-700 w-full p-2 text-left">
                Profiles List's
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="relative flex justify-center items-center">
            <div className="flex items-center">
              <button
                onClick={prevSlide}
                className="p-2 bg-white rounded-full shadow-lg text-black mr-2"
              >
                ❮
              </button>
              <div className="flex space-x-4 overflow-hidden">
                {getDisplayedImages()}{" "}
                {/* Display images based on screen size */}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 bg-white rounded-full shadow-lg text-black ml-2"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
