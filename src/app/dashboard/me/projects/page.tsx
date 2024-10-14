"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import AppModal from "@/components/ui/Modal";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import { ProjectsWithPagination } from "@/common/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const fetchProjects = async (): Promise<ProjectsWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/projects", {
      params: {
        contentType: "user",
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Projects() {
  const user = useSelector((state: RootState) => state.user);
  const {
    data: projectsData,
    error,
    isLoading,
  } = useQuery<ProjectsWithPagination, Error>({
    queryKey: ["projects", user?.profile.id],
    queryFn: fetchProjects,
  });
  const [addProjectModalIsOpen, setAddProjectModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddProjectModal = () => {
    setAddProjectModalIsOpen(!addProjectModalIsOpen);
  };

  let projects: Project[] = [];

  if (projectsData) {
    const { page, perPage, total, totalPages, data } = projectsData;
    projects = projectsData.data;
  }

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="min-h-screen px-5 md:px-10 lg:px-20">
          <DashboardPageHeader
            title="Discover Projects and Collaborators"
            description="Connect with talented professionals and find exciting projects to work on. Whether you're looking for a team or want to join an existing project, explore opportunities to collaborate and bring your ideas to life."
          />
          <div className="py-5 flex flex-col space-y-5 w-full">
            <div className="w-full grid grid-cols-3 gap-5">
              {projects?.map(
                ({
                  id,
                  title,
                  description,
                  website,
                  github_url,
                  created_at,
                  skills,
                  status,
                  collaborators,
                }) => (
                  <ProjectCard
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    website={website}
                    github_url={github_url}
                    created_at={created_at}
                    skills={skills}
                    status={status}
                    collaborators={collaborators}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <AppModal
        title="Create Project"
        isOpen={addProjectModalIsOpen}
        onClose={() => handleToggleAddProjectModal()}
      >
        <CreateProjectForm />
      </AppModal>
    </div>
  );
}
