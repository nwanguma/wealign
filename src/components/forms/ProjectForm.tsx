import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";

import NativeSelect from "./NativeSelectComponent";
import ReactSelectComponent from "./ReactSelectComponent";
import axiosInstance from "@/lib/axiosInstance";
import TextArea from "./TextArea";
import Input from "./Input";
import { Project, Profile, Option } from "@/common/constants";
import AddItemInput from "./AddItemInput";
import { useSkills } from "@/app/hooks/useSkills";
import { WithTooltip } from "../ui/WithTooltip";
import {
  getFilenameAndExtension,
  sanitizeFile,
  serializeData,
} from "@/lib/helpers";
import { RootState } from "@/store";
import { errorToastWithCustomError, successToast } from "@/lib/helpers/toast";
import { feedbackTextMapper } from "@/lib/helpers/constants";
import { CustomError } from "@/lib/helpers/class";
import dynamic from "next/dynamic";
import { useLocations } from "@/app/hooks/useLocations";
import InputWithDropdown from "./InputWithDropdown";

import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import "../../app/globals.css";
import { selectCurrentUser } from "@/lib/selectors";

const Loading = () => (
  <div className="w-full h-96 block border border-gray-300 rounded-lg"></div>
);

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Loading />,
});

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(30, "Must be at least 30 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  location: yup.string(),
  // required("Location is required"),
  status: yup.string(),
  // required("Status is required"),
  website: yup.string().url("Must be a valid URL"),
  github_url: yup.string().url("Must be a valid URL"),
  skills: yup.array(),
  attachment: yup.string(),
  collaborators: yup.array(),
  start_date: yup.mixed(),
  requires_feedback: yup.string(),
  feedback_guide: yup.string().when("requires_feedback", {
    is: true,
    then: (schema) => schema.required("Feedback guide is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const createProject = async (data: Partial<Project>) => {
  const response = await axiosInstance.post(`/api/proxy/projects`, data);

  return response.data.data;
};

const updateProject = async (data: Partial<Project>, id: string) => {
  const response = await axiosInstance.put(`/api/proxy/projects/${id}`, data);

  return response.data.data;
};

interface IProjectFormProps {
  data?: Partial<Project>;
  handleModalClose?: () => void;
  triggerRefetch?: () => void;
}

const ProjectForm: React.FC<IProjectFormProps> = ({
  data,
  handleModalClose,
  triggerRefetch,
}) => {
  const user = useSelector(
    (state: RootState) => selectCurrentUser(state),
    shallowEqual
  );
  const defaultValues = {
    title: data?.title || "",
    website: data?.website || "",
    github_url: data?.github_url || "",
    location: data?.location || "",
    status: data?.status || "",
    skills:
      data?.skills?.map((skill) => ({
        value: skill.title,
        label: skill.title,
      })) || [],
    description: data?.description || "",
    attachment: data?.attachment || "",
    collaborators:
      data?.collaborators?.map(
        (collaborator: Profile) => collaborator?.email as string
      ) || [],
    start_date: data?.start_date
      ? new Date(data?.start_date as string)
      : new Date(),
    requires_feedback: data?.requires_feedback ? "yes" : "no",
    feedback_guide: data?.feedback_guide || "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const { data: skills } = useSkills();
  const { data: locations } = useLocations();

  const [deletedAttachment, setDeletedAttachment] = useState(false);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const projectMutation = useMutation({
    mutationFn: (projectData: Partial<Project>) =>
      data?.id
        ? updateProject(projectData, data?.id as string)
        : createProject(projectData),
    onSuccess: () => {
      const feedbackMessage = data?.id
        ? feedbackTextMapper.update("Project")
        : feedbackTextMapper.create("Project");

      successToast(feedbackMessage);
      handleModalClose && handleModalClose();
      triggerRefetch && triggerRefetch();
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const skillsOptions = (skills || [])?.map((skill) => {
    return { value: skill.title, label: skill.title };
  });

  const locationsOptions = (locations || [])?.map((location) => {
    return {
      value: location.city + " " + location.country,
      label: location.city + ", " + location.country,
    };
  });

  const handleAttachmentDrop = (acceptedFiles: File[]) => {
    setFileUploadLoading(true);
    const sanitizedFile = sanitizeFile(acceptedFiles[0]);

    setAttachment(sanitizedFile);

    (async function () {
      const formData = new FormData();
      formData.append("file", sanitizedFile);

      const result = await axiosInstance.post(
        "/api/proxy/files/upload/documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFileUploadLoading(false);
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
    const formattedData = serializeData(data);

    (async function () {
      await projectMutation.mutate({
        ...formattedData,
        skills: data?.skills.map((s: any) => ({ title: s.label })),
        requires_feedback: data?.requires_feedback === "yes",
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
            label={`Title (${watch("title").length}/100)`}
            value={watch("title")}
            onChange={(e) => setValue("title", e.target.value)}
            error={errors.title?.message}
            otherClasses={methods.register("title")}
            required
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
            placeholder="https://example.com"
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
              selected={watch("start_date") as Date}
              onChange={(date) => setValue("start_date", date as Date)}
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
        <InputWithDropdown
          id="location"
          label="Location"
          value={watch("location") as string}
          setValue={setValue}
          options={locationsOptions}
          error={errors.location?.message as string}
          otherClasses={methods.register("location")}
          required
        />
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
                tag="skills"
                label="Skills"
                options={skillsOptions}
                placeholder="Select skills"
                error={errors.skills?.message as string}
                setSelectedOption={setValue}
                selectedOption={watch("skills") as Option[]}
              />
            )}
          />
        </div>
        <TextArea
          id="description"
          label={`Description (${watch("description").length}/2000)`}
          value={watch("description") as string}
          onChange={(e: any) => setValue("description", e.target.value)}
          error={errors.description?.message as string}
          otherClasses={methods.register("description")}
          required
        />
        <AddItemInput
          label="Collaborators (if users are on the platform, they will be added)"
          items={watch("collaborators") as any[]}
          setItems={setValue}
          tag="collaborators"
          userEmail={user?.profile?.email}
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
            <p className="text-xs-sm text-red-500 first-letter:capitalize">
              {errors.attachment?.message as string}
            </p>
          )}
          {!deletedAttachment && data?.attachment && (
            <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50 mt-2 flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/file.svg"
                  width={20}
                  height={20}
                  alt="file icon"
                />
                <span className="">
                  {getFilenameAndExtension(data?.attachment)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  href={data?.attachment as string}
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
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Need feedback?</label>
          <div className="flex items-center space-x-4 mt-1 text-sm">
            <label className="flex items-center">
              <input
                type="radio"
                value="yes"
                checked={watch("requires_feedback") === "yes"}
                onChange={() => setValue("requires_feedback", "yes")}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="no"
                checked={watch("requires_feedback") === "no"}
                onChange={() => setValue("requires_feedback", "no")}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
        {watch("requires_feedback") === "yes" && (
          <TextArea
            id="feedback_guide"
            label="Feedback guide (ask specific questions or guide feedback response)"
            value={watch("feedback_guide") as string}
            onChange={(e: any) => setValue("feedback_guide", e.target.value)}
            error={errors.feedback_guide?.message as string}
            otherClasses={methods.register("feedback_guide")}
          />
        )}
        <div className="flex items-center space-x-2 justify-end">
          <button
            onClick={() => handleModalClose && handleModalClose()}
            type="button"
            className="px-6 py-2 text-sm bg-white text-gray-600 border border-gray-300 rounded-md hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            disabled={loading || fileUploadLoading}
            type="submit"
            className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {data ? "Save Changes" : "Submit"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProjectForm;
