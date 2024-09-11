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

// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

    console.log(profileData);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 max-w-4xl mx-auto"
      >
        <div>
          <div className="flex flex-col space-y-6 border-b border-b-gray-200 pb-3">
            <div className="flex items-center space-x-7">
              <div className="relative">
                <div className="border border-gray-300 p-1 rounded-full">
                  <Image
                    src="/images/test-avatar-3.jpg"
                    width={80}
                    height={80}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
                <div className="absolute bottom-2 -right-2">
                  <Image src="/icons/edit.svg" alt="" width={13} height={13} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900">
                  Kayode Otitoju
                </span>
                <span className="text-sm text-gray-500">Product Manager</span>
              </div>
            </div>
          </div>
          <div className="py-3">
            <label className="block text-gray-700 text-sm">Avatar</label>
            <div
              {...getRootProps()}
              className="mt-1 p-6 border border-gray-300 border-dashed rounded-md flex justify-center items-center cursor-pointer text-sm text-gray-600 hover:border hover:border-solid hover:border-gray-400 active:border-blue-700"
            >
              <input {...getInputProps()} />
              {avatar ? (
                <p>{avatar.name} kjfg</p>
              ) : (
                <p>Drag and drop an image, or click to select an avatar</p>
              )}
            </div>
            {errors.avatar && (
              <p className="text-red-500">{errors.avatar.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Input
            id="first_name"
            label="First Name"
            placeholder="Kayode"
            value={watch("first_name")}
            onChange={(e) => setValue("first_name", e.target.value)}
            error={errors.first_name?.message}
            otherClasses={methods.register("first_name")}
          />
          <Input
            id="last_name"
            label="Last Name"
            value={watch("last_name")}
            onChange={(e) => setValue("last_name", e.target.value)}
            error={errors.last_name?.message}
            otherClasses={methods.register("last_name")}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm">Bio</label>
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

        <Input
          id="location"
          label="Location"
          value={watch("location")}
          onChange={(e) => setValue("location", e.target.value)}
          error={errors.location?.message}
          otherClasses={methods.register("location")}
        />

        <div className="grid grid-cols-2 gap-6">
          <Input
            id="phone"
            label="Phone"
            type="text"
            value={watch("phone")}
            onChange={(e) => setValue("phone", e.target.value)}
            error={errors.phone?.message}
            otherClasses={methods.register("phone")}
          />
          <Input
            id="website"
            label="Website"
            type="url"
            value={watch("website")}
            onChange={(e) => setValue("website", e.target.value)}
            error={errors.website?.message}
            otherClasses={methods.register("website")}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            id="linkedin"
            label="LinkedIn"
            type="url"
            value={watch("linkedin")}
            onChange={(e) => setValue("linkedin", e.target.value)}
            error={errors.linkedin?.message}
            otherClasses={methods.register("linkedin")}
          />
          <Input
            id="github"
            label="GitHub"
            type="url"
            value={watch("github")}
            onChange={(e) => setValue("github", e.target.value)}
            error={errors.github?.message}
            otherClasses={methods.register("github")}
          />
        </div>
        <div className="py-3">
          <label className="block text-gray-700 text-sm">
            Resume (.docx, .doc, .pdf)
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
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">
            Profile Visibility
          </label>
          <div className="flex items-center space-x-4 mt-1 text-sm">
            <label className="flex items-center">
              <input
                type="radio"
                value="public"
                checked={visibilityStatus === "public"}
                onChange={() => setVisibilityStatus("public")}
                className="form-radio"
              />
              <span className="ml-2">Public</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="private"
                checked={visibilityStatus === "private"}
                onChange={() => setVisibilityStatus("private")}
                className="form-radio"
              />
              <span className="ml-2">Private</span>
            </label>
          </div>
        </div>
        <div>
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <ReactSelectComponent
                name="languages"
                label="Languages"
                options={languagesOptions}
                isMulti={true}
                error={errors.languages?.message}
              />
            )}
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
