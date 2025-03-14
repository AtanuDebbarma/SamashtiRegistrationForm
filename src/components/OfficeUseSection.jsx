import React from "react";
import { InputField, Section } from "./ReusableComponents";

const OfficeUseSection = ({ handleChange, formData, croppedImage }) => {
  return (
    <div className="mt-6">
      {/* Office Use Section */}
      <Section title="ONLY FOR OFFICE USE">
        <div className="border-b border-dashed border-gray-400 relative py-2 my-2">
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white px-2">
            ✂
          </span>
        </div>
        <div className="flex flex-col xxxxs:flex-row xxxxs:justify-between mt-4 gap-x-8">
          {/* Left Side - Form Fields */}
          <div className="flex-1">
            <InputField
              label="Registration No. : 2025/"
              value={formData.officeRegistrationNo}
              onChange={(e) =>
                handleChange("officeRegistrationNo", e.target.value)
              }
              disabled={true}
            />
            <InputField
              label="Name of Child : "
              value={formData.officeNameOfChild}
              onChange={(e) =>
                handleChange("officeNameOfChild", e.target.value)
              }
              disabled={true}
            />
            <InputField
              label="E. Test on : "
              value={formData.officeETestOn}
              onChange={(e) => handleChange("officeETestOn", e.target.value)}
              disabled={true}
            />
            <InputField
              label="Results on : "
              value={formData.officeResultsOn}
              onChange={(e) => handleChange("officeResultsOn", e.target.value)}
              disabled={true}
            />
            <div className="mt-4">
              <p>
                Please retain this slip and present it at the time of admission.
              </p>
            </div>
            <div className="mt-4 font-bold">
              <p>Note : Registration is no guarantee of Admission.</p>
            </div>
          </div>

          {/* Right Side - Photo and Signature */}
          <div className="flex-shrink-0 mt-6 xxxxs:mt-0 xxxxs:ml-4 flex flex-col items-center">
            <div className="border-2 border-gray-400 w-24 h-28 xxs:w-28 xxs:h-32 sm:w-32 sm:h-40 flex items-center justify-center mb-2 mt-10">
              {croppedImage ? (
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-center font-bold">PHOTO</p>
              )}
            </div>

            <div className="mt-6 flex flex-col xxs:flex-row items-center xxs:justify-end">
              <div className="mr-0 xxs:mr-4"></div>
              <div className="text-center xxs:text-right mt-10">
                <p className="font-bold text-blue-800">Principal</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default OfficeUseSection;
