// src/components/Watermark.js
export const addWatermarkToImage = (imageSrc, watermarkText, callback) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      // Set canvas dimensions to image dimensions
      canvas.width = image.width;
      canvas.height = image.height;
  
      // Draw the image onto the canvas
      ctx.drawImage(image, 0, 0);
  
      // Set watermark properties
      ctx.font = '30px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // White with some transparency
      ctx.textAlign = 'right'; // Align text to the right
      ctx.textBaseline = 'bottom'; // Align text to the bottom
  
      // Add watermark text to the canvas
      ctx.fillText(watermarkText, canvas.width - 20, canvas.height - 20);
  
      // Convert canvas to data URL
      const watermarkedImageSrc = canvas.toDataURL('image/png');
      callback(watermarkedImageSrc);
    };
  };
  