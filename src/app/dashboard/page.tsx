"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  useQueries,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";

import axiosInstance from "@/lib/axiosInstance";
import { RootState, AppDispatch } from "@/store";
import { fetchCurrentUser } from "@/store/user";
import { fetchConversations } from "@/store/conversations";
import { setMainFeedSettings } from "@/store/ui";
import { ProjectCard } from "@/components/ui/ProjectCard";
import AppModal from "@/components/ui/Modal";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import AddEventForm from "@/components/forms/CreateEventForm";
import { EventCardPreview } from "@/components/ui/EventCard";
import { ProfilePreviewCard } from "@/components/ui/ProfileCard";
import { ActivityComponent } from "@/components/ui/Activity";
import AddItemButton from "@/components/ui/AddItemButton";
import {
  fetchProfiles,
  fetchEvents,
  fetchProjects,
  fetchJobs,
  fetchArticles,
} from "@/store/recommendations";
import {
  Event,
  User,
  Activity,
  ProjectsWithPagination,
  EventWithPagination,
  ArticlesWithPagination,
} from "@/common/constants";
import { WithTooltip } from "@/components/ui/WithTooltip";
import CreateArticleForm from "@/components/forms/CreateArticleForm";
import { ArticleCardPreview } from "@/components/ui/ArticleCard";

const fetchActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axiosInstance.get("/api/proxy/activities");

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
    const response = await axiosInstance.get("/api/proxy/events", {
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
    const response = await axiosInstance.get("/api/proxy/projects", {
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

const fetchArticlesData = async (
  pagination: any,
  contentType: string
): Promise<ArticlesWithPagination[]> => {
  try {
    const response = await axiosInstance.get("/api/proxy/articles", {
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

const MainFeed: React.FC = () => {
  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);

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
  const [articlesPagination, setArticlesPagination] = useState({
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
      {
        queryKey: [
          "articles",
          articlesPagination.page,
          articlesPagination.limit,
          mainFeedSettings.contentTypeFrom,
        ],
        queryFn: () =>
          fetchArticlesData(
            articlesPagination,
            mainFeedSettings.contentTypeFrom
          ),
      },
    ] as UseQueryOptions<unknown, unknown, unknown>[],
  }) as [
    UseQueryResult<Activity[], unknown>,
    UseQueryResult<ProjectsWithPagination, unknown>,
    UseQueryResult<EventWithPagination, unknown>,
    UseQueryResult<ArticlesWithPagination, unknown>
  ];

  const [activitiesResult, projectsResult, eventsResult, articlesResult] =
    results as [
      UseQueryResult<Activity[], unknown>,
      UseQueryResult<ProjectsWithPagination>,
      UseQueryResult<EventWithPagination>,
      UseQueryResult<ArticlesWithPagination>
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

  let articles;
  let articlesTotal: number = 0;

  if (articlesResult.data) {
    articles = articlesResult.data.data;
    articlesTotal = articlesResult.data.total;
  }

  const user = useSelector((state: RootState) => state.user);
  const {
    profiles: profilesRecommendations,
    events: eventsRecommendations,
    jobs: jobsRecommendations,
    projects: projectsRecommendations,
    articles: articlesRecommendations,
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
  const [addArticleModalIsOpen, setAddArticleModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddProjectModal = () => {
    setAddProjectModalIsOpen(!addProjectModalIsOpen);
  };

  const handleToggleAddArticleModal = () => {
    setAddArticleModalIsOpen(!addArticleModalIsOpen);
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

  const handleArticlesPageChange = (newPage: number, limit: number) => {
    if (limit < articlesTotal)
      setArticlesPagination({ limit: limit, page: newPage || 1 });
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
    if (!articlesRecommendations || !articlesRecommendations?.length)
      dispatch(fetchArticles());
    if (!currentUser.id) dispatch(fetchCurrentUser());
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <aside className="w-96 space-y-5">
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-app-medium mb-3">Upcoming events</h3>
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
              {!eventsRecommendations.length && (
                <div
                  className="text-custom-gray-paragraph"
                  style={{ fontSize: "13.5px" }}
                >
                  There are no upcoming events.
                </div>
              )}
            </div>
          </div>
        </aside>
        <div className="flex-1 space-y-6">
          <div
            className={`p-4 rounded-lg border border-gray-300 space-y-3 flex items-center ${
              currentUser.id ? "justify-between" : "justify-end"
            }`}
          >
            {currentUser.id && (
              <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="border border-gray-300 p-1 rounded-full">
                    <Image
                      src={currentUser.profile.avatar || ""}
                      width={80}
                      height={80}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-base text-custom-gray-heading font-custom font-app-medium">
                      {currentUser.profile.first_name}{" "}
                      {currentUser.profile.last_name}
                    </span>
                    <span className="text-xs text-custom-gray-small-text">
                      {currentUser.profile.title}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-600">
                  <span
                    className="underline cursor-pointer"
                    onClick={handleToggleFollowersModal}
                  >
                    <span>{currentUser.profile.followers?.length}</span>{" "}
                    <span>Followers</span>
                  </span>
                  <span
                    className="underline cursor-pointer"
                    onClick={handleToggleFollowingModal}
                  >
                    <span>{currentUser.profile.following?.length}</span>{" "}
                    <span className="underline">Following</span>
                  </span>
                </div>
              </div>
            )}
            <div className="space-y-6 w-5/12">
              <div className="">
                <div className="flex items-center space-x-2">
                  <span className="text-xs-sm text-custom-gray-paragraph">
                    Create:
                  </span>
                  <div className="flex space-x-3 justify-end">
                    <AddItemButton
                      icon={
                        <div>
                          {WithTooltip(
                            "New Project",
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 512 512"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                              <title>work-case-filled</title>
                              <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                              >
                                <g
                                  id="work-case"
                                  fill="#1D4ED8"
                                  transform="translate(42.666667, 64.000000)"
                                >
                                  <path
                                    d="M1.20792265e-13,197.76 C54.5835501,218.995667 112.186031,231.452204 170.666667,234.666667 L170.666667,277.333333 L256,277.333333 L256,234.666667 C314.339546,231.013 371.833936,218.86731 426.666667,198.613333 L426.666667,362.666667 L1.20792265e-13,362.666667 L1.20792265e-13,197.76 Z M277.333333,-1.42108547e-14 L298.666667,21.3333333 L298.666667,64 L426.666667,64 L426.666667,175.146667 C361.254942,199.569074 292.110481,212.488551 222.293333,213.333333 L222.293333,213.333333 L206.933333,213.333333 C136.179047,212.568604 66.119345,199.278929 7.10542736e-15,174.08 L7.10542736e-15,174.08 L7.10542736e-15,64 L128,64 L128,21.3333333 L149.333333,-1.42108547e-14 L277.333333,-1.42108547e-14 Z M256,42.6666667 L170.666667,42.6666667 L170.666667,64 L256,64 L256,42.6666667 Z"
                                    id="Combined-Shape-Copy"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          )}
                        </div>
                      }
                      handleOnClick={handleToggleAddProjectModal}
                      fill="bg-slate-100 text-custom-gray-paragraph hover:bg-slate-200"
                    />
                    <AddItemButton
                      icon={
                        <div>
                          {WithTooltip(
                            "New Article",
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                            >
                              <path
                                stroke="#1D4ED8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 8h2m-2 4h2m0 4H7m0-8v4h4V8H7zM5 20h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                              />
                            </svg>
                          )}
                        </div>
                      }
                      handleOnClick={handleToggleAddArticleModal}
                      fill="bg-slate-100 text-custom-gray-paragraph hover:bg-slate-200"
                    />
                    <AddItemButton
                      icon={
                        <div>
                          {WithTooltip(
                            "New Event",
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7 2a1 1 0 0 0-1 1v1.001c-.961.014-1.34.129-1.721.333a2.272 2.272 0 0 0-.945.945C3.116 5.686 3 6.09 3 7.205v10.59c0 1.114.116 1.519.334 1.926.218.407.538.727.945.945.407.218.811.334 1.926.334h11.59c1.114 0 1.519-.116 1.926-.334.407-.218.727-.538.945-.945.218-.407.334-.811.334-1.926V7.205c0-1.115-.116-1.519-.334-1.926a2.272 2.272 0 0 0-.945-.945C19.34 4.13 18.961 4.015 18 4V3a1 1 0 1 0-2 0v1H8V3a1 1 0 0 0-1-1zM5 9v8.795c0 .427.019.694.049.849.012.06.017.074.049.134a.275.275 0 0 0 .124.125c.06.031.073.036.134.048.155.03.422.049.849.049h11.59c.427 0 .694-.019.849-.049a.353.353 0 0 0 .134-.049.275.275 0 0 0 .125-.124.353.353 0 0 0 .048-.134c.03-.155.049-.422.049-.849L19.004 9H5zm8.75 4a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5z"
                                fill="#1D4ED8"
                              />
                            </svg>
                          )}
                        </div>
                      }
                      handleOnClick={handleToggleAddEventModal}
                      fill="bg-slate-100 text-custom-gray-paragraph hover:bg-slate-200"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-right">
                <span className="text-xs font-medium">Customize feed</span>
                <div className="flex space-x-2 items-center justify-end">
                  <span className="text-xs text-custom-gray-paragraph">
                    Content:
                  </span>
                  {["events", "projects", "articles"].map((contentType) => (
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
                <div className="flex space-x-2 items-center justify-end">
                  <span className="text-xs text-custom-gray-paragraph">
                    From:
                  </span>
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
                    banner={event.banner}
                    title={event.title}
                    location={event.location as string}
                    event_start_date={event.event_start_date}
                    description={event.description}
                    comment_count={event.comments?.length}
                    description_limit={50}
                  />
                </div>
              ))}
            {mainFeedSettings.contentType === "articles" &&
              articles &&
              articles?.map((article) => (
                <div
                  key={article.id}
                  className="w-full border border-gray-300 rounded-lg p-4 h-48"
                >
                  <ArticleCardPreview
                    id={article.id}
                    body={article.body}
                    banner={article.banner}
                    title={article.title}
                    createdAt={article.created_at}
                    owner={article.owner}
                  />
                </div>
              ))}
            {/* <ProjectCard /> */}
          </div>
        </div>
        <aside className="w-1/4 space-y-5">
          {activities && !!activities.length && (
            <div className="p-4 bg-white rounded-lg border border-gray-300">
              <h3 className="font-app-medium mb-3 text-gray-700 text-base">
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
            <h3 className="font-app-medium mb-6  text-gray-700 text-base">
              Connect with professionals
            </h3>
            <div className="space-y-4">
              {profilesRecommendations &&
                profilesRecommendations.map((profile) => {
                  let hasFollowed = false;

                  if (currentUser)
                    hasFollowed = (currentUser.profile.following || [])
                      .map((following) => following.id)
                      .includes(profile.id);

                  return (
                    <div
                      key={profile.id}
                      className="border-b border-b-gray-200 pb-4 last:border-0"
                    >
                      <ProfilePreviewCard
                        name={profile.first_name + " " + profile.last_name}
                        title={profile.title}
                        profile_id={profile.id}
                        user_id={profile.user_id}
                        hasFollowed={hasFollowed}
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
        title="Create Article"
        isOpen={addArticleModalIsOpen}
        onClose={() => handleToggleAddArticleModal()}
      >
        <CreateArticleForm handleCloseModal={handleToggleAddArticleModal} />
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
                  hasFollowed = (currentUser.profile?.following || [])
                    .map((following) => following.id)
                    .includes(profile.id);

                return (
                  <div
                    key={profile.id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      name={profile.first_name + " " + profile.last_name}
                      title={profile.title}
                      profile_id={profile.id}
                      user_id={profile.user_id}
                      hasFollowed={hasFollowed}
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
                  hasFollowed = (currentUser.profile?.following || [])
                    .map((following) => following.id)
                    .includes(profile.id);
                return (
                  <div
                    key={profile.id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      name={profile.first_name + " " + profile.last_name}
                      title={profile.title}
                      profile_id={profile.id}
                      user_id={profile.user_id}
                      hasFollowed={hasFollowed}
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
