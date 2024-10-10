"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";

import { User } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import { Project } from "@/common/constants";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCardMain } from "@/components/ui/ProjectCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const fetchProject = async (id: string): Promise<Project> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/projects/me/${id}`);

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
    projects: projectRecommendations,
    isLoading: isRecommendationsLoading,
    error: recommendationsError,
  } = useSelector((state: RootState) => state.recommendations);
  const currentUser: User = useSelector((state: RootState) => state.user);
  const params = useParams();
  const id = params?.id;

  const {
    data: project,
    error,
    isLoading,
  } = useQuery<Project, Error>({
    queryKey: ["projects", currentUser?.profile.id, id],
    queryFn: () => fetchProject(id as string),
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
      {project && (
        <div className="min-h-screen w-full bg-white">
          <div className="flex space-x-5 p-6">
            <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg">
              <div className="w-full">
                <ProjectCardMain
                  id={project.id as string}
                  title={project.title}
                  description={project.description}
                  website={project.website}
                  github_url={project.github_url}
                  created_at={project.created_at}
                  collaborators={project.collaborators}
                  skills={project.skills}
                  like_count={project.likes?.length}
                  comment_count={project.comments?.length}
                  likes={project.likes}
                  comments={project.comments}
                  owner={project.owner}
                  start_date={project.start_date}
                  status={project.status}
                />
              </div>
            </div>
            <aside className="w-1/3 space-y-5">
              {projectRecommendations?.length > 0 && (
                <div className="p-4 bg-white rounded-lg border border-gray-300">
                  <h3 className="font-semibold mb-3 text-gray-700 text-base">
                    Who to Follow
                  </h3>
                  <div className="space-y-4">
                    {projectRecommendations &&
                      projectRecommendations.map((project) => {
                        return (
                          <div
                            key={project.id}
                            className="border-b border-b-gray-200 pb-4 last:border-0"
                          >
                            <ProjectCard
                              id={project.id}
                              title={project.title}
                              description={project.description}
                              website={project.website}
                              created_at={project.created_at}
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
