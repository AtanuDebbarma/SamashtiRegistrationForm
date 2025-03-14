import React, { useState, useRef, useEffect } from "react";
import styles from "./headerStyles.module.css";
import logo from "../../assets/logo.png";
import headerPhoto from "../../assets/header_photo.png";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export const Header = ({ croppedImage, setCroppedImage, imageError }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 8 / 9 });
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const modalRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // This will trigger modal re-render
      };
      reader.readAsDataURL(selectedFile);

      // Reset file input so selecting the same file again will trigger onChange
      e.target.value = null;
    }
  };

  const handleCropComplete = (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImage(croppedImageUrl);
      setImage(null); // Hide modal after cropping
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setImage(null); // Reset image to close modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setImage]);

  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="School Logo" className={styles.logo} />
      </div>
      <div className={styles.headerPhotoContianer}>
        <img
          src={headerPhoto}
          alt="School Logo"
          className={styles.headerPhoto}
        />
      </div>
      <div
        className={`${styles.photoContainer} cursor-pointer active:scale-95 transition-transform duration-150`}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        <div
          className={`${styles.photoWrapper} transition-all duration-200`}
          style={imageError ? { border: "2px solid #EF4444" } : undefined}
        >
          {croppedImage ? (
            <img
              src={croppedImage}
              alt="Cropped"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className={styles.photoText}>PHOTO</p>
          )}
        </div>
        {imageError && (
          <p className="text-red-500 text-xs">Photo is required</p>
        )}
      </div>
      {image && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-5 rounded-lg w-full max-w-md"
          >
            <div className="border-2 border-gray-300 rounded-md overflow-hidden">
              <ReactCrop
                src={image}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={handleCropComplete}
              >
                <img ref={imgRef} src={image} alt="Crop me" />
              </ReactCrop>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setImage(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCropComplete}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Confirm Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
