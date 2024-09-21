"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  useQueries,
  UseQueryResult,
  UseQueryOptions,
  useMutation,
} from "@tanstack/react-query";

import { ProjectCard } from "@/components/ui/ProjectCard";
import axiosInstance from "@/lib/axiosInstance";
import { fetchCurrentUser } from "@/store/user";
import { Event } from "@/common/constants";
import AppModal from "@/components/ui/Modal";
import { AppDispatch, RootState } from "@/store";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import AddEventForm from "@/components/forms/CreateEventForm";
import { EventCardPreview } from "@/components/ui/EventCard";
import { ProfilePreviewCard } from "@/components/ui/ProfileCard";
import { setMainFeedSettings } from "@/store/ui";
import { ActivityComponent } from "@/components/ui/Activity";
import {
  fetchProfiles,
  fetchEvents,
  fetchProjects,
  fetchJobs,
} from "@/store/recommendations";
import { User } from "@/common/constants";
import { EventWithPagination } from "./events/page";
import { ProjectsWithPagination } from "./projects/page";
import AddItemButton from "@/components/ui/AddItemButton";
import { Activity } from "@/common/constants";

const fetchActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axiosInstance.get("/api/activities");

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

const fetchEventsData = async (
  pagination: any,
  contentType: string
): Promise<EventWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/events", {
      params: {
        limit: pagination.limit,
        page: pagination.page,
        contentType,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

const fetchProjectsData = async (
  pagination: any,
  contentType: string
): Promise<ProjectsWithPagination[]> => {
  try {
    const response = await axiosInstance.get("/api/projects", {
      params: {
        limit: pagination.limit,
        page: pagination.page,
        contentType,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

const followUser = async (profileId: string) => {
  const response = await axiosInstance.patch(
    `/api/profiles/${profileId}/follow`
  );

  return response.data.data;
};

const MainFeed: React.FC = () => {
  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);

  const followMutation = useMutation({
    mutationFn: (profileId: string) => followUser(profileId),
    onSuccess: () => {
      // console.log("User followed successfully");
    },
    onError: (error: any) => {
      // console.error("Error following the user:", error);
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const { mainFeedSettings } = useSelector((state: RootState) => state.ui);
  const currentUser: User = useSelector((state: RootState) => state.user);

  const [eventsPagination, setEventsPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [projectsPagination, setProjectsPagination] = useState({
    page: 1,
    limit: 10,
  });
  const results = useQueries({
    queries: [
      {
        queryKey: ["activities"],
        queryFn: fetchActivities,
      },
      {
        queryKey: [
          "projects",
          projectsPagination.page,
          projectsPagination.limit,
          mainFeedSettings.contentTypeFrom,
        ],
        queryFn: () =>
          fetchProjectsData(
            projectsPagination,
            mainFeedSettings.contentTypeFrom
          ),
      },
      {
        queryKey: [
          "events",
          eventsPagination.page,
          eventsPagination.limit,
          mainFeedSettings.contentTypeFrom,
        ],
        queryFn: () =>
          fetchEventsData(eventsPagination, mainFeedSettings.contentTypeFrom),
      },
    ] as UseQueryOptions<unknown, unknown, unknown>[],
  }) as [
    UseQueryResult<Activity[], unknown>,
    UseQueryResult<ProjectsWithPagination, unknown>,
    UseQueryResult<EventWithPagination, unknown>
  ];

  const handleFollow = (profileId: string) => {
    followMutation.mutate(profileId);
  };

  const [activitiesResult, projectsResult, eventsResult] = results as [
    UseQueryResult<Activity[], unknown>,
    UseQueryResult<ProjectsWithPagination>,
    UseQueryResult<EventWithPagination>
  ];

  let events;
  let eventsTotal: number = 0;

  if (eventsResult.data) {
    events = eventsResult.data.data;
    eventsTotal = eventsResult.data.total;
  }

  let projects;
  let projectsTotal: number = 0;

  if (projectsResult.data) {
    projects = projectsResult.data.data;
    projectsTotal = projectsResult.data.total;
  }

  let activities;
  if (activitiesResult) {
    activities = activitiesResult.data;
  }

  const user = useSelector((state: RootState) => state.user);
  const {
    profiles: profilesRecommendations,
    events: eventsRecommendations,
    jobs: jobsRecommendations,
    projects: projectsRecommendations,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.recommendations);
  const [addEventModalIsOpen, setAddEventModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddEventModal = () => {
    setAddEventModalIsOpen(!addEventModalIsOpen);
  };

  const [addProjectModalIsOpen, setAddProjectModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddProjectModal = () => {
    setAddProjectModalIsOpen(!addProjectModalIsOpen);
  };

  const handleMainFeedContentChange = (type: string) => {
    dispatch(
      setMainFeedSettings({
        contentType: type,
        contentTypeFrom: mainFeedSettings.contentTypeFrom,
      })
    );
  };

  const handleMainFeedContentFromChange = (type: string) => {
    dispatch(
      setMainFeedSettings({
        contentType: mainFeedSettings.contentType,
        contentTypeFrom: type,
      })
    );
  };

  const handleToggleFollowersModal = () => {
    setFollowersModalIsOpen((o) => !o);
  };

  const handleToggleFollowingModal = () => {
    setFollowingModalIsOpen((o) => !o);
  };

  const handleEventsPageChange = (newPage: number, limit: number) => {
    if (limit < eventsTotal)
      setEventsPagination({ limit: limit, page: newPage || 1 });
  };

  const handleProjectsPageChange = (newPage: number, limit: number) => {
    if (limit < projectsTotal)
      setProjectsPagination({ limit: limit, page: newPage || 1 });
  };

  useEffect(() => {
    if (!profilesRecommendations || !profilesRecommendations?.length)
      dispatch(fetchProfiles());
    if (!projectsRecommendations.length || !projectsRecommendations.length)
      dispatch(fetchProjects());
    if (!eventsRecommendations || !eventsRecommendations?.length)
      dispatch(fetchEvents());
    if (!jobsRecommendations || !jobsRecommendations?.length)
      dispatch(fetchJobs());
    if (!currentUser.id) dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <aside className="w-96 space-y-5">
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-semibold mb-3 text-gray-700">
              Upcoming events
            </h3>
            <div className="space-y-4">
              {eventsRecommendations?.slice(0, 4).map((event: Event) => (
                <div
                  className="border-b border-b-gray-200 last:border-b-0 py-3"
                  key={event.id}
                >
                  <EventCardPreview
                    id={event.id}
                    banner={event.banner}
                    title={event.title}
                    location={event.location as string}
                    event_start_date={event.event_start_date}
                    description={event.description}
                    comment_count={event.comments?.length}
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>
        <div className="flex-1 space-y-6">
          <div className="p-4 bg-white rounded-lg border border-gray-300 space-y-3 flex justify-between items-center">
            {currentUser.id && (
              <div className="w-1/2 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="border border-gray-300 p-1 rounded-full">
                    <Image
                      src="/images/test-avatar.jpg"
                      width={80}
                      height={80}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-sm text-gray-900">
                      {currentUser.profile.first_name}{" "}
                      {currentUser.profile.last_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      Product Manager
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-600">
                  <span
                    className="underline cursor-pointer"
                    onClick={handleToggleFollowersModal}
                  >
                    <span>{currentUser.profile.followers.length}</span>{" "}
                    <span>Followers</span>
                  </span>
                  <span
                    className="underline cursor-pointer"
                    onClick={handleToggleFollowingModal}
                  >
                    <span>{currentUser.profile.following.length}</span>{" "}
                    <span className="underline">Following</span>
                  </span>
                </div>
              </div>
            )}
            <div className="space-y-6">
              <div className="">
                <div className="">
                  <div className="flex space-x-3 justify-end">
                    <AddItemButton
                      title="Event"
                      handleOnClick={handleToggleAddEventModal}
                    />
                    <AddItemButton
                      title="Project"
                      handleOnClick={handleToggleAddProjectModal}
                      fill="bg-slate-100 text-gray-500 hover:bg-slate-200"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-right">
                <span className="text-xs font-medium">Customize feed</span>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs text-gray-500">Feed Content:</span>
                  {["events", "projects"].map((contentType) => (
                    <div
                      onClick={() => handleMainFeedContentChange(contentType)}
                      key={contentType}
                      className={`${
                        mainFeedSettings.contentType ===
                        contentType.toLowerCase()
                          ? "bg-violet-100"
                          : ""
                      } text-xs capitalize cursor-pointer border hover:bg-violet-100 border-violet-500 text-violet-500 py-1 px-2 rounded`}
                    >
                      {contentType}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs text-gray-500">From:</span>
                  {["following", "all"].map((contentTypeFrom) => (
                    <div
                      onClick={() =>
                        handleMainFeedContentFromChange(contentTypeFrom)
                      }
                      key={contentTypeFrom}
                      className={`${
                        mainFeedSettings.contentTypeFrom ===
                        contentTypeFrom.toLowerCase()
                          ? "bg-violet-100"
                          : ""
                      } text-xs capitalize cursor-pointer border hover:bg-violet-100 border-violet-500 text-violet-500 py-1 px-2 rounded`}
                    >
                      {contentTypeFrom}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            {mainFeedSettings.contentType === "projects" &&
              projects &&
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
                  />
                )
              )}
            {mainFeedSettings.contentType === "events" &&
              events &&
              events?.map((event) => (
                <div
                  key={event.id}
                  className="w-full border border-gray-300 rounded-lg p-4 h-48"
                >
                  <EventCardPreview
                    id={event.id}
                    banner="https://nwanguma.github.io/Quick-host/images/test-event-3.jpg"
                    title={event.title}
                    location="London, England"
                    event_start_date={event.event_start_date}
                    description="An annual conference showcasing the latest in technology and innovation. An annual conference showcasing..."
                    comment_count={event.comments?.length}
                  />
                </div>
              ))}
            {/* <ProjectCard /> */}
          </div>
        </div>
        <aside className="w-1/4 space-y-5">
          {activities && !!activities.length && (
            <div className="p-4 bg-white rounded-lg border border-gray-300">
              <h3 className="font-semibold mb-3 text-gray-700 text-base">
                Timeline Activities
              </h3>
              <div className="space-y-2">
                {activities &&
                  activities.map((activity) => (
                    <ActivityComponent
                      key={activity.id}
                      activity={activity}
                      currentUserProfileId={currentUser?.profile?.id}
                    />
                  ))}
              </div>
            </div>
          )}
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-semibold mb-6  text-gray-700 text-base">
              Connect with professionals
            </h3>
            <div className="space-y-4">
              {profilesRecommendations &&
                profilesRecommendations.map((profile) => {
                  let hasFollowed = false;

                  if (currentUser)
                    hasFollowed = currentUser.profile.following
                      .map((following) => following.uuid)
                      .includes(profile.id);
                  return (
                    <div
                      key={profile.id}
                      className="border-b border-b-gray-200 pb-4 last:border-0"
                    >
                      <ProfilePreviewCard
                        name={profile.first_name + " " + profile.last_name}
                        title={profile.title}
                        id={profile.id}
                        hasFollowed={hasFollowed}
                        handleFollow={() => handleFollow(profile.id)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </aside>
      </div>
      <AppModal
        title="Create event"
        isOpen={addEventModalIsOpen}
        onClose={() => handleToggleAddEventModal()}
        width="w-5/12"
      >
        <AddEventForm />
      </AppModal>
      <AppModal
        title="Create Project"
        isOpen={addProjectModalIsOpen}
        onClose={() => handleToggleAddProjectModal()}
      >
        <CreateProjectForm />
      </AppModal>
      <AppModal
        title="Following"
        isOpen={followingModalIsOpen}
        onClose={() => handleToggleFollowingModal()}
      >
        <div className="p-4">
          <div className="space-y-4">
            {profilesRecommendations &&
              profilesRecommendations.map((profile) => {
                let hasFollowed = false;

                if (currentUser)
                  hasFollowed = currentUser.profile.following
                    .map((following) => following.uuid)
                    .includes(profile.id);
                return (
                  <div
                    key={profile.id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      name={profile.first_name + " " + profile.last_name}
                      title={profile.title}
                      id={profile.id}
                      hasFollowed={hasFollowed}
                      handleFollow={() => handleFollow(profile.id)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </AppModal>
      <AppModal
        title="Followers"
        isOpen={followersModalIsOpen}
        onClose={() => handleToggleFollowersModal()}
      >
        <div className="p-4">
          <div className="space-y-4">
            {profilesRecommendations &&
              profilesRecommendations.map((profile) => {
                let hasFollowed = false;

                if (currentUser)
                  hasFollowed = currentUser.profile.following
                    .map((following) => following.uuid)
                    .includes(profile.id);
                return (
                  <div
                    key={profile.id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      name={profile.first_name + " " + profile.last_name}
                      title={profile.title}
                      id={profile.id}
                      hasFollowed={hasFollowed}
                      handleFollow={() => handleFollow(profile.id)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default MainFeed;
