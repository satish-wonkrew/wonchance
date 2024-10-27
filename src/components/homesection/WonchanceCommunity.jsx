/* eslint-disable @next/next/no-img-element */
"use client";
import { Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Section4() {
  return (
    <div>
      <div className="p-8 w-full flex flex-col justify-center items-center">
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
          slidesPerView={5} // Default for larger screens
          spaceBetween={30} // Adjusted space between slides
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
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]} // Ensure modules are imported correctly
          className="swiper_container"
          breakpoints={{
            // When window width is <= 640px (Mobile)
            640: {
              slidesPerView: 1, // Show 1 slide on mobile
              spaceBetween: 10, // Less space between slides on mobile
            },
            // When window width is <= 768px (Tablet)
            768: {
              slidesPerView: 2, // Show 2 slides on tablet
              spaceBetween: 20, // Adjust space for tablet
            },
            // When window width is <= 1024px (Small Laptop)
            1024: {
              slidesPerView: 3, // Show 3 slides on small laptops
              spaceBetween: 25,
            },
            // For larger screens
            1440: {
              slidesPerView: 4, // Show 4 slides on larger screens
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide>
            <img src="/Img/home/sect2/won1.png" alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/Img/home/sect2/won2.png" alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/Img/home/sect2/won3.png" alt="Slide 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/Img/home/sect2/won4.png" alt="Slide 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/Img/home/sect2/won5.png" alt="Slide 5" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/Img/home/sect2/won6.png" alt="Slide 6" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/Img/home/sect2/won5.png" alt="Slide 7" />
          </SwiperSlide>

          <div className="slider-controller">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Section4;
