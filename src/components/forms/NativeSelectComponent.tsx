import React from "react";
import { useFormContext } from "react-hook-form";

interface NativeSelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

const NativeSelect: React.FC<NativeSelectProps> = ({
  id,
  label,
  options,
  error,
}) => {
  const { register } = useFormContext();

  return (
    <div className="relative z-0 w-full mb-6 group">
      <select
        {...register(id, { required: "This field is required" })}
        className="block py-3 rounded-xl pl-4 w-full text-sm text-gray-900 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border focus:border-blue-600 peer"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
        {label}
      </label>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default NativeSelect;
