import { InputField } from "../ReusableComponents";

const AdharSection = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Name of the last School attended : "
          value={formData.lastSchool}
          onChange={(e) => handleChange("lastSchool", e.target.value)}
          errors={errors}
          name="lastSchool"
        />
        <InputField
          label="Class : "
          value={formData.class}
          onChange={(e) => handleChange("class", e.target.value)}
          errors={errors}
          name="class"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Permanent Education Number : "
          value={formData.permanentEducationNo}
          onChange={(e) => handleChange("permanentEducationNo", e.target.value)}
          errors={errors}
          name="permanentEducationNo"
        />
        <InputField
          label="Category : "
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          errors={errors}
          name="category"
        />
      </div>

      <InputField
        label="Aadhaar No. : "
        value={formData.aadhaarNo}
        onChange={(e) => handleChange("aadhaarNo", e.target.value)}
        errors={errors}
        name="aadhaarNo"
      />
    </div>
  );
};

export default AdharSection;
