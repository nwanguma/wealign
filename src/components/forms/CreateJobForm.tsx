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
  first_name: yup
    .string()
    .required("First name is required")
    .min(2, "Must be at least 2 characters"),
  last_name: yup
    .string()
    .required("Last name is required")
    .min(2, "Must be at least 2 characters"),
  location: yup.string().required("Location is required"),
  phone: yup
    .string()
    .matches(
      /^\+\d{1,14}$/,
      "Phone number must be in international format (+1234567890)"
    ),
  website: yup.string().url("Must be a valid URL"),
  linkedin: yup.string().url("Must be a valid URL"),
  github: yup.string().url("Must be a valid URL"),
  resume: yup.string().url("Must be a valid URL"),
  bio: yup
    .string()
    .required("Bio is required")
    .min(10, "Bio must be at least 10 characters"),
  avatar: yup.mixed().required("Avatar is required"),
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
  const [avatar, setAvatar] = useState<File | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const languagesOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
  ];

  const skillsOptions = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
  ];

  const handleAvatarDrop = (acceptedFiles: File[]) => {
    setAvatar(acceptedFiles[0]);
    setValue("avatar", acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleAvatarDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const onSubmit = (data: any) => {
    const profileData = {
      ...data,
      avatar,
      languages: selectedLanguages.map((l) => l.value),
      skills: selectedSkills.map((s) => ({ title: s.label })),
    };
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 max-w-4xl mx-auto"
      >
        <div>
          <Input
            id="first_name"
            label="Title"
            placeholder="Kayode"
            value={watch("first_name")}
            onChange={(e) => setValue("first_name", e.target.value)}
            error={errors.first_name?.message}
            otherClasses={methods.register("first_name")}
          />
        </div>
        <div>
          <Input
            id="first_name"
            label="Website"
            type="url"
            value={watch("first_name")}
            onChange={(e) => setValue("first_name", e.target.value)}
            error={errors.first_name?.message}
            otherClasses={methods.register("first_name")}
            placeholder="https://"
          />
        </div>
        <div>
          <Input
            id="last_name"
            label="Repository URL"
            value={watch("last_name")}
            onChange={(e) => setValue("last_name", e.target.value)}
            error={errors.last_name?.message}
            otherClasses={methods.register("last_name")}
            placeholder="https://github.com/user/your-project-url"
          />
        </div>
        <div>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <ReactSelectComponent
                name="skills"
                label="Skills"
                options={skillsOptions}
                isMulti={true}
                error={errors.skills?.message}
              />
            )}
          />
        </div>
        <div className="py-3">
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
        </div>
        <div>
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
        </div>
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