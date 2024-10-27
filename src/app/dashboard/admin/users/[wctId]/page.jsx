"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Spinner from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { BsWhatsapp, BsTelephone, BsEnvelope } from "react-icons/bs";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BreadcrumbSection } from "@/components/etc/Breadcrumb";
import LoadingSpinner from "@/components/ui/loading";
import { USER_API_END_POINT } from "@/utils/constant";

const ProfilePage = () => {
  const router = useRouter();
  const { wctId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${USER_API_END_POINT}/profile/${wctId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(data.user); // Adjust according to your API response
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
        <LoadingSpinner />
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
      <div className="container mx-auto p-4 text-center bg-primary-forground dark:bg-dark-primary-forground">
        <p className="text-gray-500">Profile not found.</p>
      </div>
    );
  }

  const rating = Math.floor(Math.random() * 5) + 1; // Use default rating or adjust as needed

  return (
    <div className="container mx-auto p-4 bg-primary-forground dark:bg-dark-primary-forground w-svw">
      <BreadcrumbSection />
      <div className="mx-4 my-3 flex flex-col md:flex-row p-4 md:p-6 bg-white dark:bg-primary-foreground shadow-md rounded-lg">
        {/* Left Section - Image */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative w-72 h-72 md:w-96 md:h-96 mb-4">
            <Image
              src={profile.profile.profilePictureUrl || "https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=170667a&w=0&k=20&c=qDvsvfQdmm_cvI_BQH4PdIt8-P-VDAq7ufOobicPBu0="}
              alt={profile.profile.firstName ? `${profile.profile.firstName} ${profile.profile.lastName}` : "Profile Picture"}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          {profile.galleryDetails?.photos.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {profile.galleryDetails.photos.map((image, index) => (
                <div key={index} className="relative w-12 h-12">
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section - Information */}
        <div className="flex-1 md:ml-6 leading-7 md:leading-9 mt-4 md:mt-0">
          <h1 className="text-xl md:text-2xl font-bold mb-2 text-black dark:text-white">
            {profile.profile.firstName} {profile.profile.lastName}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Bio:</strong> {profile.bio || "No bio available"}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>PROFILE ID:</strong> {profile.wctId || "N/A"}
          </p>

          {/* Contact Icons */}
          <div className="flex space-x-3 mb-4 text-gray-600 dark:text-gray-400">
            <BsWhatsapp className="text-xl cursor-pointer hover:text-green-500" aria-label="WhatsApp" />
            <BsTelephone className="text-xl cursor-pointer hover:text-blue-500" aria-label="Telephone" />
            <BsEnvelope className="text-xl cursor-pointer hover:text-red-500" aria-label="Email" />
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }, (_, index) =>
              index < rating ? (
                <FaStar key={index} className="text-yellow-500" />
              ) : (
                <FaStarHalfAlt key={index} className="text-yellow-500" />
              )
            )}
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div>
              <p><strong>Gender:</strong> {profile.profile.gender || "Not Specified"}</p>
              <p><strong>Age:</strong> {profile.profile.age || "Not Specified"}</p>
              <p><strong>Experience Level:</strong> {profile.profile.experienceLevel || "Not Specified"}</p>
              <p><strong>Marital Status:</strong> {profile.profile.maritalStatus || "Not Specified"}</p>
              <p><strong>Nationality:</strong> {profile.profile.nationality || "Not Specified"}</p>
              <p><strong>Native Place:</strong> {profile.profile.nativePlace || "Not Specified"}</p>
              <p><strong>Current Place:</strong> {profile.profile.currentPlace || "Not Specified"}</p>
              <p><strong>Languages:</strong> {profile.profile.speakingLanguages?.join(", ") || "Not Specified"}</p>
            </div>
            <div>
              <p><strong>Appearance:</strong></p>
              <div className="leading-7 md:leading-9 grid-cols-1 grid md:grid-cols-2 gap-4">
                {profile.profile.physicalDetails?.bodyType && <p>Body Type: {profile.profile.physicalDetails.bodyType}</p>}
                {profile.profile.physicalDetails?.height && <p>Height: {profile.profile.physicalDetails.height} CM</p>}
                {profile.profile.physicalDetails?.weight && <p>Weight: {profile.profile.physicalDetails.weight} KG</p>}
                {profile.profile.physicalDetails?.hairColor && <p>Hair Color: {profile.profile.physicalDetails.hairColor}</p>}
                {profile.profile.physicalDetails?.skinTone && <p>Skin Tone: {profile.profile.physicalDetails.skinTone}</p>}
                {profile.profile.physicalDetails?.eyeColor && <p>Eye Color: {profile.profile.physicalDetails.eyeColor}</p>}
                {profile.profile.physicalDetails?.shoeSize && <p>Shoe Size: {profile.profile.physicalDetails.shoeSize}</p>}
                {profile.profile.physicalDetails?.dressSize && <p>Dress Size: {profile.profile.physicalDetails.dressSize}</p>}
              </div>
            </div>
          </div>

          {/* Skills */}
          {profile.profile.skills?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Skills:</h3>
              <ul className="list-disc pl-5">
                {profile.profile.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline" onClick={() => router.push("/talent")}>
          Back to Talent List
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
