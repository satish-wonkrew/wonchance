/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Correct import for React components
import { Navigation, Pagination } from "swiper/modules"; // Import Swiper modules from 'swiper/modules'
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchApprovedUsers } from "@/redux/slices/talentSlice";
import { IMAGE_API_END_POINT } from "@/utils/constant";
import { useRouter } from "next/navigation";

const RelatRole = ({ profile }) => {
  const dispatch = useDispatch();
  const {
    users: talents, // Fetched talents from the backend
    status: loadingStatus,
    error,
  } = useSelector((state) => state.talent);
  const router = useRouter();
  // Helper function to calculate age based on dateOfBirth
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970); // Subtract 1970 to get the correct age
  };

  // Extract userAge and userGender from profile
  const userAge = calculateAge(profile.profile.dateOfBirth);
  const userGender = profile.profile.gender;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchApprovedUsers()); // Fetch all approved talents
      } catch (error) {
        console.error("Failed to fetch talents:", error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  // Filter talents based on age and gender
  const filteredTalents = talents.filter((talent) => {
    const talentAge = calculateAge(talent.profile.dateOfBirth);
    const isGenderMatch =
      talent.profile.gender === userGender || talent.profile.gender === "any";
    const isAgeMatch = userAge >= talentAge - 5 && userAge <= talentAge + 5; // Match within a 5-year range
    return isGenderMatch && isAgeMatch;
  });

  const handleRoleClick = (talent) => {
    router.push(`/talent/${talent.wctId}`); // Assuming each talent has a unique `id`
  };

  return (
    <div className="py-10 px-5 md:px-20">
      <div className="mt-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Recommended Talents
        </h2>

        {loadingStatus === "loading" ? (
          <div className="text-center text-gray-600">Loading talents...</div>
        ) : error ? (
          <div className="text-center text-red-600">
            Failed to load talents.
          </div>
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="w-full"
            modules={[Navigation, Pagination]}
          >
            {talents.length > 0 ? (
              filteredTalents.map((talent, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleRoleClick(talent)}
                    className="relative p-4 bg-white rounded-lg shadow-lg cursor-pointer"
                  >
                    <div className="h-64 overflow-hidden rounded-lg">
                      <img
                        src={talent?.profilePictureUrl}
                        alt={talent.profile.screenName}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                     
                      {/* Prevent Right Click */}
                      <div
                        className="absolute inset-0  pointer-events-auto" // Blur on hover
                        onContextMenu={(e) => e.preventDefault()} // Disables right-click
                      ></div>

                     
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-xl font-bold text-gray-800">
                        {talent.wctId}
                      </h3>
                      <p className="text-gray-600">
                        {talent.profile?.currentCity}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center text-gray-600">
                No talents available matching your profile.
              </div>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default RelatRole;
