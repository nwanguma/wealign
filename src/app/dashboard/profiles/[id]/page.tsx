"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { Profile } from "@/common/constants";
import { fetchProfile } from "@/api";
import { SkeletonLoaderPage } from "@/components/ui/SkeletonLoader";
import { ProfilePreviewCard } from "@/components/ui/ProfileCardPreview";
import { ProfileCardMain } from "@/components/ui/ProfileCardMain";

export default function ProfilePage() {
  const { recommendations, user } = useSelector((state: RootState) => ({
    recommendations: state.recommendations,
    user: state.user,
  }));
  const {
    isLoading: isRecommendationsLoading,
    profiles: profileRecommendations,
  } = recommendations;
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
    <div className="min-h-screen w-full bg-white">
      <div className="flex space-x-5 p-6">
        <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg">
          {isLoading && <SkeletonLoaderPage />}
          {!isLoading && profile && (
            <div className="w-full">
              <ProfileCardMain profile={profile} />
            </div>
          )}
        </div>
        <aside className="w-1/3 space-y-5">
          {isRecommendationsLoading && <SkeletonCard />}
          {!isRecommendationsLoading && (
            <div className="p-4 bg-white rounded-lg border border-gray-300">
              <h3 className="font-semibold mb-3 text-gray-700 text-base">
                Who to Follow
              </h3>
              <div className="space-y-4">
                {profileRecommendations &&
                  [...profileRecommendations]
                    .slice(0, 4)
                    .map((profile: Profile) => {
                      return (
                        <div
                          key={profile.id}
                          className="border-b border-b-gray-200 py-3"
                        >
                          <ProfilePreviewCard
                            name={profile.first_name + " " + profile.last_name}
                            title={profile.title}
                            profile_id={profile.id}
                          />
                        </div>
                      );
                    })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
