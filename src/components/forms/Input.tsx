import React, { useState } from "react";
import Image from "next/image";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  otherClasses: any;
  error: string;
  icon?: any;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  otherClasses,
  placeholder,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <div className="relative z-0 w-full group">
        <label
          htmlFor={id}
          // className={`absolute flex  items-center space-x-2 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 ${
          //   isFocused || value !== "" ? "scale-75 -translate-y-6" : ""
          // }`}
          className="text-sm mb-1 text-gray-600 inline-block"
        >
          {icon}
          <span>{label}</span>
        </label>
        <input
          {...otherClasses}
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(value !== "")}
          className="block py-3 rounded-xl pl-4 w-full text-sm text-gray-900 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border focus:border-blue-600 peer hover:border-gray-400"
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;