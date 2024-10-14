"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import { ProfileCard } from "@/components/ui/ProfileCard";
import FilterComponent from "@/components/ui/Filter";
import { Skill, Profile } from "@/common/constants";
import AddItemButton from "@/components/ui/AddItemButton";
import { ProfilesWithPagination } from "@/common/constants";
import { useState } from "react";
import { useSkills } from "@/app/hooks/useSkills";
import PaginationComponent from "@/components/ui/PaginationComponent";

import { IFilters, IPagination } from "../events/page";
import ContentWrapper from "@/components/ui/ContentWrapper";

const fetchProfiles = async (
  pagination: IPagination,
  filters: IFilters
): Promise<ProfilesWithPagination> => {
  try {
    const { skills, type, ...rest } = filters;
    const response = await axiosInstance.get("/api/proxy/profiles", {
      params: {
        ...pagination,
        ...rest,
        ...(skills && { skills: [skills] }),
        ...(type && { is_mentor: true }),
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Profiles() {
  const [pagination, setPagination] = useState({ page: 1, limit: 2 });
  const [filters, setFilters] = useState({
    skills: [],
    status: "",
    keyword: "",
    type: "",
    order: "DESC",
    sortBy: "",
  });

  const {
    data: profilesData,
    error,
    isLoading,
    refetch,
  } = useQuery<ProfilesWithPagination, Error>({
    queryKey: ["profiles", pagination],
    queryFn: () => fetchProfiles(pagination, filters as IFilters),
    placeholderData: keepPreviousData,
  });

  const {
    data: skills,
    isLoading: skillsIsLoading,
    error: skillsError,
  } = useSkills();

  let profiles: Profile[] | unknown[] = [];
  let total = 0;

  if (profilesData) {
    const { page, perPage, total: pageTotal, totalPages, data } = profilesData;
    profiles = profilesData.data;
    total = pageTotal;
  }

  const skillsOptions = (skills || [])?.map((skill: Skill) => {
    return { value: skill.title, label: skill.title };
  });

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="min-h-screen px-5 md:px-10 lg:px-20">
        <div className="flex-1">
          <DashboardPageHeader
            title="Explore Professional Profiles"
            description="Browse through profiles of skilled individuals across various fields. Discover potential collaborators, connect with experts, and expand your network to bring your projects to success. Whether you're looking for developers, designers, or strategists, find the right talent to meet your project needs and build lasting professional relationships."
          />
          <div className="h-14 py-5 flex flex-col space-y-5 w-full">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              triggerRefetch={refetch}
              options={{
                typeOptions: [{ value: "mentor", label: "Mentor" }],
                skillsOptions,
                statusOptions: [
                  { value: "Select Profile Type", label: "" },
                  { value: "hiring", label: "Hiring" },
                  { value: "looking for work", label: "Looking for work" },
                ],
                sortByOptions: [{ value: "views", label: "Views" }],
              }}
            />
            <ContentWrapper data={profiles as Profile[]}>
              {profilesData &&
                (profiles as Profile[])?.map(
                  ({
                    first_name,
                    last_name,
                    avatar,
                    id,
                    bio,
                    title,
                    heading,
                    skills,
                  }) => (
                    <div
                      key={id}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    >
                      <ProfileCard
                        name={`${first_name} ${last_name}`}
                        title={title}
                        heading={heading}
                        avatar={avatar as string}
                        id={id}
                        bio={bio}
                        skills={skills as Skill[]}
                      />
                    </div>
                  )
                )}
            </ContentWrapper>
            {profilesData && profiles && (
              <PaginationComponent
                data={profiles as Profile[]}
                total={total}
                setPagination={setPagination}
                limit={pagination.limit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
