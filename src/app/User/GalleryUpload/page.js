"use client"
import React, { useState } from 'react';
import axios from 'axios';

const GalleryUpload = () => {
  const [files, setFiles] = useState([]);

  const onFilesChange = (e) => {
    setFiles(e.target.files);
  };

  const onUpload = async () => {
    if (files.length === 0) {
      alert('Please select files first.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('gallery', files[i]);
    }

    try {
      const response = await axios.post('/api/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed, please try again.');
    }
  };

  return (
    <div>
      <input type="file" multiple accept="image/*,video/*" onChange={onFilesChange} />
      <button onClick={onUpload}>Upload</button>
    </div>
  );
};

export default GalleryUpload;
