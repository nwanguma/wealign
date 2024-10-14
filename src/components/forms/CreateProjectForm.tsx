import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

import NativeSelect from "./NativeSelectComponent";
import ReactSelectComponent from "./ReactSelectComponent";
import axiosInstance from "@/lib/axiosInstance";
import TextArea from "./TextArea";
import Input from "./Input";
import { Project } from "@/common/constants";
import AddItemInput from "./AddItemInput";
import { useSkills } from "@/app/hooks/useSkills";
import { WithTooltip } from "../ui/WithTooltip";

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
  attachment: yup.mixed(),
});

const createProject = async (data: Partial<Project>) => {
  const response = await axiosInstance.post(`/api/proxy/projects`, data);

  return response.data.data;
};

interface ICreateProjectForm {
  handleModalClose?: () => void;
}

const CreateProjectForm: React.FC<ICreateProjectForm> = ({
  handleModalClose,
}) => {
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
  const { data: skills, isLoading, error } = useSkills();
  const [bio, setBio] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
  const [deletedAttachment, setDeletedAttachment] = useState(false);

  const [requireFeedback, setRequireFeedback] = useState<"no" | "yes">("no");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<Project>) => createProject(data),
    onSuccess: (data: Project) => {
      handleModalClose && handleModalClose();
    },
    onError: (error: any) => {},
    onSettled: () => {
      setLoading(false);
    },
  });

  const skillsOptions = (skills || [])?.map((skill) => {
    return { value: skill.title, label: skill.title };
  });

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
    setLoading(true);

    (async function () {
      await updateProfileMutation.mutate({
        ...data,
        skills: selectedSkills.map((s) => ({ title: s.label })),
        requires_feedback: requireFeedback == "yes",
        collaborators: [],
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
        <Input
          id="location"
          label="Location"
          value={watch("location")}
          onChange={(e) => setValue("location", e.target.value)}
          error={errors.location?.message as string}
          otherClasses={methods.register("location")}
        />
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Need feedback?</label>
          <div className="flex items-center space-x-4 mt-1 text-sm">
            <label className="flex items-center">
              <input
                type="radio"
                value="yes"
                checked={requireFeedback === "yes"}
                onChange={() => setRequireFeedback("yes")}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="no"
                checked={requireFeedback === "no"}
                onChange={() => setRequireFeedback("no")}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
        <NativeSelect
          id="status"
          label="Status"
          placeholder="Select Status"
          value={watch("status") as string}
          onChange={(e) => setValue("status", e.target.value)}
          error={errors?.status?.message}
          options={[
            { value: "need collaborators", label: "Need collaborators" },
            { value: "paused", label: "Paused" },
            { value: "completed", label: "Completed" },
            { value: "in progress", label: "In Progress" },
          ]}
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
        <TextArea
          id="description"
          label="Description"
          value={watch("description") as string}
          onChange={(e: any) => setValue("description", e.target.value)}
          error={errors.description?.message as string}
          otherClasses={methods.register("description")}
        />
        <AddItemInput label="Collaborators" />
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

export default CreateProjectForm;
