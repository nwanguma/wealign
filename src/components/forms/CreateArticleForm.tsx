import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import { Event } from "@/common/constants";

import Image from "next/image";
import Input from "./Input";

import "react-quill/dist/quill.snow.css";
import "../../app/globals.css";

import TextArea from "./TextArea";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Must be at least 2 characters"),
  banner: yup.mixed(),
  // event_start_date: yup
  //   .string()
  //   .required("Start date is required")
  //   .min(2, "Must be at least 2 characters"),
  // event_end_date: yup
  //   .string()
  //   .required("End date is required")
  //   .min(2, "Must be at least 2 characters"),
  website: yup.string().url("Must be a valid URL"),
  ticket_link: yup.string().url("Must be a valid URL"),
  link: yup.string().url("Must be a valid URL"),
  location: yup.string().required("Location is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

const createEvent = async (data: Partial<Event>) => {
  const result = await axiosInstance.post("/api/proxy/events", data);

  return result?.data?.data;
};

const CreateArticleForm: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    // control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const createEventMutation = useMutation({
    mutationFn: (data: Partial<Event>) => createEvent(data),
    onSuccess: (data: Event) => {},
    onError: (error: any) => {},
  });

  const [banner, setBanner] = useState<File | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // const handleBannerDrop = (acceptedFiles: File[]) => {
  //   setAvatar(acceptedFiles[0]);
  //   setValue("avatar", acceptedFiles[0]);
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: handleBannerDrop,
  //   accept: { "image/*": [] },
  //   maxFiles: 1,
  // });

  const onSubmit = (data: any) => {
    (async function () {
      await createEventMutation.mutate({
        ...data,
        event_start_date: startDate,
        event_end_date: endDate,
      });
    })();
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
            error={errors.title?.message as string}
            otherClasses={methods.register("title")}
          />
        </div>
        <Input
          id="banner"
          label="Banner"
          placeholder="https://example.jpg"
          value={watch("banner") as string}
          onChange={(e) => setValue("banner", e.target.value)}
          error={errors.banner?.message as string as string}
          otherClasses={methods.register("banner")}
        />
        {/* <div className="py-3">
          <label className="block text-gray-700 text-sm">Banner</label>
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
        </div> */}
        <div className="grid grid-cols-2 gap-6">
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
          <div className="w-full">
            <label className="text-sm mb-1 text-gray-600 inline-block">
              End Date
            </label>
            <div className="relative w-full">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                className="block py-3 pl-10 rounded-xl !pr-0 !w-full text-sm text-gray-600 border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border focus:border-blue-600 peer hover:border-gray-400"
                placeholderText="Select start date"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image
                  src="/icons/calendar.svg" // Path to your SVG file
                  alt="Calendar"
                  width={22}
                  height={22}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Input
            id="website"
            label="Website"
            type="url"
            value={watch("website") as string}
            onChange={(e) => setValue("website", e.target.value)}
            error={errors.website?.message as string}
            otherClasses={methods.register("website")}
            placeholder="https://"
          />
        </div>
        <div>
          <Input
            id="ticket_link"
            label="Ticket Link"
            value={watch("ticket_link") as string}
            onChange={(e) => setValue("ticket_link", e.target.value)}
            error={errors.ticket_link?.message as string}
            otherClasses={methods.register("ticket_link")}
            placeholder="https://"
          />
        </div>
        <div>
          <Input
            id="link"
            label="Event link (for virtual events)"
            value={watch("link") as string}
            onChange={(e) => setValue("link", e.target.value)}
            error={errors.link?.message as string}
            otherClasses={methods.register("link")}
            placeholder="https://"
          />
        </div>
        <div>
          <Input
            id="location"
            label="Location"
            value={watch("location")}
            onChange={(e) => setValue("location", e.target.value)}
            error={errors.location?.message as string}
            otherClasses={methods.register("location")}
            required
          />
        </div>
        <TextArea
          id="description"
          label="Description"
          value={watch("description")}
          onChange={(e) => setValue("description", e.target.value)}
          error={errors.description?.message as string}
          otherClasses={methods.register("description")}
        />
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
          {errors.attachment && (
            <p className="text-red-500">{errors.attachment.message}</p>
          )}
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

export default CreateArticleForm;
