import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import React, { ChangeEvent, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import { Event } from "@/common/constants";
import NativeSelect from "./NativeSelectComponent";
import Link from "next/link";
import Image from "next/image";
import Input from "./Input";

import "react-quill/dist/quill.snow.css";
import "../../app/globals.css";

import TextArea from "./TextArea";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getFilenameAndExtension } from "@/lib/helpers";
import { WithTooltip } from "../ui/WithTooltip";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Must be at least 2 characters"),
  banner: yup.string().required(),
  attachment: yup.string(),
  type: yup.string().required("Event type is required"),
  website: yup.string().url("Must be a valid URL"),
  ticket_link: yup.string().url("Must be a valid URL"),
  link: yup
    .string()
    .url("Must be a valid URL")
    .when("type", (type: any, schema) => {
      return type === "hybrid" || type === "virtual"
        ? schema.required("Link is required for hybrid or virtual events")
        : schema.notRequired();
    }),
  location: yup.string().when("type", (type: any, schema) => {
    return type === "hybrid" || type === "onsite"
      ? schema.required("Location is required for hybrid or onsite events")
      : schema.notRequired();
  }),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

const createEvent = async (data: Partial<Event>) => {
  const result = await axiosInstance.post("/api/proxy/events", data);

  return result?.data?.data;
};

const updateEvent = async (data: Partial<Event>, id: string) => {
  const result = await axiosInstance.put(`/api/proxy/events/${id}`, data);

  return result?.data?.data;
};

interface ICreateEventForm {
  data?: Partial<Project>;
  handleModalClose?: () => void;
  triggerRefetch?: () => void;
}

