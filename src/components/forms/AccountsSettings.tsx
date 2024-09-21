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
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
    });

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

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
            label="Email"
            placeholder="Kayode"
            value={watch("first_name")}
            onChange={(e) => setValue("first_name", e.target.value)}
            error={errors.first_name?.message}
            otherClasses={methods.register("first_name")}
          />
        </div>
        <div>
          <h2 className="font-medium mb-4">Reset Password</h2>
          <div className="mb-3">
            <Input
              id="first_name"
              label="Old Password"
              placeholder=""
              value={watch("first_name")}
              onChange={(e) => setValue("first_name", e.target.value)}
              error={errors.first_name?.message}
              otherClasses={methods.register("first_name")}
            />
          </div>
          <div>
            <Input
              id="first_name"
              label="New Password"
              placeholder=""
              value={watch("first_name")}
              onChange={(e) => setValue("first_name", e.target.value)}
              error={errors.first_name?.message}
              otherClasses={methods.register("first_name")}
            />
          </div>
        </div>
        <div>
          <h2 className="font-medium mb-4">Localization</h2>
          <p className="text-sm text-gray-500 mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            sit sint? Deserunt expedita eligendi.
          </p>
          <div>
            <Input
              id="first_name"
              label="Country/Region"
              placeholder="Kayode"
              value={watch("first_name")}
              onChange={(e) => setValue("first_name", e.target.value)}
              error={errors.first_name?.message}
              otherClasses={methods.register("first_name")}
            />
          </div>
        </div>
        <div>
          <h2 className="font-medium mb-4">Notification Settings</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onChange={handleNotificationChange}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={notificationSettings.smsNotifications}
                onChange={handleNotificationChange}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">SMS Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={notificationSettings.pushNotifications}
                onChange={handleNotificationChange}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">Push Notifications</span>
            </label>
          </div>
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
