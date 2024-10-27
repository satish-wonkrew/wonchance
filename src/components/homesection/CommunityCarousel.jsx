/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // Only for Next.js 13. Use if required

import { useEffect, useState } from "react";
import "./style.css";

const ExpandingCards = () => {
  const [activeId, setActiveId] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Your images array with id and url
  const images = [
    { id: 1, url: "/Img/home/sect2/won1.png", title: "Card 1" },
    { id: 2, url: "/Img/home/sect2/won2.png", title: "Card 2" },
    { id: 3, url: "/Img/home/sect2/won3.png", title: "Card 3" },
    { id: 4, url: "/Img/home/sect2/won4.png", title: "Card 4" },
    { id: 5, url: "/Img/home/sect2/won5.png", title: "Card 5" },
    { id: 6, url: "/Img/home/sect2/won6.png", title: "Card 6" },
    { id: 7, url: "/Img/home/sect2/2.png", title: "Card 7" },
  ];

  // Function to handle click and set active card
  const onClick = (id) => setActiveId(id);

  // Function to navigate to the next card
  const nextCard = () => {
    setActiveId((prevId) => (prevId < images.length ? prevId + 1 : 1));
  };

  // Function to navigate to the previous card
  const prevCard = () => {
    setActiveId((prevId) => (prevId > 1 ? prevId - 1 : images.length));
  };

  useEffect(() => {
    // Set an interval for automatic sliding
    const interval = setInterval(() => {
      if (!isHovered) {
        nextCard();
      }
    }, 3000); // Change slide every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [isHovered, images.length]); // Dependency to re-run if the number of cards changes

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mt-4">The Wonchance Community</h1>
        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          Wonchance partners with renowned production houses for exceptional collaborations.
        </p>
      </div>
      <div className="relative container flex justify-center items-center">
        <button
          onClick={prevCard}
          className="carousel-button left absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition hover:bg-gray-200"
        >
          &#10094; {/* Left arrow */}
        </button>
        <div className="flex overflow-hidden">
          {images.slice(0, 3).map((card) => ( // Show only the first 3 images
            <div
              key={card.id}
              className={`panel ${
                activeId === card.id ? "active" : ""
              } transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg rounded-lg overflow-hidden m-2`}
              onClick={() => onClick(card.id)}
              style={{
                backgroundImage: `url(${card.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "195px", // Fixed width for the card
                height: "328px", // Fixed height for the card
              }}
              onMouseEnter={() => setIsHovered(true)} // Pause auto-slide on hover
              onMouseLeave={() => setIsHovered(false)} // Resume auto-slide on mouse leave
            >
              <h3 className="text-lg font-semibold text-white absolute bottom-5 left-5">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
        <button
          onClick={nextCard}
          className="carousel-button right absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition hover:bg-gray-200"
        >
          &#10095; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
};

export default ExpandingCards;
