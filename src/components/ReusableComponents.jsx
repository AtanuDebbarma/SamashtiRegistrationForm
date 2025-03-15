// Reusable Input Component
export const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  errors,
  name, // Ensure a unique key for error lookup
  disabled = false, // New disabled prop
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          className={`border border-gray-300 rounded-md p-2 resize-none w-full ${
            errors?.[name] ? "border-red-500" : ""
          } ${className}`}
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={disabled ? undefined : onChange}
          className={`border border-gray-300 rounded-md px-4 py-2 h-12 text-base leading-normal w-full
    ${errors?.[name] ? "border-red-500" : ""}
    ${className}`}
        />
      )}
      {errors?.[name] && <p className="text-red-500 text-xs">{errors[name]}</p>}
    </div>
  );
};

// Reusable Section Component
export const Section = ({ title, children }) => (
  <div className="bg-white p-4 sm:p-6 space-y-3">
    {title && <div className="text-lg font-semibold">{title}</div>}
    {children}
  </div>
);

// Parent Details Component
export const ParentDetails = ({ parent, values, handleChange, errors }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {Object.entries(parent).map(([key, label]) => (
      <InputField
        key={key}
        label={label}
        value={values[key] || ""}
        onChange={(e) => handleChange(key, e.target.value)}
        errors={errors}
        name={key}
      />
    ))}
  </div>
);
