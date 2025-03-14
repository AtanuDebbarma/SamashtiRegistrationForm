import React, { useState, useRef, useEffect } from "react";
import logo2 from "../../assets/logo2.jpg";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export const RegistrationFormHeader = ({
  croppedImage,
  setCroppedImage,
  imageError,
}) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px", // Use pixels for precision
    width: 96, // Match w-24 (24 * 4px = 96px)
    height: 112, // Match h-28 (28 * 4px = 112px)
    aspect: 1 / 1,
    x: 150,
    y: 150,
  });
  const [tempCroppedImage, setTempCroppedImage] = useState(null);
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
      setTempCroppedImage(croppedImageUrl); // Store it temporarily
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
    <div className="text-center">
      <div className="bg-blue-600 bg-opacity-10 p-6 rounded-md">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full">
              <img
                src={logo2}
                alt="School Logo"
                className="object-cover rounded-full w-full h-full"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-xl xxs:text-2xl sm:text-3xl font-bold text-[#1d1d36]">
                SAMASHTI INTERNATIONAL SCHOOL
              </h1>
              <p className="text-[#1d1d36] text-sm xxs:text-base sm:text-lg">
                CHAURI CHAURA, GORAKHPUR
              </p>
              <div className="text-[#1d1d36] mt-2 space-y-1">
                <p className="text-sm xxs:text-base sm:text-lg font-bold">
                  ICSE BOARD AFFILIATED
                </p>
                <p className="text-sm xxs:text-base sm:text-lg font-bold">
                  Admissions 2025-26
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              "cursor-pointer active:scale-95 transition-transform duration-150 mt-4 md:mt-0"
            }
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <div className={"transition-all duration-200"}>
              {croppedImage ? (
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="w-20 h-24 xxs:w-24 xxs:h-28 sm:w-32 sm:h-40 object-cover rounded-md"
                />
              ) : (
                <div
                  className="border-2 border-gray-400 w-20 h-24 xxs:w-24 xxs:h-28 sm:w-32 sm:h-40 flex flex-col items-center justify-center"
                  style={
                    imageError ? { border: "2px solid #EF4444" } : undefined
                  }
                >
                  <p className="text-gray-500 font-bold text-sm xxs:text-base sm:text-lg">
                    PHOTO
                  </p>
                  <span className="text-gray-500 text-xs xxs:text-sm sm:text-base mt-1">
                    Click here to upload
                  </span>
                </div>
              )}
            </div>
            {imageError && (
              <p className="text-red-500 text-[12px] mt-1 ">
                Photo is required
              </p>
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
                    onChange={(newCrop) => {
                      setCrop(newCrop);
                      handleCropComplete(newCrop); // Manually trigger handleCropComplete
                    }}
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
                    onClick={() => {
                      setCroppedImage(tempCroppedImage);
                      setImage(null);
                      setTempCroppedImage(null);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Confirm Crop
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <p className="text-lg font-bold text-[#1d1d36] mt-12 bg-white py-2 px-4 rounded-md">
            REGISTRATION FORM
          </p>
        </div>
      </div>
    </div>
  );
};
