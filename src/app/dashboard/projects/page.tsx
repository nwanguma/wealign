"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import ContentWrapper from "@/components/ui/ContentWrapper";

import AppModal from "@/components/ui/Modal";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project, Skill } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import AddItemButton from "@/components/ui/AddItemButton";

import FilterComponent from "@/components/ui/Filter";
import { ProjectsWithPagination } from "@/common/constants";
import { IFilters } from "../events/page";

import { IPagination } from "../events/page";
import { useSkills } from "@/app/hooks/useSkills";
import PaginationComponent from "@/components/ui/PaginationComponent";

const fetchProjects = async (
  pagination: IPagination,
  filters: IFilters
): Promise<ProjectsWithPagination> => {
  try {
    const { skills, ...rest } = filters;
    const response = await axiosInstance.get("/api/proxy/projects", {
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

export default function Projects() {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [filters, setFilters] = useState({
    skills: "",
    keyword: "",
    startDate: "",
    status: "",
    order: "DESC",
    sortBy: "",
  });
  const {
    data: projectsData,
    error,
    isLoading,
    refetch,
  } = useQuery<ProjectsWithPagination, Error>({
    queryKey: ["projects", pagination],
    queryFn: () => fetchProjects(pagination, filters as any),
    placeholderData: keepPreviousData,
  });
  const {
    data: skills,
    isLoading: skillsIsLoading,
    error: skillsError,
  } = useSkills();
  const [addProjectModalIsOpen, setAddProjectModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddProjectModal = () => {
    setAddProjectModalIsOpen(!addProjectModalIsOpen);
  };

  let projects: Project[] = [];
  let total = 0;

  if (projectsData) {
    const { page, perPage, total: pageTotal, totalPages, data } = projectsData;
    projects = projectsData.data;
    total = pageTotal;
  }

  const skillsOptions = (skills || [])?.map((skill: Skill) => {
    return { value: skill.title, label: skill.title };
  });

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="min-h-screen px-5 md:px-10 lg:px-20">
          <DashboardPageHeader
            title="Discover Projects and Collaborators"
            description="Connect with talented professionals and find exciting projects to work on. Whether you're looking for a team or want to join an existing project, explore opportunities to collaborate and bring your ideas to life."
          />
          <div className="py-5 flex flex-col space-y-5 w-full">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              triggerRefetch={refetch}
              options={{
                skillsOptions,
                statusOptions: [
                  { value: "completed", label: "Completed" },
                  { value: "in progress", label: "In Progress" },
                  { value: "paused", label: "Paused" },
                  { value: "need collaborators", label: "Need Collaborators" },
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
            <ContentWrapper data={projects}>
              {projectsData &&
                projects?.map(
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
            </ContentWrapper>
            {projectsData && projects && (
              <PaginationComponent
                data={projects}
                total={total}
                setPagination={setPagination}
                limit={pagination.limit}
              />
            )}
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
