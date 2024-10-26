import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Job, Option } from "@/common/constants";
import NativeSelect from "./NativeSelectComponent";
import ReactSelectComponent from "./ReactSelectComponent";
import Input from "./Input";
import TextArea from "./TextArea";
import { useSkills } from "@/app/hooks/useSkills";
import { serializeData } from "@/lib/helpers";
import { createJob, updateJob } from "@/api";

import "react-datepicker/dist/react-datepicker.css";
import "../../app/globals.css";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Must be at least 2 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  status: yup.string().required("Status is required"),
  website: yup.string().url("Must be a valid URL"),
  application_url: yup.string().url("Must be a valid URL").required(),
  location: yup.string(),
  skills: yup.array(),
  deadline: yup.mixed(),
});

interface IJobFormProps {
  data?: Partial<Job>;
  triggerRefetch?: () => void;
  handleModalClose?: () => void;
}

const JobForm: React.FC<IJobFormProps> = ({
  data: jobsData,
  handleModalClose,
  triggerRefetch,
}) => {
  const defaultValues = {
    title: jobsData?.title || "",
    description: jobsData?.description || "",
    status: jobsData?.status || "",
    website: jobsData?.website || "",
    application_url: jobsData?.application_url || "",
    location: jobsData?.location || "",
    skills:
      jobsData?.skills?.map((skill) => ({
        value: skill.title,
        label: skill.title,
      })) || [],
    deadline: jobsData?.deadline
      ? new Date(jobsData?.deadline as string)
      : new Date(),
  };
  const { data: skills } = useSkills();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const [loading, setLoading] = useState(false);
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const jobMutation = useMutation({
    mutationFn: (data: Partial<Job>) =>
      jobsData ? updateJob(data, jobsData?.id as string) : createJob(data),
    onSuccess: () => {
      handleModalClose && handleModalClose();
      triggerRefetch && triggerRefetch();
    },
    onError: (error: any) => {},
    onSettled: () => {
      setLoading(false);
    },
  });

  const skillsOptions = (skills || [])?.map((skill) => {
    return { value: skill.title, label: skill.title };
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    const formattedData = serializeData(data);

    (async function () {
      await jobMutation.mutate({
        ...formattedData,
        skills: data?.skills.map((s: Option) => ({ title: s.value })),
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
            required
          />
        </div>
        <div className="w-full">
          <label className="text-sm mb-1 text-gray-600 inline-block">
            Deadline
          </label>
          <div className="relative w-full">
            <DatePicker
              selected={watch("deadline") as Date}
              onChange={(date) => setValue("deadline", date as Date)}
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
          onChange={(e) => setValue("status", e.target.value)}
          error={errors?.status?.message}
          options={[
            { value: "hiring", label: "Hiring" },
            { value: "paused", label: "Paused" },
            { value: "closed", label: "Closed" },
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
        <Input
          id="location"
          label="Location"
          value={watch("location")}
          onChange={(e) => setValue("location", e.target.value)}
          error={errors.location?.message as string}
          otherClasses={methods.register("location")}
        />
        <div>
          <Input
            id="application_url"
            label="Application Url"
            value={watch("application_url") as string}
            onChange={(e) => setValue("application_url", e.target.value)}
            error={errors.application_url?.message as string}
            otherClasses={methods.register("application_url")}
            placeholder="https://"
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
        <div className="flex items-center space-x-2 justify-end">
          <button
            onClick={() => handleModalClose && handleModalClose()}
            type="button"
            className="px-6 py-2 text-sm bg-white text-gray-600 border border-gray-300 rounded-md hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            Save Changes
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default JobForm;
