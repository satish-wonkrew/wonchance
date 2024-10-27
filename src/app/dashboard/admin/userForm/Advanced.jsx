import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import axiosInstance from "@/utils/axiosInstance";

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

  const handleProfileUpload = async () => {
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    try {
      const response = await axiosInstance.post(
        `${USER_API_END_POINT}/profile/${userIds}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile picture upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleGalleryUpload = async () => {
    const formData = new FormData();

    // Append gallery photos
    galleryPhotos.forEach((file) => {
      formData.append("gallery", file);
    });

    // Append gallery videos
    galleryVideos.forEach((file) => {
      formData.append("gallery", file);
    });

    try {
      const response = await axiosInstance.post(
        `${USER_API_END_POINT}/gallery/${userIds}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Gallery upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading gallery:", error);
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
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Upload Profile Picture</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileChange}
          className="mb-4 border rounded p-2 w-full"
        />
        {profilePicture && (
          <div className="flex items-center mb-4">
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile Preview"
              className="w-16 h-16 rounded-full object-cover mr-2"
            />
            <button
              onClick={() => setProfilePicture(null)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
        <button
          onClick={handleProfileUpload}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload Profile Picture
        </button>

        <h2 className="text-2xl font-semibold mb-4">Upload Gallery Photos</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryPhotosChange}
          className="mb-4 border rounded p-2 w-full"
        />
        <div className="flex flex-wrap mb-4">
          {galleryPhotos.map((photo, index) => (
            <div key={index} className="relative w-24 h-24 m-2">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Gallery Photo ${index + 1}`}
                className="w-full h-full rounded-md object-cover"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Upload Gallery Videos</h2>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleGalleryVideosChange}
          className="mb-4 border rounded p-2 w-full"
        />
        <div className="flex flex-wrap mb-4">
          {galleryVideos.map((video, index) => (
            <div key={index} className="relative w-24 h-24 m-2">
              <video
                src={URL.createObjectURL(video)}
                alt={`Gallery Video ${index + 1}`}
                className="w-full h-full rounded-md object-cover"
                controls
              />
              <button
                onClick={() => removeVideo(index)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleGalleryUpload}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Upload Gallery Media
        </button>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button onClick={prevStep} className="bg-gray-500 text-white">
            Previous
          </Button>
          <Link href="/User/profiles" className="bg-blue-500 text-white hover:bg-blue-700">
            <Button>Submit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
