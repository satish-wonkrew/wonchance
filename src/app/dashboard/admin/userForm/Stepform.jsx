"use client";
import React, { useState, useEffect } from "react";
import BasicInfo from "./BasicInfo";
import Advanced from "./Advanced";
import MidlleInfo from "./Middle";
import { USER_API_END_POINT } from "@/utils/constant";
import { useUser } from "@/hooks/useUser";
import FileUpload from "./Advanced";

const TOTAL_STEPS = 3;

const StepForm = () => {
  const userIds = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [galleryVideos, setGalleryVideos] = useState([]);
  const userIdss = userIds.user?._id;

  // Check if localStorage is available
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (isBrowser) {
      const savedStep = localStorage.getItem("formStep");
      if (savedStep) {
        setStep(JSON.parse(savedStep));
      }

      const savedData = localStorage.getItem("formData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, [isBrowser]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("formStep", JSON.stringify(step));
    }
  }, [step, isBrowser]);

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }

    // Call saveDataToServer function to save data in the server.
    saveDataToServer(formData);

    // Auto-save data to the server every 30 seconds
    const saveInterval = setInterval(() => {
      saveDataToServer(formData);
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [formData, isBrowser]);

  const nextStep = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFormDataChange = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  // New upload handlers
  const handleProfilePictureChange = (file) => {
    setProfilePicture(file);
  };

  const handleGalleryPhotosChange = (files) => {
    setGalleryPhotos(files);
  };

  const handleGalleryVideosChange = (files) => {
    setGalleryVideos(files);
  };

  // Save form data to the server
  const saveDataToServer = async (data) => {
    if (!isBrowser) return;

    try {
      const token = localStorage.getItem("token");
      const userDatas = localStorage.getItem("user");
      if (!token || !userDatas) {
        throw new Error("Authentication or user data missing.");
      }

      const users = JSON.parse(userDatas);
      const userId = users.id;

      const res = await fetch(`${USER_API_END_POINT}/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to save data to server.");
      }
    } catch (error) {
      console.error("Error saving data to server:", error);
    }
  };

  const handleSubmit = async () => {
    if (!isBrowser) return;

    const userDatas = localStorage.getItem("user");
    if (!userDatas) {
      console.error("User data not found.");
      return;
    }

    const users = JSON.parse(userDatas);
    const userId = users.id;

    // Save form data to the server
    await saveDataToServer(formData);

    // Upload files if they exist
    if (profilePicture) {
      await uploadProfilePicture(profilePicture, userId);
    }
    if (galleryPhotos.length > 0) {
      await uploadGalleryPhotos(galleryPhotos, userId);
    }
    if (galleryVideos.length > 0) {
      await uploadGalleryVideos(galleryVideos, userId);
    }

    // Move to the next step after submitting
    nextStep();
  };

  switch (step) {
    case 1:
      return (
        <BasicInfo
          nextStep={nextStep}
          prevStep={prevStep}
          onFormDataChange={handleFormDataChange}
          formData={formData}
        />
      );
    case 2:
      return (
        <MidlleInfo
          nextStep={nextStep}
          prevStep={prevStep}
          onFormDataChange={handleFormDataChange}
          formData={formData}
        />
      );
    case 3:
      return (
        <FileUpload
          nextStep={handleSubmit} // Call handleSubmit when moving to the next step
          userIds={userIdss}
          prevStep={prevStep}
          onFormDataChange={handleFormDataChange}
          formData={formData}
          handleProfilePictureChange={handleProfilePictureChange}
          handleGalleryPhotosChange={handleGalleryPhotosChange}
          handleGalleryVideosChange={handleGalleryVideosChange}
        />
      );
    default:
      return (
        <BasicInfo
          nextStep={nextStep}
          prevStep={prevStep}
          onFormDataChange={handleFormDataChange}
          formData={formData}
        />
      );
  }
};

export default StepForm;