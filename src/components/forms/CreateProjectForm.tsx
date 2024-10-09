import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import NativeSelect from "./NativeSelectComponent";
import ReactSelectComponent from "./ReactSelectComponent";

import Image from "next/image";

import Input from "./Input";

import "react-quill/dist/quill.snow.css";
// import "tailwindcss/tailwind.css";

import "../../app/globals.css";

import { Skill } from "@/common/constants";
import AddItemInput from "./AddItemInput";

// {
//     "title": "New Project Title",
//     "description": "This is a description of the project.",
//     "website": "https://example.com",
//     "githubUrl": "https://github.com/thenewproject",
//     "collaborators": [
//         "c2415009-3c52-4b0d-bb2d-c5cfbaf3c802"
//     ],
//     "skills": [
//         {
//             "title": "JavaScript"
//         },
//         {
//             "title": "TypeScript"
//         }
//     ]
// }

// Dynamically import ReactQuill with a fallback loader
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="quill-skeleton h-48 border border-gray-300 rounded-lg"></div>
  ),
});

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Must be at least 2 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(2, "Must be at least 2 characters"),
  location: yup.string().required("Location is required"),
  status: yup.string().required("Location is required"),
  phone: yup
    .string()
    .matches(
      /^\+\d{1,14}$/,
      "Phone number must be in international format (+1234567890)"
    ),
  website: yup.string().url("Must be a valid URL"),
  github_url: yup.string().url("Must be a valid URL"),
  skills: yup.array(),
});

const UpdateProfileForm: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [bio, setBio] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const [visibilityStatus, setVisibilityStatus] = useState<
    "public" | "private"
  >("public");
  const [attachement, setAttachment] = useState<File | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const skillsOptions = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
  ];

  // const handleAttachmentDrop = (acceptedFiles: File[]) => {
  //   setAttachment(acceptedFiles[0]);
  //   setValue("attachement", acceptedFiles[0]);
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: handleAttachmentDrop,
  //   accept: { "image/*": [] },
  //   maxFiles: 1,
  // });

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(selectedSkills.map((s) => ({ title: s.label })));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 max-w-4xl mx-auto"
      >
        <div>
          <Input
            id="title"
            label="Title"
            value={watch("title")}
            onChange={(e) => setValue("title", e.target.value)}
            error={errors.title?.message}
            otherClasses={methods.register("title")}
          />
        </div>
        <div>
          <Input
            id="website"
            label="Website"
            type="url"
            value={watch("website") as string}
            onChange={(e) => setValue("website", e.target.value)}
            error={errors.website?.message}
            otherClasses={methods.register("website")}
            placeholder="https://"
          />
        </div>
        <div>
          <Input
            id="github_url"
            label="Repository URL"
            value={watch("github_url") as string}
            onChange={(e) => setValue("github_url", e.target.value)}
            error={errors.github_url?.message}
            otherClasses={methods.register("github_url")}
            placeholder="https://github.com/user/your-project-url"
          />
        </div>
        <div className="w-full">
          <label className="text-sm mb-1 text-gray-600 inline-block">
            Start Date
          </label>
          <div className="relative w-full">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              className="block py-3 pl-10 rounded-xl !pr-0 !w-full text-sm text-gray-600 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border focus:border-blue-600 peer hover:border-gray-400"
              placeholderText="Select start date"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image
                src="/icons/calendar.svg"
                alt="Calendar"
                width={22}
                height={22}
              />
            </div>
          </div>
        </div>
        <NativeSelect
          id="status"
          label="Status"
          placeholder="Select Status"
          value={watch("status") as string}
          error={errors?.status?.message}
          options={[{ value: "collaborators", label: "Need collaborators" }]}
          otherClasses={methods.register("status")}
        />
        <div>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <ReactSelectComponent
                label="Skills"
                options={skillsOptions}
                placeholder="Select skills"
                error={errors.skills?.message as string}
                setSelectedOption={setSelectedSkills}
                selectedOption={selectedSkills}
              />
            )}
          />
        </div>
        <AddItemInput label="Collaborators" />
        {/* <div className="py-3">
          <label className="block text-gray-700 text-sm">
            Attachments (.docx, .doc, .pdf)
          </label>
          <div
            {...getRootProps()}
            className="mt-1 p-6 border border-gray-300 border-dashed rounded-md flex justify-center items-center cursor-pointer text-sm text-gray-600 hover:border hover:border-solid hover:border-gray-400 active:border-blue-700"
          >
            <input {...getInputProps()} />
            {avatar ? (
              <p>{avatar.name} kjfg</p>
            ) : (
              <p>Drag and drop a file, or click to select a document</p>
            )}
          </div>
          {errors.avatar && (
            <p className="text-red-500">{errors.avatar.message}</p>
          )}
        </div> */}
        {/* <div>
          <label className="block text-gray-700 text-sm">Description</label>
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <ReactQuill
                value={field.value || bio}
                onChange={(content) => {
                  setBio(content);
                  field.onChange(content);
                }}
                className="custom-quill"
                placeholder="Write a short bio..."
                theme="snow"
              />
            )}
          />
          {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
        </div> */}
        <div className="flex items-center space-x-2 justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-sm bg-white text-gray-600 border border-gray-300 rounded-md hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateProfileForm;
