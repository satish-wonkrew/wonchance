"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const LiveCamComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [closeupImage, setCloseupImage] = useState(null);
  const [reactionVideo, setReactionVideo] = useState(null);
  const [location, setLocation] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [ffmpeg, setFFmpeg] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  // Initialize FFmpeg on component mount
  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpegInstance = createFFmpeg({ log: true });
      await ffmpegInstance.load();
      setFFmpeg(ffmpegInstance);
    };
    loadFFmpeg();
  }, []);

  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const captureDateTime = () => {
    const now = new Date();
    setDateTime(now.toISOString());
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev);
  };

  // Capture live picture with metadata
  const capturePicture = useCallback(async () => {
    captureDateTime();
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    await sendDataToBackend(imageSrc, "image");
  }, [webcamRef]);

  // Capture close-up picture with metadata
  const captureCloseup = useCallback(async () => {
    captureDateTime();
    const closeupSrc = webcamRef.current.getScreenshot();
    setCloseupImage(closeupSrc);
    await sendDataToBackend(closeupSrc, "closeup");
  }, [webcamRef]);

  // Record reaction video with metadata
  const handleReactionRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      captureDateTime();
      const stream = webcamRef.current.video.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const videoFile = URL.createObjectURL(blob);
        setReactionVideo(videoFile);
        await sendDataToBackend(blob, "video");
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  // Send data to Node.js backend
  const sendDataToBackend = async (file, type) => {
    const formData = new FormData();
    formData.append(
      "file",
      file instanceof Blob ? file : await fetchFile(file)
    );
    formData.append("type", type);
    formData.append("location", JSON.stringify(location));
    formData.append("dateTime", dateTime);

    try {
      await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Failed to upload to backend", error);
    }
  };

  return (
    <div className="live-cam-component mx-auto mt-10 w-full max-w-screen-lg px-6">
      <h2 className="text-center text-3xl font-bold mb-8">
        Live Casting Platform
      </h2>

      {!isCameraOn ? (
        <div className="text-center">
          <button
            onClick={toggleCamera}
            className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg hover:bg-blue-500 transition duration-300"
          >
            Open Camera
          </button>
        </div>
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            className="rounded-lg shadow-lg"
          />
          <div className="controls flex justify-around mt-6">
            <button
              onClick={capturePicture}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-400 transition duration-300"
            >
              Capture Picture
            </button>
            <button
              onClick={captureCloseup}
              className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-400 transition duration-300"
            >
              Capture Close-Up
            </button>
            <button
              onClick={handleReactionRecording}
              className={`${
                isRecording ? "bg-red-600" : "bg-yellow-500"
              } text-white px-6 py-2 rounded-md hover:opacity-90 transition duration-300`}
            >
              {isRecording ? "Stop Recording" : "Record Reaction Video"}
            </button>
          </div>
          <button
            onClick={toggleCamera}
            className="bg-gray-600 text-white mt-4 px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300"
          >
            Close Camera
          </button>

          <div className="preview mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {capturedImage && (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Live Picture</h3>
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="rounded-md shadow-md hover:scale-105 transition-transform"
                />
              </div>
            )}
            {closeupImage && (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Close-Up Picture</h3>
                <img
                  src={closeupImage}
                  alt="Close-Up"
                  className="rounded-md shadow-md hover:scale-105 transition-transform"
                />
              </div>
            )}
            {reactionVideo && (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Reaction Video</h3>
                <video
                  src={reactionVideo}
                  controls
                  className="rounded-md shadow-md hover:scale-105 transition-transform w-full"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LiveCamComponent;
