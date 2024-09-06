import React, { useState } from "react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative z-0 w-full mb-6 group">
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value !== "")}
        className="block py-4 rounded-xl pl-4 w-full text-sm text-gray-900 bg-gray-100 appearance-none focus:outline-none focus:ring-0 focus:border focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 ${
          isFocused || value !== "" ? "scale-75 -translate-y-6" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
