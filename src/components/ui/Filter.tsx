import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";

interface SortByProps {
  onSortChange: (sortBy: string) => void;
}

const SortBy: React.FC<SortByProps> = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState<string>("");

  const sortOptions = [
    { value: "", label: "Sort By" },
    { value: "date_created", label: "Start Date" },
    { value: "number_of_views", label: "Views" },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSortBy(selectedValue);
    onSortChange(selectedValue);
  };

  return (
    <div className="relative">
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="block w-32 text-gray-700 pl-3 pr-10 py-2 text-base appearance-none border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-700">
        <svg
          fill="currentColor"
          className="w-4 h-4"
          viewBox="0 0 35 35"
          id="Layer_2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.42,34.44a1.25,1.25,0,0,1-1.25-1.25V1.81a1.25,1.25,0,0,1,2.5,0V33.19A1.25,1.25,0,0,1,5.42,34.44Z" />
          <path d="M9.34,27.41H1.5a1.25,1.25,0,0,1,0-2.5H9.34a1.25,1.25,0,0,1,0,2.5Z" />
          <path d="M29.58,34.44a1.25,1.25,0,0,1-1.25-1.25V1.81a1.25,1.25,0,1,1,2.5,0V33.19A1.25,1.25,0,0,1,29.58,34.44Z" />
          <path d="M33.5,27.41H25.66a1.25,1.25,0,0,1,0-2.5H33.5a1.25,1.25,0,0,1,0,2.5Z" />
          <path d="M17.5,34.44a1.25,1.25,0,0,1-1.25-1.25V1.81a1.25,1.25,0,1,1,2.5,0V33.19A1.25,1.25,0,0,1,17.5,34.44Z" />
          <path d="M21.42,10.09H13.58a1.25,1.25,0,0,1,0-2.5h7.84a1.25,1.25,0,0,1,0,2.5Z" />
        </svg>
      </div>
    </div>
  );
};

interface SelectInputProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="w-36">
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-36 pl-3 pr-10 py-2 text-base text-gray-700 appearance-none border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

interface DatePickerInputProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  selectedDate,
  onChange,
  placeholder,
}) => {
  return (
    <div className="relative">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        className="block w-32 pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Image
          src="/icons/calendar.svg"
          alt="Calendar Icon"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

const DashboardSearchInput: React.FC = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search profile, skill, title..."
        className="w-64 pl-2 py-1.5 pr-12 border border-gray-300 placeholder:text-sm text-gray-600 rounded-md focus:border-blue-500 focus:outline-none focus:ring-0 focus:ring-blue-500"
      />
    </div>
  );
};

const FilterComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<string>("");

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "marketing", label: "Marketing" },
    { value: "design", label: "Design" },
  ];

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row flex-wrap md:items-center md:gap-2">
        <DashboardSearchInput />
        <SelectInput
          id="category"
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={setCategory}
        />
        <SelectInput
          id="category"
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={setCategory}
        />
        <div className="flex space-x-2 items-center">
          <DatePickerInput
            selectedDate={startDate}
            onChange={setStartDate}
            placeholder="Start Date"
          />
          <DatePickerInput
            selectedDate={endDate}
            onChange={setEndDate}
            placeholder="End Date"
          />
        </div>
        <button className="px-3 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 flex items-center">
          <svg
            fill="#ffffff"
            className="w-4 h-4"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m0 .011 741.97 984.808v673.566l502.665 251.332V984.82l675.332-896.544-88.154-66.308-697.508 925.891v783.345L852.301 1590.2V947.858L221.322 110.341h1262.289V.011z"
              fill-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div>
        <SortBy onSortChange={() => undefined} />
      </div>
    </div>
  );
};

export default FilterComponent;
