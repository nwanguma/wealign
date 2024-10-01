"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import AppModal from "@/components/ui/Modal";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import CreateJobForm from "@/components/forms/CreateJobForm";
import { JobCard } from "@/components/ui/JobCard";
import { Job } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import AddItemButton from "@/components/ui/AddItemButton";

import FilterComponent from "@/components/ui/Filter";

import { JobsWithPagination } from "@/common/constants";

const fetchJobs = async (): Promise<JobsWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/jobs", {
      params: {
        contentType: "all",
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Jobs() {
  const {
    data: jobsData,
    error,
    isLoading,
  } = useQuery<JobsWithPagination, Error>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
  const [addJobModalIsOpen, setAddJobModalIsOpen] = useState<boolean>(false);

  const handleToggleAddJobModal = () => {
    setAddJobModalIsOpen(!addJobModalIsOpen);
  };

  let jobs: Job[] = [];

  if (jobsData) {
    const { page, perPage, total, totalPages, data } = jobsData;
    jobs = jobsData.data;
  }

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="min-h-screen px-5 md:px-10 lg:px-20">
          <DashboardPageHeader
            title="Find Opportunities and Jobs to Accelerate Your Career"
            description="Explore job openings and collaboration opportunities tailored to your skills and interests. Whether you're seeking full-time positions or freelance jobs, connect with companies and teams looking for talent like yours. Take the next step in your career by finding the right opportunity today."
          />
          <div className="h-14 py-5 flex flex-col space-y-5 w-full">
            <FilterComponent />
            <div className="w-full grid grid-cols-3 gap-5">
              {jobs?.map(
                ({
                  id,
                  title,
                  description,
                  website,
                  application_url,
                  created_at,
                  requirements,
                  status,
                }) => (
                  <JobCard
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    website={website}
                    application_url={application_url as string}
                    created_at={created_at}
                    requirements={requirements}
                    status={status}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <AppModal
        title="Create Job"
        isOpen={addJobModalIsOpen}
        onClose={() => handleToggleAddJobModal()}
      >
        <CreateJobForm />
      </AppModal>
    </div>
  );
}
