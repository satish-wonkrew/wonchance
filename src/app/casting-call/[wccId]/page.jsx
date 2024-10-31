/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fetchCastingDetailsByWccId,
  applyForCasting,
} from "@/redux/slices/castingSlice";
import {
  FaBuilding,
  FaCalendarAlt,
  FaUser,
  FaFilm,
  FaTags,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt, // Import Share Icon
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useUser } from "@/hooks/useUser";
import { applyForRole } from "@/redux/slices/applicationsSlice";
import { toast } from "sonner";
import { format } from "date-fns";
import Applicants from "./Applicants";
import { BreadcrumbSection } from "@/components/etc/Breadcrumb";

const CastingCall = () => {
  const applicationResponse = useSelector((state) => state.applications);
  const { user } = useUser();
  const dispatch = useDispatch();
  const { wccId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlideInterval, setAutoSlideInterval] = useState(null);
  const [showEligibilityMessage, setShowEligibilityMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  // Access the casting details and status from the Redux store
  const { castingDetails, status, error } = useSelector(
    (state) => state.castings
  );
  useEffect(() => {
    if (castingDetails?.casting?.role.length > 0) {
      setSelectedRoleId(castingDetails.casting.role[0]._id); // Set default role ID
    }
  }, [castingDetails]);

  useEffect(() => {
    if (wccId) {
      dispatch(fetchCastingDetailsByWccId(wccId));
    }
  }, [dispatch, wccId]);

  // Set up auto-slide
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     goToNextSlide();
  //   }, 5000); // Change slide every 5 seconds
  //   setAutoSlideInterval(interval);

  //   return () => clearInterval(interval);
  // }, [currentSlide]);

  // Function to handle apply button click
  const handleApply = (roleId) => {
    const isEligible = isUserEligibleForRole(roleId);

    // Check if the user has already applied for the selected role
    if (applicationResponse?.appliedRoles?.includes(roleId)) {
      alert("You have already applied for this role.");
      return;
    }

    if (isEligible) {
      setLoading(true); // Start loading state

      dispatch(applyForRole(roleId))
        .unwrap() // Use unwrap for easier error handling
        .then(() => {
          setShowModal(true); // Show success modal
          setShowEligibilityMessage(false);
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setLoading(false); // Stop loading state
        });
    } else {
      setShowEligibilityMessage(true); // Show eligibility message
    }
  };

  // Function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Function to check if user is eligible for a role
  const isUserEligibleForRole = (roleId) => {
    const role = castingDetails?.casting?.role.find((r) => r._id === roleId);
    if (role) {
      const userAge = calculateAge(user.profile.dateOfBirth);

      // Normalize gender values for case-insensitive comparison
      const userGender = (user.gender || "").toLowerCase();
      const roleGender = (role.gender || "").toLowerCase();

      const isGenderMatch = userGender === roleGender;
      const isAgeInRange =
        userAge >= (role.ageRange?.minAge || 0) &&
        userAge <= (role.ageRange?.maxAge || Infinity);

      return isGenderMatch && isAgeInRange;
    }
    return false;
  };
  console.log("====================================");
  console.log(user?.profile.role);
  console.log("====================================");

  // Function to go to the next slide
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === (castingDetails?.casting?.role?.length || 1) - 1
        ? 0
        : prevSlide + 1
    );
  };

  // Function to go to the previous slide
  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0
        ? (castingDetails?.casting?.role?.length || 1) - 1
        : prevSlide - 1
    );
  };

  // Function to handle sharing
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: castingDetails.casting.title,
          url: window.location.href,
        })
        .then(() => console.log("Casting call shared successfully"))
        .catch((error) => console.log("Error sharing casting call:", error));
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };
  // Function to handle role change from dropdown
  const handleRoleChange = (event) => {
    setSelectedRoleId(event.target.value);
  };

  // Conditional rendering based on status
  if (status === "loading")
    return <p className="text-center text-gray-500">Loading...</p>;
  if (status === "failed")
    return (
      <p className="text-center text-red-500">
        Error: {error?.message || error}
      </p>
    );

  return (
    <div className="bg-gray-100 mt-24 max-w-5xl mx-auto p-6">
      <BreadcrumbSection />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl">
          {/* Casting Call Details Section */}
          {castingDetails?.casting ? (
            <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
              <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Casting Call Details</h1>
                <div className="flex items-center gap-2">
                  <i
                    className="fas fa-share-alt cursor-pointer"
                    onClick={handleShare} // Add onClick handler for share button
                  >
                    <FaShareAlt />
                  </i>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: FaFilm,
                    label: "Casting Call Name",
                    value: castingDetails.casting.title || "No Title Available",
                  },
                  {
                    icon: FaBuilding,
                    label: "Company Name",
                    value:
                      castingDetails.casting?.role[0].project.company
                        .companyName || "No Company Available",
                  },
                  {
                    icon: FaUser,
                    label: "Shoot Details",
                    value:
                      format(
                        new Date(castingDetails.casting.castingDate),
                        "PPP"
                      ) || "No Casting Date",
                  },
                  {
                    icon: FaTags,
                    label: "Category",
                    value:
                      castingDetails.casting.role[0].project?.categories?.join(
                        ", "
                      ) || "No Categories",
                  },
                  {
                    icon: FaCalendarAlt,
                    label: "Last Date to Apply",
                    value:
                      format(
                        new Date(castingDetails.casting.expiryDate),
                        "PPP"
                      ) || "No Expiry Date",
                  },
                ].map(({ icon: Icon, label, value }, idx) => (
                  <div key={idx}>
                    <div className="flex items-center mb-2">
                      <Icon className="mr-2 text-white bg-slate-800 w-7 p-1 h-auto rounded-full" />
                      <h2 className="font-semibold">{label}</h2>
                    </div>
                    <p className="ml-9">{value}</p>
                  </div>
                ))}
              </div>
              {/* <div className="flex justify-end mt-4">
                <button className="text-blue-600 font-semibold">Next</button>
              </div> */}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No casting details available.
            </p>
          )}

          {/* Role Details Section */}
          {castingDetails?.casting?.role ? (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-xl font-bold mb-4">Role Details</h1>
              <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {castingDetails.casting.role.map((role, index) => (
                      <div key={index} className="flex-none w-full px-4">
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            {
                              icon: FaUser,
                              label: "Role Name",
                              value: role.roleName || "No Role Available",
                            },
                            {
                              icon: FaUser,
                              label: "Body Type",
                              value: role.bodyType || "No Body Type Specified",
                            },
                            {
                              icon: FaUser,
                              label: "Age Range",
                              value:
                                `${role.ageRange?.minAge} - ${role.ageRange?.maxAge}` ||
                                "No Age Range",
                            },
                            {
                              icon: FaUser,
                              label: "Skin Tone",
                              value: role.skinTone || "No Skin Tone Specified",
                            },
                            {
                              icon: FaUser,
                              label: "Gender",
                              value: role.gender || "No Gender Specified",
                            },
                            {
                              icon: FaUser,
                              label: "Openings",
                              value:
                                role.noOfOpenings || "No Openings Specified",
                            },
                          ].map(({ icon: Icon, label, value }, idx) => (
                            <div key={idx}>
                              <div className="flex items-center mb-2 ">
                                <Icon className="mr-2 text-white bg-slate-800 w-7 p-1 h-auto rounded-full" />
                                <h2 className="font-semibold">{label}</h2>
                              </div>
                              <p className="ml-9">{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <h2 className="font-semibold mb-2">Description</h2>
                          <p className="bg-gray-100 p-4 rounded-md">
                            {role.description || "No Description Available"}
                          </p>
                        </div>
                        <div className="mt-6 flex  justify-between items-center">
                          <div>
                            <div>
                              <button
                                className={`font-bold py-2 px-6 rounded ${
                                  applicationResponse?.appliedRoles?.includes(
                                    role._id
                                  )
                                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                    : isUserEligibleForRole(role._id)
                                    ? "bg-black text-white"
                                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                                }`}
                                onClick={() => handleApply(role._id)}
                                disabled={applicationResponse?.appliedRoles?.includes(
                                  role._id
                                )}
                              >
                                {applicationResponse?.appliedRoles?.includes(
                                  role._id
                                )
                                  ? "Already Applied"
                                  : "Apply"}
                              </button>
                              {applicationResponse?.appliedRoles?.includes(
                                role._id
                              ) && (
                                <p className="text-red-500 text-sm mt-2">
                                  You have already applied for this role.
                                </p>
                              )}
                            </div>

                            {!isUserEligibleForRole(role._id) && (
                              <p className="text-red-500 text-sm flex-wrap">
                                * Sorry, you're not eligible for this Role.
                              </p>
                            )}
                          </div>

                          <div>
                            <p className="text-gray-600">
                              {currentSlide + 1}/
                              {castingDetails.casting.role.length}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <FaChevronLeft
                              className="cursor-pointer"
                              onClick={goToPrevSlide}
                            />
                            <FaChevronRight
                              className="cursor-pointer"
                              onClick={goToNextSlide}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {user.role !== "talent" && (
                  <div>
                    <div className="float-right">
                      <div className="mb-4">
                        <label htmlFor="roleSelect" className="block mb-2">
                          Select Role
                        </label>
                        <select
                          id="roleSelect"
                          value={selectedRoleId}
                          onChange={handleRoleChange}
                          className="p-2 border border-gray-300 rounded"
                        >
                          {castingDetails?.casting?.role.map((role) => (
                            <option key={role._id} value={role._id}>
                              {role.roleName || "No Role Available"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <Applicants roleId={selectedRoleId} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No role details available.
            </p>
          )}

          {/* Modal for Apply Confirmation */}
          {showModal && (
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold">Application Received</h3>
                <p className="mt-4">
                  Your application for the casting call has been submitted
                  successfully.
                </p>
                <Button
                  onClick={() => setShowModal(false)}
                  className="mt-4"
                  variant="primary"
                >
                  Close
                </Button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastingCall;
