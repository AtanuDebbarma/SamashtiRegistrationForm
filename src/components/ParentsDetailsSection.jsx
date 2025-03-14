import { ParentDetails } from "./ReusableComponents";

const ParentsDetailsSection = ({ handleChange, formData, errors }) => {
  const fatherDetails = {
    fatherName: "Father's Name : ",
    fatherOccupation: "Occupation : ",
    fatherEducationalQualifications: "Educational Qualifications : ",
    fatherPostGraduation: "Post Graduation : ",
    fatherUniversityCollege: "University/College : ",
    fatherGraduation: "Graduation : ",
    fatherIntermediateYear: "Intermediate Year : ",
    fatherSubject: "Subject : ",
    fatherSchoolName: "School Name : ",
    fatherHighSchool: "High School : ",
  };

  const motherDetails = {
    motherName: "Mother's Name : ",
    motherOccupation: "Occupation : ",
    motherEducationalQualifications: "Educational Qualifications : ",
    motherPostGraduation: "Post Graduation : ",
    motherUniversityCollege: "University/College : ",
    motherGraduation: "Graduation : ",
    motherIntermediateYear: "Intermediate Year : ",
    motherSubject: "Subject : ",
    motherSchoolName: "School Name : ",
    motherHighSchool: "High School : ",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
        {/* Father's Details */}
        <ParentDetails
          parent={fatherDetails}
          values={formData}
          handleChange={handleChange}
          errors={errors}
        />

        {/* Perfectly Centered Divider */}
        <div className="hidden md:flex bg-gray-400 h-auto w-[2px] mx-2"></div>

        {/* Mother's Details */}
        <ParentDetails
          parent={motherDetails}
          values={formData}
          handleChange={handleChange}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default ParentsDetailsSection;
