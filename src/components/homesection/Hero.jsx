"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const user = useUser();

  return (
    <div>
      <section className="h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background image for mobile/tablet */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:hidden"
          style={{
            backgroundImage: 'url("/Img/home/mobilehome.png")', // Image for mobile/tablet
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Background image for desktop */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block"
          style={{
            backgroundImage: 'url("/Img/home/home.png")', // Image for desktop/web
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Overlaying content */}
        <div className="relative flex items-center justify-start w-full h-full z-10 px-4 sm:px-6 lg:px-10">
          <div className="text-white text-center md:text-left max-w-2xl lg:max-w-4xl">
            <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold mb-4 leading-tight">
              ONE CHANCE ONE LIFE
              <br />
              TRANSFORMED!
            </h1>
            {/* Show login button if user is not logged in */}
            {!user?.user && (
              <Link
                href="/auth"
                className="mt-4 px-6 py-2 text-lg border border-white rounded-lg hover:bg-white hover:text-black transition duration-300 inline-block"
              >
                Explore Now
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-white" id="sec-2">
        <main className="py-10 px-5 md:px-10 lg:px-20 w-full max-w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
            The Wonchance Community
          </h1>
          <p className="text-center text-lg mb-12">
            Wonchance partners with renowned production houses for exceptional
            collaborations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Side: Talent, Crew, Partners, Events */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col p-4 bg-gray-100 shadow-md rounded-lg ">
                <div className="flex gap-3">
                  <span className="p-2 rounded-full ">
                    <Image
                      src="/Img/home/talent.png"
                      alt="Talent"
                      width={100}
                      height={40}
                    />
                  </span>
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-3xl mb-2">Talent</h2>
                    <p className="text-justify">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since a type specimen book.
                    </p>
                  </div>
                </div>
              </div>

              {/* Repeat the above card for other sections */}
              <div className="flex flex-col p-4 bg-gray-100 shadow-md rounded-lg ">
                <div className="flex gap-3">
                  <span className="p-2 rounded-full  ">
                    <Image
                      src="/Img/home/crew.png"
                      alt="Talent"
                      width={100}
                      height={40}
                    />
                  </span>
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-3xl mb-2">Crew</h2>
                    <p className="text-justify">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since a type specimen book.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4 bg-gray-100 shadow-md rounded-lg  ">
                <div className="flex gap-3">
                  <span className="p-2 rounded-full  ">
                    <Image
                      src="/Img/home/partners.png"
                      alt="Talent"
                      width={100}
                      height={40}
                    />
                  </span>
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-3xl mb-2">Partners</h2>
                    <p className="text-justify">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since a type specimen book.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4 bg-gray-100 shadow-md rounded-lg ">
                <div className="flex gap-3">
                  <span className="p-2 rounded-full ">
                    <Image
                      src="/Img/home/events.png"
                      alt="Talent"
                      width={70}
                      height={40}
                    />
                  </span>
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-3xl mb-2">Events</h2>
                    <p className="text-justify">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since a type specimen book.
                    </p>
                  </div>
                </div>
              </div>

              {/* Add more cards as needed */}
            </div>

            {/* Right Side: Circular Image Layout */}
            <div className="relative flex justify-center items-center h-[300px] md:h-[500px] w-full">
              <Image
                src="/Img/home/Ellipse 175.png"
                className="absolute rounded-full object-cover bubble-animation"
                alt="Cinema"
                width={160}
                height={160}
                style={{
                  top: "10%",
                  left: "10%",
                  width: "30%",
                }}
              />
              <Image
                src="/Img/home/Ellipse 176.png"
                className="absolute rounded-full object-cover bubble-animation"
                alt="Film"
                width={90}
                height={90}
                style={{
                  top: "10%",
                  left: "45%",
                  width: "15%",
                }}
              />
              <Image
                src="/Img/home/Ellipse 173.png"
                className="absolute rounded-full object-cover bubble-animation"
                alt="Recording"
                width={90}
                height={90}
                style={{
                  top: "55%",
                  left: "13%",
                  width: "25%",
                }}
              />
              <Image
                src="/Img/home/Ellipse 171.png"
                className="absolute rounded-full object-cover bubble-animation"
                alt="Music"
                width={90}
                height={90}
                style={{
                  top: "35%",
                  left: "45%",
                  width: "45%",
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Hero;
