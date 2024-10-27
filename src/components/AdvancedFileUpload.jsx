"use client";
import { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";

export default function AdvancedFileUpload({ onFileUpload }) {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected:", file); // Debugging line
      onFileUpload({ file });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("File dropped:", file); // Debugging line
      onFileUpload({ file });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    console.log("File removed"); // Debugging line
    onFileUpload({ file: null });
  };

  // Cleanup the URL object to avoid memory leaks
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-4 cursor-pointer ${
        dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <label htmlFor="file-upload">
        <div className="text-center">
          {!selectedFile ? (
            <>
              <FaCloudUploadAlt size={48} className="text-gray-500" />
              <p className="mt-2 text-gray-600">
                Drag & drop your file here, or click to select
              </p>
            </>
          ) : (
            <>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700 transition-all duration-150 ease-in-out mt-2"
              >
                Remove
              </button>
            </>
          )}
        </div>
      </label>
      {dragging && (
        <Tooltip content="Drop file to upload" position="top">
          <div className="absolute inset-0 bg-blue-200 opacity-50 z-10" />
        </Tooltip>
      )}
    </div>
  );
}
