"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import axiosInstance from "@/lib/axiosInstance";
import { RootState } from "@/store";
import AppModal from "@/components/ui/Modal";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import AccountsSettings from "@/components/forms/AccountsSettings";
import { ProfileCardMain } from "@/components/ui/ProfileCard";
import { WithTooltip } from "@/components/ui/WithTooltip";
import { Profile } from "@/common/constants";

const fetchProfile = async (id: string): Promise<Profile> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/profiles/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);
  const id = user.profile.id;

  const [accountsSettingsModalIsOpen, setAccountsSettingsModalIsOpen] =
    useState(false);
  const [updateProfileModalIsOpen, setUpdateProfileModalIsOpen] = useState(
    !!user.profile?.requires_update
  );

  const {
    data: profile,
    error,
    isLoading,
    refetch,
  } = useQuery<Profile, Error>({
    queryKey: ["profiles", id],
    queryFn: () => fetchProfile(id as string),
    enabled: !!id,
  });

  return (
    <div className="bg-white">
      {profile && (
        <div className="min-h-screen w-9/12 bg-white mx-auto">
          <div className="flex space-x-5 p-6">
            <div className="flex-1 p-4 flex flex-col space-y-5 w-full rounded-lg">
              <div className="w-full relative">
                <ProfileCardMain profile={profile} />
                <div className="absolute -top-4 right-0">
                  <div className="flex space-x-5">
                    <div
                      className="border border-gray-300 p-2 rounded-lg"
                      onClick={() => setUpdateProfileModalIsOpen((o) => !o)}
                    >
                      {WithTooltip(
                        "Edit profile",
                        <Image
                          src="/icons/edit.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                    <div
                      className="border border-gray-300 p-2 rounded-lg"
                      onClick={() => setAccountsSettingsModalIsOpen((o) => !o)}
                    >
                      {WithTooltip(
                        "Account Settings",
                        <Image
                          src="/icons/settings.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AppModal
            title={"Update Profile"}
            isOpen={updateProfileModalIsOpen}
            onClose={() => {
              setUpdateProfileModalIsOpen(false);
            }}
          >
            <UpdateProfileForm
              handleModalClose={() => setUpdateProfileModalIsOpen(false)}
              triggerRefetch={refetch}
            />
          </AppModal>
          <AppModal
            title={"Account Settings"}
            isOpen={accountsSettingsModalIsOpen}
            onClose={() => {
              setAccountsSettingsModalIsOpen(false);
              setUpdateProfileModalIsOpen(false);
            }}
          >
            <AccountsSettings />
          </AppModal>
        </div>
      )}
    </div>
  );
}