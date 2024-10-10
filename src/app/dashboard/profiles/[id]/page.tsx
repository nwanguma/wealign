"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { ProfilePreviewCard } from "@/components/ui/ProfileCard";
import { Profile } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";

import { ProfileCardMain } from "@/components/ui/ProfileCard";

const fetchProfile = async (id: string): Promise<Profile> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/profiles/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function ProfilePage() {
  const params = useParams();
  const id = params?.id;

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery<Profile, Error>({
    queryKey: ["profiles", id],
    queryFn: () => fetchProfile(id as string),
  });

  return (
    <div>
      {profile && (
        <div className="min-h-screen w-full bg-white">
          <div className="flex space-x-5 p-6">
            <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg">
              <div className="w-full">
                <ProfileCardMain profile={profile} />
              </div>
            </div>
            <aside className="w-1/3 space-y-5">
              <div className="p-4 bg-white rounded-lg border border-gray-300">
                <h3 className="font-semibold mb-3 text-gray-700 text-base">
                  Who to Follow
                </h3>
                <div className="space-y-4">
                  <ProfilePreviewCard
                    name="Hauwa Halima"
                    title="Project Manager"
                    id="4"
                  />
                </div>
              </div>
            </aside>
          </div>
          {/* <AppModal
        title="This is the title"
        isOpen={true}
        onClose={() => console.log("closed")}
      > */}
          {/* <AddEventForm /> */}

          {/* <CreateProjectForm /> */}

          {/* <UpdateProfileForm /> */}
          {/* <AccountSettings /> */}
          {/* </AppModal> */}
          {/* <CustomForm /> */}
        </div>
      )}
    </div>
  );
}
