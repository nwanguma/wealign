import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import "tailwindcss/tailwind.css";

interface PersonOption {
  value: string;
  label: string;
}

const AddEventForm: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState<string>("");
  const [selectedPeople, setSelectedPeople] = useState<PersonOption[]>([]);
  const [banner, setBanner] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);

  const peopleOptions: PersonOption[] = [
    { value: "1", label: "John Doe" },
    { value: "2", label: "Jane Smith" },
  ];

  const handleBannerDrop = (acceptedFiles: File[]) => {
    setBanner(acceptedFiles[0]);
  };

  const handleDocumentsDrop = (acceptedFiles: File[]) => {
    setDocuments(acceptedFiles);
  };

  const { getRootProps: getBannerProps, getInputProps: getBannerInputProps } =
    useDropzone({
      onDrop: handleBannerDrop,
      accept: "image/*" as any,
    });

  const { getRootProps: getDocsProps, getInputProps: getDocsInputProps } =
    useDropzone({
      onDrop: handleDocumentsDrop,
      accept: ".pdf,.doc,.docx" as any,
    });

  return (
    <form className="space-y-6 p-6 bg-white max-w-4xl mx-auto">
      {/* Event Name */}
      <div>
        <label className="block text-gray-700">Event Name</label>
        <input
          type="text"
          className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter event name"
        />
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholderText="Select end date"
          />
        </div>
      </div>

      {/* Invite People */}
      <div>
        <label className="block text-gray-700">Invite People</label>
        <Select
          isMulti
          options={peopleOptions}
          value={selectedPeople}
          onChange={(selected) => setSelectedPeople(selected as PersonOption[])}
          className="mt-1"
          placeholder="Select people to invite"
        />
      </div>

      {/* Description Textbox with Advanced Editing */}
      <div>
        <label className="block text-gray-700">Event Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="mt-1"
          placeholder="Describe the event"
          theme="snow"
        />
      </div>

      {/* Event Banner Upload */}
      <div>
        <label className="block text-gray-700">Event Banner</label>
        <div
          {...getBannerProps()}
          className="mt-1 p-6 border-dashed border-2 rounded-md flex justify-center items-center cursor-pointer"
        >
          <input {...getBannerInputProps()} />
          {banner ? (
            <p>{banner.name}</p>
          ) : (
            <p>Drag and drop banner image here, or click to select</p>
          )}
        </div>
      </div>

      {/* Event Documents Upload */}
      <div>
        <label className="block text-gray-700">Event Documents</label>
        <div
          {...getDocsProps()}
          className="mt-1 p-6 border-dashed border-2 rounded-md flex justify-center items-center cursor-pointer"
        >
          <input {...getDocsInputProps()} />
          {documents.length > 0 ? (
            <ul>
              {documents.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p>Drag and drop documents here, or click to select</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Create Event
      </button>
    </form>
  );
};

export default AddEventForm;
