import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { Article } from "@/common/constants";
import Input from "./Input";
import axiosInstance from "@/lib/axiosInstance";
import { stripHtml } from "@/lib/helpers";

import "react-quill/dist/quill.snow.css";
import "../../app/globals.css";

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
    .min(3, "Must be at least 2 characters"),
  banner: yup.mixed(),
  body: yup
    .string()
    .required("Content is required")
    .min(10, "Content must be at least 1000 characters"),
});

const createArticle = async (data: Partial<Article>) => {
  const result = await axiosInstance.post("/api/proxy/articles", data);

  return result?.data?.data;
};

interface ICreateArticleForm {
  handleCloseModal?: () => void;
}

const CreateArticleForm: React.FC<ICreateArticleForm> = ({
  handleCloseModal,
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

  const createArticleMutation = useMutation({
    mutationFn: (data: Partial<Article>) => createArticle(data),
    onSuccess: (data: Article) => {
      handleCloseModal && handleCloseModal();
    },
    onError: (error: any) => {},
    onSettled: () => {
      setLoading(false);
    },
  });

  const [banner, setBanner] = useState<File | null>(null);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleBannerDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const onSubmit = (data: any) => {
    setLoading(true);

    (async function () {
      await createArticleMutation.mutate(data);
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
            {...getRootProps()}
            className="mt-1 p-6 border border-gray-300 border-dashed rounded-md flex justify-center items-center cursor-pointer text-sm text-gray-600 hover:border hover:border-solid hover:border-gray-400 active:border-blue-700"
          >
            <input {...getInputProps()} />
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
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-1">
            Content ({stripHtml(body)?.length || 0} characters)
          </label>
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <ReactQuill
                value={field.value || body}
                onChange={(content) => {
                  setBody(content);
                  field.onChange(content);
                }}
                className="custom-quill"
                placeholder="Content goes here..."
                theme="snow"
              />
            )}
          />
          {errors.body && (
            <p className="text-red-500">{errors.body?.message}</p>
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
            {loading ? "Loading..." : "Publish"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateArticleForm;
