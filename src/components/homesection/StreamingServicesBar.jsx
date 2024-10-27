/* eslint-disable @next/next/no-img-element */
import React from "react";

const StreamingServicesBar = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full sm:w-5/6">
        <div className="bg-black p-4 rounded-lg">
          {/* Container with responsive logos */}
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 lg:space-x-8">
            {/* Prime Video Logo */}
            <div className="flex items-center m-2">
              <img
                src="/Img/home/sect/prime.png"
                alt="Prime Video"
                className="h-10 sm:h-12 lg:h-16"
              />
            </div>

            {/* Netflix Logo */}
            <div className="flex items-center m-2">
              <img
                src="/Img/home/sect/netflix.png"
                alt="Netflix"
                className="h-10 sm:h-12 lg:h-16"
              />
            </div>

            {/* Additional Logos */}
            <div className="flex items-center m-2">
              <img
                src="/Img/home/sect/prime.png"
                alt="Prime Video"
                className="h-10 sm:h-12 lg:h-16"
              />
            </div>

            <div className="flex items-center m-2">
              <img
                src="/Img/home/sect/netflix.png"
                alt="Netflix"
                className="h-10 sm:h-12 lg:h-16"
              />
            </div>

            <div className="flex items-center m-2">
              <img
                src="/Img/home/sect/prime.png"
                alt="Prime Video"
                className="h-10 sm:h-12 lg:h-16"
              />
            </div>

            <div className="flex items-center m-2">
              <img
                src="/Img/home/sect/netflix.png"
                alt="Netflix"
                className="h-10 sm:h-12 lg:h-16"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingServicesBar;
