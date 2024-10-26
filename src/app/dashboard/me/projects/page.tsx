"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import ContentWrapper from "@/components/ui/ContentWrapper";
import AppModal from "@/components/ui/Modal";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import CreateProjectForm from "@/components/forms/ProjectForm";
import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  Project,
  Skill,
  IPagination,
  IFilters,
  ProjectsWithPagination,
} from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import AddItemButton from "@/components/ui/AddItemButton";
import { RootState } from "@/store";
import FilterComponent from "@/components/ui/Filter";
import { useSkills } from "@/app/hooks/useSkills";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { WithTooltip } from "@/components/ui/WithTooltip";
import {
  SkeletonLoaderGrid,
  SkeletonLoader,
} from "@/components/ui/SkeletonLoader";

const fetchProjects = async (
  pagination: IPagination,
  filters: IFilters
): Promise<ProjectsWithPagination> => {
  try {
    const { skills, ...rest } = filters;
    const response = await axiosInstance.get("/api/proxy/projects", {
      params: {
        contentType: "user",
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
  const user = useSelector((state: RootState) => state.user);
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
    queryKey: ["projects", user?.profile?.id, pagination],
    queryFn: () => fetchProjects(pagination, filters as any),
    placeholderData: keepPreviousData,
  });
  const { data: skills } = useSkills();
  const [addProjectModalIsOpen, setAddProjectModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddProjectModal = () => {
    setAddProjectModalIsOpen(!addProjectModalIsOpen);
  };

  let projects: Project[] = [];
  let total = 0;

  if (projectsData) {
    const { total: pageTotal } = projectsData;
    projects = projectsData.data;
    total = pageTotal;
  }

  const skillsOptions = (skills || [])?.map((skill: Skill) => {
    return { value: skill.title, label: skill.title };
  });

  return (
    <div className="min-h-screen w-full bg-white p-1 lg:p-6">
      <div className="flex w-full space-x-0 md:space-x-5">
        <div className="w-full min-h-screen px-2 s:px-5 md:px-10 lg:px-20">
          <div className="relative">
            <DashboardPageHeader
              title="Discover Projects and Collaborators"
              description="Connect with talented professionals and find exciting projects to work on. Whether you're looking for a team or want to join an existing project, explore opportunities to collaborate and bring your ideas to life."
            />
            <div className="absolute top-3 right-3">
              <AddItemButton
                icon={
                  <div>
                    {WithTooltip(
                      "New Project",
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 3L16 6M8 3L8 6"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14 4H10L10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6L6 4.07612C5.02492 4.17203 4.36857 4.38879 3.87868 4.87868C3 5.75736 3 7.17157 3 10V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V10C21 7.17157 21 5.75736 20.1213 4.87868C19.6314 4.38879 18.9751 4.17203 18 4.07612L18 6C18 7.10457 17.1046 8 16 8C14.8954 8 14 7.10457 14 6L14 4ZM7 12C7 11.4477 7.44772 11 8 11L16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13L8 13C7.44772 13 7 12.5523 7 12ZM8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17L16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15L8 15Z"
                          fill="#1D4ED8"
                        />
                      </svg>
                    )}
                  </div>
                }
                handleOnClick={handleToggleAddProjectModal}
                fill="bg-slate-100 text-custom-gray-paragraph hover:bg-slate-200"
              />
            </div>
          </div>
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
            {!isLoading && (
              <ContentWrapper data={projects}>
                {projectsData &&
                  projects?.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </ContentWrapper>
            )}
            {isLoading && (
              <>
                <div className="hidden md:block">
                  <SkeletonLoaderGrid />
                </div>
                <div className="block md:hidden">
                  <SkeletonLoader />
                </div>
              </>
            )}
            {projectsData && projects && (
              <PaginationComponent
                data={projects}
                total={total}
                setPagination={setPagination}
                limit={pagination.limit}
                tag="projects"
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
        <CreateProjectForm handleModalClose={handleToggleAddProjectModal} />
      </AppModal>
    </div>
  );
}
