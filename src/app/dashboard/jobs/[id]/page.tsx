"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";

import { User } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import { Job } from "@/common/constants";
import { ProfilePreviewCard } from "@/components/ui/ProfileCard";
import { JobCard, JobCardMain } from "@/components/ui/JobCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const fetchJob = async (id: string): Promise<Job> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/jobs/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

const followUser = async (profileId: string) => {
  const response = await axiosInstance.patch(
    `/api/proxy/profiles/${profileId}/follow`
  );

  return response.data.data;
};

export default function EventPage() {
  const {
    jobs: jobsRecommendations,
    isLoading: isRecommendationsLoading,
    error: recommendationsError,
  } = useSelector((state: RootState) => state.recommendations);
  const currentUser: User = useSelector((state: RootState) => state.user);
  const params = useParams();
  const id = params?.id;

  const {
    data: job,
    error,
    isLoading,
  } = useQuery<Job, Error>({
    queryKey: ["jobs", id],
    queryFn: () => fetchJob(id as string),
  });

  const followMutation = useMutation({
    mutationFn: (profileId: string) => followUser(profileId),
    onSuccess: () => {
      // console.log("User followed successfully");
    },
    onError: (error: any) => {
      // console.error("Error following the user:", error);
    },
  });

  const handleFollow = (profileId: string) => {
    followMutation.mutate(profileId);
  };

  return (
    <div>
      {job && (
        <div className="min-h-screen w-full bg-white">
          <div className="flex space-x-5 p-6">
            <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg">
              <div className="w-full">
                <JobCardMain
                  id={job.id as string}
                  title={job.title}
                  description={job.description}
                  website={job.website}
                  application_url={job.application_url}
                  created_at={job.created_at}
                  requirements={job.requirements}
                  like_count={job.likes?.length}
                  comment_count={job.comments?.length}
                  likes={job.likes}
                  comments={job.comments}
                  owner={job.owner}
                  deadline={job.deadline}
                  status={job.status}
                />
              </div>
            </div>
            <aside className="w-1/3 space-y-5">
              {jobsRecommendations?.length > 0 && (
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
                            <JobCard
                              id={job.id}
                              title={job.title}
                              created_at={job.created_at}
                              description={job.description}
                              website={job.website}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
