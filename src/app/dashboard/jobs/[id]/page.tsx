"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { Job } from "@/common/constants";
import { RootState } from "@/store";
import { fetchJob, deleteJob } from "@/api";
import { JobCardMain } from "@/components/ui/JobCardMain";
import { SkeletonLoaderPage } from "@/components/ui/SkeletonLoader";
import AppModal from "@/components/ui/Modal";
import CreateJobForm from "@/components/forms/JobForm";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { JobCard } from "@/components/ui/JobCard";

export default function JobPage() {
  const { recommendations, user } = useSelector((state: RootState) => ({
    recommendations: state.recommendations,
    user: state.user,
  }));
  const { isLoading: isRecommendationsLoading, jobs: jobsRecommendations } =
    recommendations;
  const params = useParams();
  const id = params?.id;
  const {
    refetch,
    data: job,
    error,
    isLoading,
  } = useQuery<Job, Error>({
    queryKey: ["jobs", id],
    queryFn: () => fetchJob(id as string),
  });
  const isOwner = user?.profile?.id === job?.owner?.id;
  const deleteMutation = useMutation({
    mutationFn: (jobId: string) => deleteJob(jobId),
    onSuccess: () => {},
    onError: (error: any) => {},
  });
  const handleDelete = (jobId: string) => {
    deleteMutation.mutate(jobId);
  };
  const [addJobModalIsOpen, setAddJobModalIsOpen] = useState<boolean>(false);
  const handleToggleAddJobModal = () => {
    setAddJobModalIsOpen(!addJobModalIsOpen);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex space-x-5 p-6">
        <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg relative">
          {isLoading && <SkeletonLoaderPage />}
          {!isLoading && job && (
            <div className="w-full">
              <JobCardMain
                job={job}
                isOwner={isOwner}
                toggleModal={handleToggleAddJobModal}
                triggerRefetch={refetch}
              />
              {isOwner && (
                <div
                  className="w-full text-center cursor-pointer"
                  onClick={() => handleDelete(job.id)}
                >
                  <span className="inline-block rounded text-xs text-red-500 bg-red-50 px-3 py-2">
                    Delete this job
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <aside className="hidden lg:block w-1/3 space-y-5">
          {isRecommendationsLoading && <SkeletonCard />}
          {!isRecommendationsLoading && jobsRecommendations?.length > 0 && (
            <div className="p-4 bg-white rounded-lg border border-gray-300">
              <h3 className="font-semibold mb-3 text-gray-700 text-base">
                More jobs
              </h3>
              <div className="space-y-4">
                {jobsRecommendations &&
                  jobsRecommendations.map((job) => {
                    return (
                      <div
                        key={job.id}
                        className="border-b border-b-gray-200 pb-4 last:border-0"
                      >
                        <JobCard job={job} />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </aside>
      </div>
      <AppModal
        title="Update Job"
        isOpen={addJobModalIsOpen}
        onClose={() => handleToggleAddJobModal()}
      >
        <CreateJobForm
          triggerRefetch={refetch}
          data={job}
          handleModalClose={handleToggleAddJobModal}
        />
      </AppModal>
    </div>
  );
}
