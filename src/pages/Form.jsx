import { RegistrationFormHeader } from "../components/header/Header";
import NameAndAddressSection from "../components/nameAndAdress/NameAndAddressSection";
import ParentsDetailsSection from "../components/ParentsDetailsSection";
import AdharSection from "../components/adhar/AdharSection";
import OfficeUseSection from "../components/OfficeUseSection";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Modal from "../components/Modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    setIsModalOpen(true); // Open the modal on submit
  };

  const handleDownload = async () => {
    setIsModalOpen(false); // Close the modal before downloading
    const formElement = document.getElementById("samashti-form");
    const submitButton = document.getElementById("submit-button");
    const footer = document.getElementById("footer");
    const officeUseSection = document.getElementById("office-use-section"); // Add an ID to OfficeUseSection

    if (formElement && officeUseSection) {
      try {
        // Store original styles before modifying
        const originalFormStyles = {
          width: formElement.style.width,
          maxWidth: formElement.style.maxWidth,
          display: formElement.style.display,
          justifyContent: formElement.style.justifyContent,
        };

        const originalFooterStyles = {
          display: footer.style.display,
        };

        const originalOfficeUseSectionStyles = {
          display: officeUseSection.style.display,
        };

        const originalSubmitButtonStyles = {
          display: submitButton.style.display,
        };

        // Hide footer and OfficeUseSection for Page 1 capture
        footer.style.display = "none";
        officeUseSection.style.display = "none";

        // Force large screen layout
        formElement.style.width = "1024px";
        formElement.style.maxWidth = "1024px";
        formElement.style.justifyContent = "flex-start"; // Temporarily align to the left for capture

        // Temporarily hide submit button for clean screenshot
        submitButton.style.display = "none";

        // Capture Page 1 (without OfficeUseSection)
        const canvasPage1 = await html2canvas(formElement, {
          scale: 2,
          useCORS: true,
          logging: false,
        });

        // Restore form layout after capture
        formElement.style.width = originalFormStyles.width;
        formElement.style.maxWidth = originalFormStyles.maxWidth;
        formElement.style.justifyContent = originalFormStyles.justifyContent;
        formElement.style.display = originalFormStyles.display;

        submitButton.style.display = originalSubmitButtonStyles.display;
        footer.style.display = originalFooterStyles.display;

        // Convert Page 1 to JPEG
        const imgDataPage1 = canvasPage1.toDataURL("image/jpeg", 0.9);

        // Capture Page 2 (only OfficeUseSection)
        officeUseSection.style.display = "block"; // Show OfficeUseSection
        formElement.style.width = "1024px"; // Force large screen layout again
        formElement.style.maxWidth = "1024px";
        formElement.style.justifyContent = "flex-start"; // Temporarily align to the left for capture

        // Hide all other sections except OfficeUseSection
        const allSections = formElement.querySelectorAll("section");
        allSections.forEach((section) => {
          if (section.id !== "office-use-section") {
            section.style.display = "none";
          }
        });

        const canvasPage2 = await html2canvas(officeUseSection, {
          scale: 2,
          useCORS: true,
          logging: false,
        });

        // Restore all sections after capture
        allSections.forEach((section) => {
          section.style.display = "block";
        });

        // Restore form layout after capture
        formElement.style.width = originalFormStyles.width;
        formElement.style.maxWidth = originalFormStyles.maxWidth;
        formElement.style.justifyContent = originalFormStyles.justifyContent;
        formElement.style.display = originalFormStyles.display;

        officeUseSection.style.display = originalOfficeUseSectionStyles.display;

        // Convert Page 2 to JPEG
        const imgDataPage2 = canvasPage2.toDataURL("image/jpeg", 0.9);

        // Create PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm

        // Add Page 1
        const scaleFactorPage1 =
          Math.min(
            pdfWidth / canvasPage1.width,
            pdfHeight / canvasPage1.height
          ) * 0.96;
        const finalWidthPage1 = canvasPage1.width * scaleFactorPage1;
        const finalHeightPage1 = canvasPage1.height * scaleFactorPage1;
        const xOffsetPage1 = (pdfWidth - finalWidthPage1) / 2;
        const yOffsetPage1 = (pdfHeight - finalHeightPage1) / 2;

        pdf.addImage(
          imgDataPage1,
          "JPEG",
          xOffsetPage1,
          yOffsetPage1,
          finalWidthPage1,
          finalHeightPage1
        );

        // Add Page 2
        pdf.addPage();
        const scaleFactorPage2 =
          Math.min(
            pdfWidth / canvasPage2.width,
            pdfHeight / canvasPage2.height
          ) * 0.96;
        const finalWidthPage2 = canvasPage2.width * scaleFactorPage2;
        const finalHeightPage2 = canvasPage2.height * scaleFactorPage2;
        const xOffsetPage2 = (pdfWidth - finalWidthPage2) / 2;
        const yOffsetPage2 = (pdfHeight - finalHeightPage2) / 2 - 70; // Subtract 10mm to move content up

        pdf.addImage(
          imgDataPage2,
          "JPEG",
          xOffsetPage2,
          yOffsetPage2, // Adjusted yOffset to move content up
          finalWidthPage2,
          finalHeightPage2
        );
        // Save PDF
        pdf.save("Samashti_Registration_Form.pdf");

        console.log("PDF Downloaded!");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 sm:p-6 md:p-8 lg:p-10">
      <div
        id="samashti-form"
        className="w-full max-w-4xl md:w-[90%] lg:w-[85%] bg-white p-6 sm:p-8 md:p-10 shadow-lg rounded-lg"
      >
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
          <div id="office-use-section">
            <OfficeUseSection
              handleChange={handleChange}
              formData={formData}
              croppedImage={croppedImage}
              errors={errors}
            />
          </div>

          {/* Submit Button */}
          {imageError && (
            <p
              className="text-red-500 text-[12px] flex justify-center text-center"
              style={{ marginTop: "4%" }}
            >
              Photo is required! Upload from top of the form.
            </p>
          )}
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
      {/* Modal */}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default SamashtiRegistrationForm;
