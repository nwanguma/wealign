import React, { useState } from "react";
import Select, { components, MultiValueProps, OptionProps } from "react-select";

interface Option {
  value: string;
  label: string;
}

const CustomMultiValue = (props: MultiValueProps<Option>) => {
  return (
    <components.MultiValue {...props}>
      <div
        className="flex items-center bg-transparent text-blue-600 pl-1 py-0 rounded-lg"
        style={{ fontSize: "13px" }}
      >
        <span>{props.children}</span>
      </div>
    </components.MultiValue>
  );
};

const CustomOption = (props: OptionProps<Option>) => {
  return (
    <components.Option {...props}>
      <div
        className={`cursor-pointer px-1 py-1 transition-colors w-full text-sm text-blue-700`}
      >
        {props.children}
      </div>
    </components.Option>
  );
};

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    padding: "0.45rem",
    borderRadius: "0.8rem",
    borderColor: state.isFocused ? "#2563EB" : "#D1D5DB",
    boxShadow: "none",
    // "&:hover": {
    //   borderColor: "#2563EB",
    // },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9CA3AF",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#DBEAFE",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#2563EB",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#2563EB",
    cursor: "pointer",
    "&:hover": {
      color: "#1E40AF",
    },
  }),
};

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState<Option[] | null>(null);

  const options: Option[] = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "typescript", label: "TypeScript" },
  ];

  return (
    <div className="w-full">
      <span className="text-sm text-gray-600 mb-1 inline-block">Languages</span>
      <Select
        isMulti
        options={options}
        value={selectedOption}
        onChange={(selected) => setSelectedOption(selected as Option[] | null)}
        closeMenuOnSelect={false}
        placeholder="Select skills..."
        components={{
          MultiValue: CustomMultiValue,
          Option: CustomOption,
          IndicatorSeparator: () => null,
        }}
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default CustomSelect;