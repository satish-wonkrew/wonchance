/* eslint-disable @next/next/no-img-element */
"use client";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

function Section4() {
  const images = [
    { src: "won1.png", title: "KAITY", subtitle: "Lead Role" },
    { src: "won2.png", title: "OAKES", subtitle: "Supporting Actor" },
    { src: "won3.png", title: "ADAM", subtitle: "Director" },
    { src: "won4.png", title: "MIKE", subtitle: "Producer" },
    { src: "won5.png", title: "MIA", subtitle: "Cinematographer" },
    { src: "won6.png", title: "DANIEL", subtitle: "Editor" },
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="p-10 w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            The Wonchance Community
          </h1>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Wonchance partners with renowned production houses for exceptional
            collaborations.
          </p>
        </div>
      </div>
      <div className="containers">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1} // Show only one slide on mobile
          spaceBetween={10} // Adjusted space for mobile
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination]} // Removed Navigation module
          className="swiper_container"
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 }, // 1 card for mobile
            768: { slidesPerView: 2, spaceBetween: 20 }, // 2 cards for small tablets
            1024: { slidesPerView: 3, spaceBetween: 25 }, // 3 cards for larger tablets
            1440: { slidesPerView: 4, spaceBetween: 30 }, // 4 cards for small desktops
            1920: { slidesPerView: 5, spaceBetween: 30 }, // 5 cards for larger desktops
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="card">
                <img
                  src={`/Img/home/sect2/${image.src}`}
                  alt={image.title}
                  className="card-image"
                />
                <img
                  src='/Img/home/youtube-logo.png' // YouTube logo image
                  alt="YouTube Logo"
                  className="youtube-logo" // Class for styling the logo
                />
                <h3 className="card-title">{image.title}</h3>
                <p className="card-subtitle">{image.subtitle}</p>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>

      <style jsx>{`
        .card {
          position: relative; /* Enable absolute positioning for children */
          background: white; /* Card background */
          border-radius: 10px; /* Rounded corners */
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
          overflow: hidden; /* Prevent overflow of children */
          transition: transform 0.3s ease; /* Card transition */
          text-align: left; /* Align text to the left */
          width: 100%; /* Make the card responsive */
          max-width: 400px; /* Set a maximum width */
          height: 500px; /* Increase card height */
        }

        .card-image {
          width: 100%; /* Make image fill the card */
          height: 100%; /* Set image height to fill the card */
          object-fit: cover; /* Cover the card area */
        }

        .youtube-logo {
          position: absolute; /* Position the logo over the image */
          top: 50%; /* Center vertically */
          left: 50%; /* Center horizontally */
          transform: translate(-50%, -50%); /* Adjust position to center */
          width: 80px; /* Set the size of the logo */
          height: auto; /* Maintain aspect ratio */
          z-index: 1; /* Ensure it's above other content */
        }

        .card-title {
          position: absolute; /* Position the title over the image */
          bottom: 10%; /* Distance from the bottom of the card */
          left: 10px; /* Distance from the left of the card */
          padding: 0.5rem; /* Padding around the title */
          font-weight: bold; /* Bold title */
          color: white; /* Dark text color for contrast */
          font-size: 2.5rem; /* Increased font size */
          border-radius: 10px; /* Set border radius to 10px */
        }

        .card-subtitle {
          position: absolute; /* Position the subtitle over the image */
          bottom: 5%; /* Distance from the bottom of the card */
          left: 10px; /* Distance from the left of the card */
          padding: 0.25rem; /* Padding around the subtitle */
          color: white; /* Dark text color for contrast */
          font-size: 1.5rem; /* Font size for the subtitle */ 
          border-radius: 10px; /* Set border radius to 10px */
        }

        /* Mobile styles */
        @media (max-width: 640px) {
          .card {
            max-width: none; /* Remove max width for full width on mobile */
          }
        }
      `}</style>
    </div>
  );
}

export default Section4;
