/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Spinner from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import {
  BsWhatsapp,
  BsTelephone,
  BsEnvelope,
  BsInstagram,
  BsYoutube,
} from "react-icons/bs";
import {
  FaFacebook,
  FaStar,
  FaStarHalfAlt,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { BreadcrumbSection } from "@/components/etc/Breadcrumb";
import LoadingSpinner from "@/components/ui/loading";
import Work from "./workdetails";
import Gallery from "./gallary";
import RelatRole from "./RelatRole";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { IMAGE_API_END_POINT } from "@/utils/constant";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

const ProfilePage = () => {
  const router = useRouter();
  const { wctId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUser();
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `https://api.wonchance.com/api/talent/${wctId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProfile(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [wctId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center bg-primary-forground dark:bg-dark-primary-forground">
        <img src="/WONCHANCE.gif" alt="Loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center bg-primary-forground dark:bg-dark-primary-forground">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4 text-center bg-primary-forground dark:bg-primary-forground">
        <p className="text-gray-500">Profile not found.</p>
      </div>
    );
  }
  const profiles = profile;
  const photosWithBaseUrl =
    profile.galleryDetails?.photos?.map((photo) => {
      return `${photo?.replace(/\\/g, "/")}`; // Convert to valid URL format
    }) || [];
  // Combine photos and videos into a single array with type information
  const items = [
    ...(photosWithBaseUrl.map((src) => ({
      src,
      type: "image",
    })) || []),
    ...(profiles?.galleryDetails?.videos?.map((src) => ({
      src,
      type: "video",
    })) || []),
  ];

  // colculate age based on date of birth

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const age = calculateAge(profile.profile.dateOfBirth);
  const rating = Math.floor(Math.random() * 5) + 1; // Use default rating or adjust as needed
  return (
    <div className="container mx-auto mt-24 p-4 bg-primary-forground dark:bg-dark-primary-forground w-svw">
      <div className="flex flex-col md:flex-row md:justify-between px-4 md:px-10">
        <BreadcrumbSection />
        {user.user?.role === "Super Admin" ? (
          <Link href="/User/profiles/update">
            <span className="inline-block mt-4 md:mt-0 px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 md:px-6">
              Edit Profile
            </span>
          </Link>
        ) : null}
      </div>

      <div className="mx-4 my-3 flex flex-col md:flex-row p-4 md:p-6 bg-white dark:bg-primary-foreground shadow-lg rounded-lg">
        {/* Left Section - Image */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative w-72 h-72 md:w-96 md:h-[650px] mb-4">
            <Image
              src={
                profile.profilePictureUrl
                  ? profile.profilePictureUrl
                  : "https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=170667a&w=0&k=20&c=qDvsvfQdmm_cvI_BQH4PdIt8-P-VDAq7ufOobicPBu0="
              }
              alt={
                profile.screenName
                  ? `${profile.screenName}'s Profile Picture`
                  : "Profile Picture"
              }
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-md"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 pointer-events-none"></div>

            {/* Prevent Right Click */}
            <div
              className="absolute inset-0  pointer-events-auto" // Blur on hover
              onContextMenu={(e) => e.preventDefault()} // Disables right-click
            ></div>

            {/* Watermark */}
            <div className="absolute top-2 right-2 pointer-events-none">
              <img
                src="/Img/Logo.png"
                alt="Wonchance Watermark"
                className="opacity-70 w-16 h-auto"
              />
            </div>
          </div>
          {/* {photosWithBaseUrl.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {photosWithBaseUrl.map((image, index) => (
                <div key={index} className="relative w-12 h-12">
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md shadow-sm"
                  />
                </div>
              ))}
            </div>
          )} */}
        </div>

        {/* Right Section - Information */}
        <div className="md:ml-6  leading-7 md:leading-9 mt-4 md:mt-0">
          <div className="grid grid-cols-2">
            <h1 className="text-2xl font-bold mb-2 text-black dark:text-white">
              {user?.user?.role === "Super Admin" ? (
                profile?.profile?.screenName
              ) : (
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>PROFILE ID:</strong> {profile.wctId || "N/A"}
                </p>
              )}
            </h1>
            {/* <p className="text-green-600 dark:text-green-400 font-semibold">
            {onlineStatus ? "Online" : "Offline"}
          </p> */}
            {/* <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Bio:</strong> {profile.bio || "No bio available"}
          </p> */}
            {user?.user?.role === "Super Admin" ? (
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>PROFILE ID:</strong> {profile.wctId || "N/A"}
              </p>
            ) : null}
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div>
              {user?.user?.role === "Super Admin" ? (
                <>
                  <p>
                    <strong>First Name:</strong>{" "}
                    {profile.profile.firstName || "Not Specified"}
                  </p>
                  <p>
                    <strong>Last Name:</strong>{" "}
                    {profile.profile.lastName || "Not Specified"}
                  </p>
                  {/* Phone and Whatsapp  */}
                  {/* <p>
                    <strong>Phone:</strong>{" "}
                    {profile.phoneNumber || "Not Specified"}
                  </p> */}
                  <p>
                    <strong>Whatsapp:</strong>{" "}
                    {profile.whatsappNumber || "Not Specified"}
                  </p>
                  {/* Father And Mother Name */}
                  <p>
                    {profile.profile.fatherName && (
                      <span>{profile.profile.fatherName}</span>
                    )}
                  </p>
                  <p>
                    {profile.profile.mothersName && (
                      <span>{profile.profile.motherName}</span>
                    )}
                  </p>
                </>
              ) : null}

              <p>
                <strong>Gender:</strong>{" "}
                {profile.gender.toUpperCase() || "Not Specified"}
              </p>
              {/* First Name last Name */}

              <p>
                <strong>Age:</strong> {age || "Not Specified"}
              </p>
              <p>
                <strong>Experience Level:</strong>{" "}
                {profile.profile.experienceLevel?.toUpperCase() ||
                  "Not Specified"}
              </p>
              <p>
                <strong>Marital Status:</strong>{" "}
                {profile.profile.maritalStatus || "Not Specified"}
              </p>
              <p>
                <strong>Nationality:</strong>{" "}
                {profile.profile.nationality || "Not Specified"}
              </p>
              <p>
                <strong>Native Place:</strong>{" "}
                {profile.profile.nativePlace || "Not Specified"}
              </p>
              <p>
                <strong>Current Place:</strong>{" "}
                {profile.profile.currentCity || "Not Specified"}
              </p>
              <p>
                <strong>Languages Spoken:</strong>{" "}
                {profile.profile.speakingLanguages?.join(", ") ||
                  "Not Specified"}
              </p>
              <p>
                <strong>Languages Reading:</strong>{" "}
                {profile.profile.readingLanguages?.join(", ") ||
                  "Not Specified"}
              </p>
              {/* Address Field */}
              {user?.user?.role === "Super Admin" ? (
                <>
                  {profile.profile.address && (
                    <p>
                      <strong>Address:</strong> {profile.profile.address}
                    </p>
                  )}
                </>
              ) : null}
            </div>

            {/* Appearance and Educational Section */}
            <div>
              <div className="mb-4">
                <p className="font-semibold">Appearance:</p>
                <div className="grid grid-cols-2 gap-2">
                  {profile.profile.physicalDetails?.bodyType && (
                    <p>
                      <strong>Body Type:</strong>{" "}
                      {profile.profile.physicalDetails.bodyType}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.height && (
                    <p>
                      <strong>Height:</strong>{" "}
                      {profile.profile.physicalDetails.height} CM
                    </p>
                  )}
                  {profile.profile.physicalDetails?.weight && (
                    <p>
                      <strong>Weight:</strong>{" "}
                      {profile.profile.physicalDetails.weight} KG
                    </p>
                  )}
                  {profile.profile.physicalDetails?.hairColor && (
                    <p>
                      <strong>Hair Color:</strong>{" "}
                      {profile.profile.physicalDetails.hairColor}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.skinTone && (
                    <p>
                      <strong>Skin Tone:</strong>{" "}
                      {profile.profile.physicalDetails.skinTone}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.eyeColor && (
                    <p>
                      <strong>Eye Color:</strong>{" "}
                      {profile.profile.physicalDetails.eyeColor}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.shoeSize && (
                    <p>
                      <strong>Shoe Size:</strong>{" "}
                      {profile.profile.physicalDetails.shoeSize}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.Chest && (
                    <p>
                      <strong>Chest:</strong>{" "}
                      {profile.profile.physicalDetails.Chest}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.waist && (
                    <p>
                      <strong>Waist:</strong>{" "}
                      {profile.profile.physicalDetails.waist}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.hips && (
                    <p>
                      <strong>Hips:</strong>{" "}
                      {profile.profile.physicalDetails.hips}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.tattoos && (
                    <p>
                      <strong>Tattoos:</strong>{" "}
                      {profile.profile.physicalDetails.tattoos}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.piercings && (
                    <p>
                      <strong>Piercings:</strong>{" "}
                      {profile.profile.physicalDetails.piercings}
                    </p>
                  )}
                  {profile.profile.physicalDetails?.bodyShape && (
                    <p>
                      <strong>Body Shape:</strong>{" "}
                      {profile.profile.physicalDetails.bodyShape}
                    </p>
                  )}
                </div>
              </div>
              <p>
                <strong>Educational Qualification:</strong>{" "}
                {profile.profile.educationalQualification || "Not Specified"}
              </p>
              {/* <p>
                <strong>Role:</strong>{" "}
                {profile.role.toUpperCase() || "Not Specified"}
              </p> */}

              {/* Social Media Icon */}
              {user?.user?.role === "Super Admin" ? (
                <>
                  <div className="flex gap-4 mt-4">
                    {profile.profile.socialMedia && (
                      <a
                        href={
                          profile.profile.socialMedia.facebook ||
                          "https://www.facebook.com/"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaFacebook className="text-2xl" />
                      </a>
                    )}
                    {profile.profile.socialMedia && (
                      <a
                        href={
                          profile.profile.socialMedia.instagram ||
                          "https://www.instagram.com/"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800"
                      >
                        <BsInstagram className="text-2xl" />
                      </a>
                    )}
                    {profile.profile.socialMedia && (
                      <a
                        href={
                          profile.profile.socialMedia.twitter ||
                          "https://www.twitter.com"
                        }
                        className="text-blue-400 hover:text-blue-600"
                        target="_blank"
                      >
                        <FaTwitterSquare className="text-2xl" />
                      </a>
                    )}
                    {/* Add Youtube */}
                    {profile.profile.socialMedia && (
                      <a
                        href={
                          profile.profile.socialMedia.youtube ||
                          "https://www.youtube.com/"
                        }
                        target="_blank"
                      >
                        <BsYoutube className="text-2xl" />
                      </a>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <p className="font-bold text-lg mb-2">Skills:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.profile.skillDetails && (
                <>
                  {/* Dance Style */}
                  {profile.profile.skillDetails.danceStyle?.length > 0 && (
                    <div>
                      <p className="font-semibold">Dance Style:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.profile.skillDetails.danceStyle.map(
                          (style, index) => (
                            <span
                              key={`danceStyle-${index}`}
                              className="px-3 py-1 bg-blue-200 dark:bg-blue-700 rounded-full text-sm shadow"
                            >
                              {style}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Driving */}
                  {profile.profile.skillDetails.driving?.length > 0 && (
                    <div>
                      <p className="font-semibold">Driving:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.profile.skillDetails.driving.map(
                          (type, index) => (
                            <span
                              key={`driving-${index}`}
                              className="px-3 py-1 bg-green-200 dark:bg-green-700 rounded-full text-sm shadow"
                            >
                              {type}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Singing */}
                  {profile.profile.skillDetails.singing?.length > 0 && (
                    <div>
                      <p className="font-semibold">Singing:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.profile.skillDetails.singing.map(
                          (type, index) => (
                            <span
                              key={`singing-${index}`}
                              className="px-3 py-1 bg-yellow-200 dark:bg-yellow-700 rounded-full text-sm shadow"
                            >
                              {type}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Martial Arts */}
                  {profile.profile.skillDetails.martialArts?.length > 0 && (
                    <div>
                      <p className="font-semibold">Martial Arts:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.profile.skillDetails.martialArts.map(
                          (type, index) => (
                            <span
                              key={`martialArts-${index}`}
                              className="px-3 py-1 bg-red-200 dark:bg-red-700 rounded-full text-sm shadow"
                            >
                              {type}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Water Activities */}
                  {profile.profile.skillDetails.waterActivites?.length > 0 && (
                    <div>
                      <p className="font-semibold">Water Activities:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.profile.skillDetails.waterActivites.map(
                          (activity, index) => (
                            <span
                              key={`waterActivites-${index}`}
                              className="px-3 py-1 bg-teal-200 dark:bg-teal-700 rounded-full text-sm shadow"
                            >
                              {activity}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {profile.profile.skillDetails.certifications?.length > 0 && (
                    <div>
                      <p className="font-semibold">Certifications:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.profile.skillDetails.certifications.map(
                          (cert, index) => (
                            <span
                              key={`certification-${index}`}
                              className="px-3 py-1 bg-purple-200 dark:bg-purple-700 rounded-full text-sm shadow"
                            >
                              {cert}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Gallery profile={profile} />
      <Work profile={profile} />
      {/* <RelatRole profile={profile} /> */}
    </div>
  );
};

export default ProfilePage;
