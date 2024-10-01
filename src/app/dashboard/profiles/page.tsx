"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import { ProfileCard } from "@/components/ui/ProfileCard";
import FilterComponent from "@/components/ui/Filter";
import { Skill, Profile } from "@/common/constants";
import AddItemButton from "@/components/ui/AddItemButton";
import { ProfilesWithPagination } from "@/common/constants";

const fetchProfiles = async (): Promise<ProfilesWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/profiles");

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Profiles() {
  const {
    data: profilesData,
    error,
    isLoading,
  } = useQuery<ProfilesWithPagination, Error>({
    queryKey: ["profiles"],
    queryFn: fetchProfiles,
  });

  let profiles: Profile[] | unknown[] = [];

  if (profilesData) {
    const { page, perPage, total, totalPages, data } = profilesData;
    profiles = profilesData.data;
  }

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="min-h-screen px-5 md:px-10 lg:px-20">
        <div className="flex-1">
          <DashboardPageHeader
            title="Explore Professional Profiles"
            description="Browse through profiles of skilled individuals across various fields. Discover potential collaborators, connect with experts, and expand your network to bring your projects to success. Whether you're looking for developers, designers, or strategists, find the right talent to meet your project needs and build lasting professional relationships."
          />
          <div className="h-14 py-5 flex flex-col space-y-5 w-full">
            <FilterComponent />
            <div
              className={`w-full grid ${
                profiles.length === 1
                  ? "!grid-cols-1"
                  : profiles.length === 2
                  ? "!grid-cols-2"
                  : ""
              } grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5`}
            >
              {(profiles as Profile[])?.map(
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
