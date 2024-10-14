"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import AppModal from "@/components/ui/Modal";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import CreateJobForm from "@/components/forms/CreateJobForm";
import { JobCard } from "@/components/ui/JobCard";
import { Job } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import PaginationComponent from "@/components/ui/PaginationComponent";

import FilterComponent from "@/components/ui/Filter";
import { JobsWithPagination } from "@/common/constants";
import { Skill } from "@/common/constants";

import { IFilters, IPagination } from "../events/page";
import { keepPreviousData } from "@tanstack/react-query";
import { useSkills } from "@/app/hooks/useSkills";
import ContentWrapper from "@/components/ui/ContentWrapper";

const fetchJobs = async (
  pagination: IPagination,
  filters: IFilters
): Promise<JobsWithPagination> => {
  const { skills, ...rest } = filters;

  try {
    const response = await axiosInstance.get("/api/proxy/jobs", {
      params: {
        contentType: "all",
        ...pagination,
        ...rest,
        ...(skills && { skills: [skills] }),
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Jobs() {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [filters, setFilters] = useState({
    keyword: "",
    status: "",
    skills: "",
    order: "DESC",
    sortBy: "",
  });
  const {
    data: jobsData,
    error,
    isLoading,
    refetch,
  } = useQuery<JobsWithPagination, Error>({
    queryKey: ["jobs"],
    queryFn: () => fetchJobs(pagination, filters as any),
    placeholderData: keepPreviousData,
  });
  const [addJobModalIsOpen, setAddJobModalIsOpen] = useState<boolean>(false);
  const {
    data: skills,
    isLoading: skillsIsLoading,
    error: skillsError,
  } = useSkills();

  const handleToggleAddJobModal = () => {
    setAddJobModalIsOpen(!addJobModalIsOpen);
  };

  let jobs: Job[] = [];
  let total = 0;

  if (jobsData) {
    const { page, perPage, total: pagesTotal, totalPages, data } = jobsData;
    jobs = jobsData.data;
    total = pagesTotal;
  }
  const skillsOptions = (skills || [])?.map((skill: Skill) => {
    return { value: skill.title, label: skill.title };
  });

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="min-h-screen px-5 md:px-10 lg:px-20">
          <DashboardPageHeader
            title="Find Opportunities and Jobs to Accelerate Your Career"
            description="Explore job openings and collaboration opportunities tailored to your skills and interests. Whether you're seeking full-time positions or freelance jobs, connect with companies and teams looking for talent like yours. Take the next step in your career by finding the right opportunity today."
          />
          <div className="h-14 py-5 flex flex-col space-y-5 w-full">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              triggerRefetch={refetch}
              options={{
                skillsOptions,
                statusOptions: [
                  { value: "hiring", label: "Hiring" },
                  { value: "paused", label: "Paused" },
                  { value: "closed", label: "Closed" },
                ],
                sortByOptions: [
                  {
                    value: "start_date",
                    label: "Start Date",
                  },
                  { value: "views", label: "Views" },
                ],
              }}
            />
            <ContentWrapper data={jobs as Job[]}>
              {jobsData &&
                jobs?.map(
                  ({
                    id,
                    title,
                    description,
                    website,
                    application_url,
                    created_at,
                    skills,
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
                      skills={skills}
                      status={status}
                    />
                  )
                )}
            </ContentWrapper>
            {jobsData && jobs && (
              <PaginationComponent
                data={jobs}
                total={total}
                setPagination={setPagination}
                limit={pagination.limit}
              />
            )}
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
