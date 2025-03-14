import { InputField } from "../ReusableComponents";

const NameAndAddressSection = ({ handleChange, formData, errors }) => {
  return (
    <div className="space-y-4 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Registration No. : 2025/ (To be prrovided by institution)"
          value={formData.registrationNo}
          onChange={(e) => handleChange("registrationNo", e.target.value)}
          errors={errors}
          name="registrationNo"
        />
        <InputField
          label="Date of Birth : "
          value={formData.dateOfBirth}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          errors={errors}
          name="dateOfBirth"
        />
      </div>

      <InputField
        label="Name : "
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        errors={errors}
        name="name"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Mobile No. : "
          value={formData.mobileNo}
          onChange={(e) => handleChange("mobileNo", e.target.value)}
          errors={errors}
          name="mobileNo"
        />
        <InputField
          label="WhatsApp No. : "
          value={formData.whatsappNo}
          onChange={(e) => handleChange("whatsappNo", e.target.value)}
          errors={errors}
          name="whatsappNo"
        />
      </div>

      <InputField
        label="Address : "
        value={formData.address}
        onChange={(e) => handleChange("address", e.target.value)}
        type="textarea"
        errors={errors}
        name="address"
      />

      <div className="flex justify-start">
        <InputField
          label="Pin Code : "
          value={formData.pinCode}
          onChange={(e) => handleChange("pinCode", e.target.value)}
          className="w-40"
          errors={errors}
          name="pinCode"
        />
      </div>
    </div>
  );
};

export default NameAndAddressSection;
