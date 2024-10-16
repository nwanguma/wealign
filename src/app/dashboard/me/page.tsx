"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import AppModal from "@/components/ui/Modal";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import AccountsSettings from "@/components/forms/AccountsSettings";
import { ProfileCardMain } from "@/components/ui/ProfileCardMain";
import { WithTooltip } from "@/components/ui/WithTooltip";
import { Profile } from "@/common/constants";
import { fetchProfile } from "@/api";
import { SkeletonLoaderPage } from "@/components/ui/SkeletonLoader";

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
      <div className="min-h-screen w-10/12 bg-white mx-auto">
        {isLoading && <SkeletonLoaderPage />}
        {!isLoading && profile && (
          <div className="flex space-x-5 p-6">
            <div className="flex-1 p-4 flex flex-col space-y-5 w-full rounded-lg">
              <div className="w-full relative">
                <ProfileCardMain profile={profile} isMain />
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
        )}
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
          <AccountsSettings
            handleModalClose={() => setAccountsSettingsModalIsOpen(false)}
          />
        </AppModal>
      </div>
    </div>
  );
}
