import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { RegistrationFormHeader } from "../components/header/Header";
import NameAndAddressSection from "../components/nameAndAdress/NameAndAddressSection";
import ParentsDetailsSection from "../components/ParentsDetailsSection";
import AdharSection from "../components/adhar/AdharSection";
import OfficeUseSection from "../components/OfficeUseSection";

// import './styles.css'

const SamashtiRegistrationForm = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    registrationNo: "",
    dateOfBirth: "",
    name: "",
    mobileNo: "",
    whatsappNo: "",
    address: "",
    pinCode: "",
    lastSchool: "",
    class: "",
    permanentEducationNo: "",
    category: "",
    aadhaarNo: "",
    fatherName: "",
    fatherOccupation: "",
    fatherEducationalQualifications: "",
    fatherPostGraduation: "",
    fatherUniversityCollege: "",
    fatherGraduation: "",
    fatherIntermediateYear: "",
    fatherSubject: "",
    fatherSchoolName: "",
    fatherHighSchool: "",
    motherName: "",
    motherOccupation: "",
    motherEducationalQualifications: "",
    motherPostGraduation: "",
    motherUniversityCollege: "",
    motherGraduation: "",
    motherIntermediateYear: "",
    motherSubject: "",
    motherSchoolName: "",
    motherHighSchool: "",
    officeRegistrationNo: "",
    officeNameOfChild: "",
    officeETestOn: "",
    officeResultsOn: "",
  });
  const [croppedImage, setCroppedImage] = useState(null);
  // Handle input change
  const [errors, setErrors] = useState({}); // Track errors
  const [imageError, setImageError] = useState(false);

  // Handle input change
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors = {};

    // Required fields (excluding OfficeUseSection, registrationNo, and mother-related fields)
    const requiredFields = Object.keys(formData).filter(
      (key) =>
        !key.startsWith("office") &&
        key !== "registrationNo" &&
        !key.startsWith("mother")
    );

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Validate croppedImage (Picture)
    if (!croppedImage) {
      newErrors.croppedImage = "Photo is required";
      setImageError(true);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  useEffect(() => {
    if (croppedImage) {
      setImageError(false);
    }
  }, [croppedImage]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form has errors.");
      return;
    }

    const formElement = document.getElementById("samashti-form");
    const submitButton = document.getElementById("submit-button");
    const footer = document.getElementById("footer"); // Get footer element

    if (formElement) {
      try {
        // Store original width before modifying
        footer.style.display = "none"; // Hide footer before capture
        const originalWidth = formElement.style.width;
        const originalMaxWidth = formElement.style.maxWidth;

        // Force large screen layout
        formElement.style.width = "1024px"; // Fixed large screen width
        formElement.style.maxWidth = "1024px"; // Prevent smaller scaling

        // Temporarily hide submit button for clean screenshot
        submitButton.style.display = "none";

        // Capture form with html2canvas
        const canvas = await html2canvas(formElement, {
          scale: 2, // High scale for better resolution
          useCORS: true, // Fix missing styles if needed
        });

        // Restore form layout after capture
        formElement.style.width = originalWidth;
        formElement.style.maxWidth = originalMaxWidth;
        submitButton.style.display = "block"; // Restore submit button
        footer.style.display = "block"; // Restore footer

        // Ensure button stays centered
        submitButton.style.justifyContent = "center";
        submitButton.style.margin = "auto";

        // Get form width and height
        const formWidth = canvas.width;
        const formHeight = canvas.height;

        const pdf = new jsPDF("p", "mm", "a2");
        const pdfWidth = 420; // A2 width in mm
        const pdfHeight = 594; // A2 height in mm

        // Reduce scaling slightly to prevent label squeezing
        const scaleFactor =
          Math.min(pdfWidth / formWidth, pdfHeight / formHeight) * 0.96;
        const finalWidth = formWidth * scaleFactor;
        const finalHeight = formHeight * scaleFactor;

        // Centering adjustments
        const xOffset = (pdfWidth - finalWidth) / 2;
        const yOffset = (pdfHeight - finalHeight) / 2;

        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          xOffset,
          yOffset,
          finalWidth,
          finalHeight
        );
        pdf.save("Samashti_Registration_Form.pdf");

        console.log("PDF Downloaded!");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  return (
    <div
      id="samashti-form"
      className="min-h-screen bg-gray-100 flex justify-center p-4 sm:p-6 md:p-8 lg:p-10"
    >
      <div className="w-full max-w-4xl md:w-[90%] lg:w-[85%] bg-white p-6 sm:p-8 md:p-10 shadow-lg rounded-lg">
        {/* Header */}
        <RegistrationFormHeader
          croppedImage={croppedImage}
          setCroppedImage={setCroppedImage}
          imageError={imageError}
        />

        {/* Main Form */}
        <form className="space-y-4">
          <NameAndAddressSection
            handleChange={handleChange}
            formData={formData}
            errors={errors}
          />
          <AdharSection
            handleChange={handleChange}
            formData={formData}
            errors={errors}
          />
          <ParentsDetailsSection
            handleChange={handleChange}
            formData={formData}
            errors={errors}
          />
          <OfficeUseSection
            handleChange={handleChange}
            formData={formData}
            croppedImage={croppedImage}
            errors={errors}
          />

          {/* Submit Button */}
          <div
            id="submit-button"
            className="mt-6 flex justify-center text-center"
          >
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition mt-12"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
        {/* Footer (Exclude from PDF) */}
        <div
          id="footer"
          className="text-center text-[9px] text-gray-400 mt-12 opacity-70"
        >
          Made by -{" "}
          <a
            href="https://github.com/AtanuDebbarma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-600 transition-opacity duration-200"
          >
            Atanu Debbarma
          </a>
        </div>
      </div>
    </div>
  );
};

export default SamashtiRegistrationForm;
