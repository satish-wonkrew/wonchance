/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import Head from "next/head";
import "@splidejs/splide/dist/css/splide.min.css"; // Import local CSS

const VideoCarousel = () => {
  useEffect(() => {
    const Splide = require("@splidejs/splide").default;
    new Splide("#video-carousel", {
      type: "loop",
      perPage: 3, // Show 3 videos per page on desktop
      gap: "1rem",
      arrows: true,
      pagination: false,
      breakpoints: {
        1024: {
          perPage: 2, // Show 2 videos per page on tablet
        },
        640: {
          perPage: 1, // Show 1 video per page on mobile
        },
      },
    }).mount();
  }, []);

  const videos = [
    {
      id: "kluTWEGvixI",
      title: "Video 1 Title",
      description: "Description for Video 1",
    },
    {
      id: "eYq7Wapu1I4",
      title: "Video 2 Title",
      description: "Description for Video 2",
    },
    {
      id: "3JZ_D3ELwOQ",
      title: "Video 3 Title",
      description: "Description for Video 3",
    },
    {
      id: "L_jWHfFzCGA",
      title: "Video 4 Title",
      description: "Description for Video 4",
    },
    {
      id: "hY7m5jjJ9mI",
      title: "Video 5 Title",
      description: "Description for Video 5",
    },
  ];

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          YouTube Video Carousel
        </h2>
        <div
          id="video-carousel"
          className="splide"
          aria-label="YouTube Video Carousel"
        >
          <div className="splide__track">
            <ul className="splide__list">
              {videos.map((video) => (
                <li key={video.id} className="splide__slide">
                  <div className="rounded-lg overflow-hidden shadow-lg bg-white">
                    <div className="relative">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <img
                          src="https://cdn.iconscout.com/icon/free/png-256/youtube-86-226404.png"
                          className="w-16 h-16"
                          alt="Play Button"
                        />
                      </a>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-center">
                        {video.title}
                      </h3>
                      <p className="text-center text-gray-600">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoCarousel;