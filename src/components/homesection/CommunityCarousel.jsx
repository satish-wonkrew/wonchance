/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // Only for Next.js 13. Use if required

import { useEffect, useState } from "react";
import "./style.css";

const ExpandingCards = () => {
  const [activeId, setActiveId] = useState();
  const [isHovered, setIsHovered] = useState(false);

  // Images array with id and url
  const images = [
    { id: 1, url: "/Img/home/sect2/won1.png", title: "Card 1" },
    { id: 2, url: "/Img/home/sect2/won2.png", title: "Card 2" },
    { id: 3, url: "/Img/home/sect2/won3.png", title: "Card 3" },
    { id: 4, url: "/Img/home/sect2/won4.png", title: "Card 4" },
    { id: 5, url: "/Img/home/sect2/won5.png", title: "Card 5" },
    { id: 6, url: "/Img/home/sect2/won6.png", title: "Card 6" },
    { id: 7, url: "/Img/home/sect2/2.png", title: "Card 7" },
  ];

  // Set active card on click
  const onClick = (id) => setActiveId(id);

  // Navigate to the next card
  const nextCard = () => {
    setActiveId((prevId) => (prevId < images.length ? prevId + 1 : 1));
  };

  // Navigate to the previous card
  const prevCard = () => {
    setActiveId((prevId) => (prevId > 1 ? prevId - 1 : images.length));
  };

  useEffect(() => {
    // Auto-slide every 3 seconds if not hovered
    const interval = setInterval(() => {
      if (!isHovered) {
        nextCard();
      }
    }, 3000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10 px-5 md:px-10 lg:px-20 w-full max-w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            The Wonchance Community
          </h1>
          <p className="text-black-500 mt-4 max-w-md mx-auto">
            Wonchance partners with renowned production houses for exceptional
            collaborations.
          </p>
        </div>
        <div className="relative flex justify-center items-center space-x-4">
          <div className="flex overflow-hidden space-x-4">
            {images.slice(0, 6).map((card) => (
              <div
                key={card.id}
                className={`panel ${activeId === card.id ? "active" : ""} transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg rounded-2xl overflow-hidden`}
                onClick={() => onClick(card.id)}
                onMouseEnter={() => {
                  setActiveId(card.id);
                  setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  backgroundImage: `url(${card.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "200px",
                  height: "350px",
                }}
              >
                {/* Uncomment to display titles if needed */}
                {/* <h3 className="text-lg font-semibold text-white absolute bottom-5 left-5">
                  {card.title}
                </h3> */}
              </div>
            ))}
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-end mt-8 px-10">
          <button
            onClick={prevCard}
            className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center mr-5 transition-transform duration-200 hover:bg-gray-700 hover:scale-110"
          >
            &lt; {/* Left arrow */}
          </button>
          <button
            onClick={nextCard}
            className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 hover:bg-gray-700 hover:scale-110"
          >
            &gt; {/* Right arrow */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpandingCards;
