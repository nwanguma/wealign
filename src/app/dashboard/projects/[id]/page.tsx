"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCardMain } from "@/components/ui/ProjectCardMain";
import { RootState } from "@/store";
import { WithTooltip } from "@/components/ui/WithTooltip";
import AppModal from "@/components/ui/Modal";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import { SkeletonLoaderPage } from "@/components/ui/SkeletonLoader";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { fetchProject, deleteProject } from "@/api";
import { Project } from "@/common/constants";

export default function ProjectPage() {
  const { recommendations, user } = useSelector((state: RootState) => ({
    recommendations: state.recommendations,
    user: state.user,
  }));
  const params = useParams();
  const id = params?.id;
  const [addProjectModalIsOpen, setAddProjectModalIsOpen] =
    useState<boolean>(false);
  const {
    isLoading: isRecommendationsLoading,
    projects: projectRecommendations,
  } = recommendations;

  const {
    refetch,
    data: project,
    error,
    isLoading,
  } = useQuery<Project, Error>({
    queryKey: ["projects", id],
    queryFn: () => fetchProject(id as string),
  });

  const isOwner = user?.profile?.id === project?.owner?.id;

  const deleteMutation = useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {},
    onError: (error: any) => {},
  });

  const handleDelete = (projectId: string) => {
    deleteMutation.mutate(projectId);
  };

  const handleToggleAddProjectModal = () => {
    setAddProjectModalIsOpen(!addProjectModalIsOpen);
  };

  return (
    <div>
      <div className="min-h-screen w-full bg-white relative">
        <div className="flex space-x-5 p-6">
          <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg relative">
            {isLoading && <SkeletonLoaderPage />}
            {!isLoading && project && (
              <div className="w-full">
                {isOwner && (
                  <div className="absolute top-4 right-4">
                    {WithTooltip(
                      "Edit project",
                      <div onClick={() => handleToggleAddProjectModal()}>
                        <Image
                          src="/icons/edit.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="w-full">
                  <ProjectCardMain project={project} />
                </div>
                {isOwner && project && (
                  <div
                    className="w-full text-center cursor-pointer"
                    onClick={() => handleDelete(project.id)}
                  >
                    <span className="inline-block rounded text-xs text-red-500 bg-red-50 px-3 py-2">
                      Delete this project
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <aside className="w-1/3 space-y-5">
            {isRecommendationsLoading && <SkeletonCard />}
            {!isRecommendationsLoading && (
              <div className="p-4 bg-white rounded-lg border border-gray-300">
                <h3 className="font-app-medium mb-3 text-gray-700 text-base">
                  More Projects
                </h3>
                <div className="space-y-4">
                  {projectRecommendations &&
                    [...projectRecommendations]?.splice(0, 3).map((project) => {
                      return (
                        <div
                          key={project.id}
                          className="border-b border-b-gray-200 pb-4 last:border-0"
                        >
                          <ProjectCard project={project} />
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      <AppModal
        title="Update Project"
        isOpen={addProjectModalIsOpen}
        onClose={() => handleToggleAddProjectModal()}
      >
        <CreateProjectForm
          data={project as Project}
          handleModalClose={handleToggleAddProjectModal}
          triggerRefetch={refetch}
        />
      </AppModal>
    </div>
  );
}
