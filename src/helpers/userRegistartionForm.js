import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const useRegistrationForm = () => {
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
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
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

    if (!croppedImage) {
      newErrors.croppedImage = "Photo is required";
      setImageError(true);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (croppedImage) {
      setImageError(false);
    }
  }, [croppedImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formElement = document.getElementById("samashti-form");
    const submitButton = document.getElementById("submit-button");
    const footer = document.getElementById("footer");

    if (formElement) {
      try {
        footer.style.display = "none";
        submitButton.style.display = "none";

        const canvas = await html2canvas(formElement, {
          scale: 2,
          useCORS: true,
        });

        footer.style.display = "block";
        submitButton.style.display = "block";

        const pdf = new jsPDF("p", "mm", "a2");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 420, 594);
        pdf.save("Samashti_Registration_Form.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  return {
    formData,
    croppedImage,
    errors,
    imageError,
    handleChange,
    setCroppedImage,
    handleSubmit,
  };
};

export default useRegistrationForm;
