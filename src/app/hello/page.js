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
    <div className="min-h-screen bg-gray-200 relative">
      <div className="p-10 w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            The Wonchance Community
          </h1>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Wonchance partners with renowned production houses for exceptional collaborations.
          </p>
        </div>
      </div>
      <div className="containers">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={10}
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
          modules={[EffectCoverflow, Pagination]}
          className="swiper_container"
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 25 },
            1440: { slidesPerView: 4, spaceBetween: 30 },
            1920: { slidesPerView: 5, spaceBetween: 30 },
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
                  src='/Img/home/youtube-logo.png'
                  alt="YouTube Logo"
                  className="youtube-logo"
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
          position: relative;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: left;
          max-width: 400px;
          height: 500px;
        }

        .card:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }

        .youtube-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: auto;
          z-index: 1;
        }

        .card-title {
          position: absolute;
          bottom: 15%;
          left: 10px;
          padding: 0.5rem;
          font-weight: bold;
          color: white;
          font-size: 2rem;
          border-radius: 10px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }

        .card-subtitle {
          position: absolute;
          bottom: 5%;
          left: 10px;
          padding: 0.25rem;
          color: white;
          font-size: 1.2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }

        /* Mobile styles */
        @media (max-width: 640px) {
          .card {
            max-width: none;
            height: auto; /* Allow card height to adjust based on content */
          }

          .card-title {
            font-size: 1.5rem; /* Adjust font size for mobile */
          }

          .card-subtitle {
            font-size: 1rem; /* Adjust font size for mobile */
          }
        }
      `}</style>
    </div>
  );
}

export default Section4;
