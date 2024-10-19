"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import { ProfileCard } from "@/components/ui/ProfileCard";
import FilterComponent from "@/components/ui/Filter";
import {
  Skill,
  Profile,
  ProfilesWithPagination,
  IFilters,
} from "@/common/constants";
import { useSkills } from "@/app/hooks/useSkills";
import PaginationComponent from "@/components/ui/PaginationComponent";
import ContentWrapper from "@/components/ui/ContentWrapper";
import { SkeletonLoaderGrid } from "@/components/ui/SkeletonLoader";
import { fetchProfiles } from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Profiles() {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
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
  const user = useSelector((state: RootState) => state.user);

  const { data: skills } = useSkills();

  let profiles: Profile[] | unknown[] = [];
  let total = 0;

  if (profilesData) {
    const { total: pageTotal } = profilesData;
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
          <div className="py-5 flex flex-col space-y-5 w-full">
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
            {!isLoading && (
              <ContentWrapper data={profiles as Profile[]}>
                {profilesData &&
                  (profiles as Profile[])?.map((profile) => {
                    let hasFollowed = false;

                    if (user)
                      hasFollowed = (user.profile?.following || [])
                        .map((following) => following.profile_id)
                        .includes(profile.id);

                    return (
                      <div
                        key={profile.id}
                        className="w-full border border-gray-300 rounded-lg p-3"
                      >
                        <ProfileCard
                          currentUserProfileId={user?.profile?.id}
                          profile={profile}
                          hasFollowed={hasFollowed}
                        />
                      </div>
                    );
                  })}
              </ContentWrapper>
            )}
            {isLoading && <SkeletonLoaderGrid />}
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
