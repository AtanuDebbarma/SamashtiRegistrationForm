import { RegistrationFormHeader } from "../components/header/Header";
import NameAndAddressSection from "../components/nameAndAdress/NameAndAddressSection";
import ParentsDetailsSection from "../components/ParentsDetailsSection";
import AdharSection from "../components/adhar/AdharSection";
import OfficeUseSection from "../components/OfficeUseSection";
import useRegistrationForm from "../helpers/userRegistartionForm";

const SamashtiRegistrationForm = () => {
  const {
    formData,
    croppedImage,
    errors,
    imageError,
    handleChange,
    setCroppedImage,
    handleSubmit,
  } = useRegistrationForm();

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
          {imageError && (
            <p className="text-red-500 text-[12px] flex justify-center text-center" style={{marginTop:'4%'}}>
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
    </div>
  );
};

export default SamashtiRegistrationForm;
