/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

const FileUpload = ({ userIds, prevStep }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [galleryVideos, setGalleryVideos] = useState([]);

  const handleProfileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleGalleryPhotosChange = (e) => {
    setGalleryPhotos([...e.target.files]);
  };

  const handleGalleryVideosChange = (e) => {
    setGalleryVideos([...e.target.files]);
  };

  const handleUpload = async (file, endpoint) => {
    const formData = new FormData();
    formData.append(
      endpoint === "profile" ? "profilePicture" : "gallery",
      file
    );

    try {
      const response = await axiosInstance.post(
        `${USER_API_END_POINT}/${endpoint}/${userIds}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(
        `${
          endpoint.charAt(0).toUpperCase() + endpoint.slice(1)
        } upload successful:`,
        response.data
      );
      toast(
        `${
          endpoint.charAt(0).toUpperCase() + endpoint.slice(1)
        } upload successful`
      );
    } catch (error) {
      console.error(`Error uploading ${endpoint}:`, error);
    }
  };

  const handleSequentialUploads = async () => {
    if (profilePicture) {
      await handleUpload(profilePicture, "profile");
    }

    for (const photo of galleryPhotos) {
      await handleUpload(photo, "gallery");
    }

    for (const video of galleryVideos) {
      await handleUpload(video, "gallery");
    }
  };

  const removePhoto = (index) => {
    const updatedPhotos = galleryPhotos.filter((_, i) => i !== index);
    setGalleryPhotos(updatedPhotos);
  };

  const removeVideo = (index) => {
    const updatedVideos = galleryVideos.filter((_, i) => i !== index);
    setGalleryVideos(updatedVideos);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Upload Profile Picture <span className="text-red-500">*</span>
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileChange}
          className="mb-4 border rounded p-2 w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {profilePicture && (
          <div className="flex items-center mb-4">
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile Preview"
              className="w-16 h-16 rounded-full object-cover mr-2 border-2 border-blue-500 shadow-md"
            />
            <button
              onClick={() => setProfilePicture(null)}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              Remove
            </button>
          </div>
        )}
        {/* <button className="mb-6 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200">
          Upload All
        </button> */}

        <h2 className="text-2xl font-semibold mb-4">
          Upload Gallery Photos <span className="text-red-500">*</span>
        </h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryPhotosChange}
          className="mb-4 border rounded p-2 w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex flex-wrap mb-4">
          {galleryPhotos.map((photo, index) => (
            <div key={index} className="relative w-24 h-24 m-2">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Gallery Photo ${index + 1}`}
                className="w-full h-full rounded-md object-cover border-2 border-gray-300 shadow-md"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Upload Gallery Videos <span className="text-red-500">*</span>
        </h2>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleGalleryVideosChange}
          className="mb-4 border rounded p-2 w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex flex-wrap mb-4">
          {galleryVideos.map((video, index) => (
            <div key={index} className="relative w-24 h-24 m-2">
              <video
                src={URL.createObjectURL(video)}
                alt={`Gallery Video ${index + 1}`}
                className="w-full h-full rounded-md object-cover border-2 border-gray-300 shadow-md"
                controls
              />
              <button
                onClick={() => removeVideo(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition duration-200"
          >
            Previous
          </button>
          <Link
            onClick={handleSequentialUploads}
            href="/User/profiles"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            Submit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;