const CreateEventForm: React.FC<ICreateEventForm> = ({
  data: eventsData,
  handleModalClose,
  triggerRefetch,
}) => {
  const defaultValues = {
    title: eventsData?.title || "",
    banner: eventsData?.banner || "",
    attachment: eventsData?.attachment || "",
    type: eventsData?.type || "",
    website: eventsData?.website || "",
    ticket_link: eventsData?.ticket_link || "",
    link: eventsData?.link || "",
    location: eventsData?.location || "",
    description: eventsData?.description || "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    // control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const createEventMutation = useMutation({
    mutationFn: (data: Partial<Event>) =>
      eventsData ? updateEvent(data, eventsData?.id) : createEvent(data),
    onSuccess: (data: Event) => {
      handleModalClose && handleModalClose();
      triggerRefetch && triggerRefetch();
    },
    onError: (error: any) => {},
  });

  console.log(eventsData, "******");

  const [banner, setBanner] = useState<File | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [startDate, setStartDate] = useState(
    eventsData?.event_start_date
      ? new Date(eventsData.event_start_date)
      : new Date()
  );
  const [endDate, setEndDate] = useState(
    eventsData?.event_end_date
      ? new Date(eventsData.event_end_date)
      : new Date()
  );
  const [deletedAttachment, setDeletedAttachment] = useState(false);
  const [deletedBanner, setDeletedBanner] = useState(false);

  const handleBannerDrop = (acceptedFiles: File[]) => {
    setBanner(acceptedFiles[0]);

    (async function () {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const result = await axiosInstance.post(
        "/api/proxy/files/upload/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setValue("banner", result?.data?.data?.url);
    })();
  };

  const handleAttachmentDrop = (acceptedFiles: File[]) => {
    setAttachment(acceptedFiles[0]);

    (async function () {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const result = await axiosInstance.post(
        "/api/proxy/files/upload/documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setValue("attachment", result?.data?.data?.url);
    })();
  };

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    onDrop: handleBannerDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const {
    getRootProps: getAttachmentRootProps,
    getInputProps: getAttachmentInputProps,
  } = useDropzone({
    onDrop: handleAttachmentDrop,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    maxFiles: 1,
  });

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
        <div className="py-3">
          <label className="block text-gray-700 text-sm">Banner</label>
          <div
            {...getBannerRootProps()}
            className="mt-1 p-6 border border-gray-300 border-dashed rounded-md flex justify-center items-center cursor-pointer text-sm text-gray-600 hover:border hover:border-solid hover:border-gray-400 active:border-blue-700"
          >
            <input {...getBannerInputProps()} />
            {banner ? (
              <p>{banner.name}</p>
            ) : (
              <p>
                Drag and drop an image, or click to select a banner. We
                recommend uploading or dragging in an image that is 1920x1080
                pixels.
              </p>
            )}
          </div>
          {errors.banner && (
            <p className="text-red-500">{errors.banner?.message as string}</p>
          )}
          {!deletedBanner && eventsData?.banner && (
            <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50 mt-2 flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/file.svg"
                  width={20}
                  height={20}
                  alt="file icon"
                />
                <span className="">
                  {getFilenameAndExtension(eventsData?.banner)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  href={eventsData?.banner as string}
                  download
                  target="_blank"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {WithTooltip(
                        "Download",
                        <Image
                          src="/icons/download.svg"
                          width={20}
                          height={20}
                          alt="file icon"
                        />
                      )}
                    </div>
                  </div>
                </Link>
                {WithTooltip(
                  "Remove",
                  <span
                    onClick={() => {
                      setValue("banner", "");
                      setDeletedBanner(true);
                    }}
                  >
                    <Image
                      src="/icons/bin.svg"
                      width={20}
                      height={20}
                      alt="file icon"
                    />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
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
        <NativeSelect
          id="type"
          label="Event type"
          placeholder="Select Event type"
          value={watch("type") as string}
          onChange={(e: any) => setValue("type", e.target.value)}
          error={errors?.type?.message}
          options={[
            { value: "onsite", label: "Onsite" },
            {
              value: "hybrid",
              label: "Hybrid",
            },
            {
              value: "virtual",
              label: "Virtual",
            },
          ]}
          otherClasses={methods.register("type")}
        />
        {["hybrid", "virtual"].includes(watch("type")) && (
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
        )}
        {["hybrid", "onsite"].includes(watch("type")) && (
          <div>
            <Input
              id="location"
              label="Location"
              value={watch("location") as string}
              onChange={(e) => setValue("location", e.target.value)}
              error={errors.location?.message as string}
              otherClasses={methods.register("location")}
              required
            />
          </div>
        )}
        <TextArea
          id="description"
          label="Description"
          value={watch("description")}
          onChange={(e) => setValue("description", e.target.value)}
          error={errors.description?.message as string}
          otherClasses={methods.register("description")}
        />
        <div className="py-3">
          <label className="block text-gray-700 text-sm">
            Attachment (.docx, .doc, .pdf)
          </label>
          <div
            {...getAttachmentRootProps()}
            className="mt-1 p-6 border border-gray-300 border-dashed rounded-md flex justify-center items-center cursor-pointer text-sm text-gray-600 hover:border hover:border-solid hover:border-gray-400 active:border-blue-700"
          >
            <input {...getAttachmentInputProps()} />
            {attachment ? (
              <p>{attachment.name}</p>
            ) : (
              <p>Drag and drop a file, or click to select a document</p>
            )}
          </div>
          {errors.attachment && (
            <p className="text-red-500">
              {errors.attachment?.message as string}
            </p>
          )}
          {!deletedAttachment && eventsData?.attachment && (
            <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50 mt-2 flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/file.svg"
                  width={20}
                  height={20}
                  alt="file icon"
                />
                <span className="">
                  {getFilenameAndExtension(eventsData?.attachment)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  href={eventsData?.attachment as string}
                  download
                  target="_blank"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {WithTooltip(
                        "Download",
                        <Image
                          src="/icons/download.svg"
                          width={20}
                          height={20}
                          alt="file icon"
                        />
                      )}
                    </div>
                  </div>
                </Link>
                {WithTooltip(
                  "Remove",
                  <span
                    onClick={() => {
                      setValue("attachment", "");
                      setDeletedAttachment(true);
                    }}
                  >
                    <Image
                      src="/icons/bin.svg"
                      width={20}
                      height={20}
                      alt="file icon"
                    />
                  </span>
                )}
              </div>
            </div>
          )}
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

export default CreateEventForm;
