"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import PaginationComponent from "@/components/ui/PaginationComponent";
import { RootState, AppDispatch } from "@/store";
import { fetchConnections } from "@/store/connections";
import { setMainFeedSettings } from "@/store/ui";
import { ProjectCard } from "@/components/ui/ProjectCard";
import AppModal from "@/components/ui/Modal";
import CreateProjectForm from "@/components/forms/ProjectForm";
import AddEventForm from "@/components/forms/EventForm";
import { EventCardPreview } from "@/components/ui/EventCard";
import { ProfilePreviewCard } from "@/components/ui/ProfileCardPreview";
import AddItemButton from "@/components/ui/AddItemButton";
import { Event, User, Project, Connection } from "@/common/constants";
import { WithTooltip } from "@/components/ui/WithTooltip";
import CreateArticleForm from "@/components/forms/ArticleForm";
import { ArticleCardPreview } from "@/components/ui/ArticleCard";
import {
  SkeletonCardRounded,
  SkeletonLoader,
} from "@/components/ui/SkeletonLoader";
import { fetchProjectsData, fetchEventsData, fetchArticlesData } from "@/api";
import RecommendationsComponent from "@/components/ui/RecommendationsComponent";
import {
  selectProfilesRecommendations,
  selectUpcomingEventsRecommendations,
  selectLiveEventsRecommendations,
  selectEventsRecommendations,
  selectIsRecommendationsLoading,
  selectCurrentUser,
  selectConnectionsData,
} from "../../lib/selectors";

import "../../app/globals.css";

const MainFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mainFeedSettings } = useSelector((state: RootState) => state.ui);
  const {
    profilesRecommendations,
    upcomingEventsRecommendations,
    liveEventsRecommendations,
    eventsRecommendations,
    isRecommendationsLoading,
    currentUser,
    connectionsData,
  } = useSelector(
    (state: RootState) => ({
      profilesRecommendations: selectProfilesRecommendations(state),
      upcomingEventsRecommendations: selectUpcomingEventsRecommendations(state),
      liveEventsRecommendations: selectLiveEventsRecommendations(state),
      eventsRecommendations: selectEventsRecommendations(state),
      isRecommendationsLoading: selectIsRecommendationsLoading(state),
      currentUser: selectCurrentUser(state),
      connectionsData: selectConnectionsData(state),
    }),
    shallowEqual
  );

  const [eventsPagination, setEventsPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [projectsPagination, setProjectsPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [articlesPagination, setArticlesPagination] = useState({
    page: 1,
    limit: 5,
  });

  const { data: projectsData, isLoading: projectsIsLoading } = useQuery({
    queryKey: [
      "projects",
      projectsPagination,
      mainFeedSettings.contentTypeFrom,
    ],
    queryFn: () =>
      fetchProjectsData(projectsPagination, mainFeedSettings.contentTypeFrom),
    enabled: mainFeedSettings.contentType === "projects",
    placeholderData: keepPreviousData,
  });

  const { data: eventsData, isLoading: eventsIsLoading } = useQuery({
    queryKey: [
      "events",
      eventsPagination.page,
      eventsPagination.limit,
      mainFeedSettings.contentTypeFrom,
    ],
    queryFn: () =>
      fetchEventsData(eventsPagination, mainFeedSettings.contentTypeFrom),
    enabled: mainFeedSettings.contentType === "events",
    placeholderData: keepPreviousData,
  });

  const { data: articlesData, isLoading: articlesIsLoading } = useQuery({
    queryKey: [
      "articles",
      articlesPagination.page,
      articlesPagination.limit,
      mainFeedSettings.contentTypeFrom,
    ],
    queryFn: () =>
      fetchArticlesData(articlesPagination, mainFeedSettings.contentTypeFrom),
    enabled: mainFeedSettings.contentType === "articles",
    placeholderData: keepPreviousData,
  });

  let events;
  let eventsTotal: number = 0;

  if (eventsData) {
    const { total: pageTotal } = eventsData;
    events = eventsData.data;
    eventsTotal = pageTotal;
  }

  let projects: Project[] = [];
  let projectsTotal: number = 0;

  if (projectsData) {
    const { total: pageTotal } = projectsData;
    projects = projectsData.data;
    projectsTotal = pageTotal;
  }

  let articles;
  let articlesTotal: number = 0;

  if (articlesData) {
    const { total: pageTotal } = articlesData;
    articles = articlesData.data;
    articlesTotal = pageTotal;
  }

  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [addEventModalIsOpen, setAddEventModalIsOpen] =
    useState<boolean>(false);
  const [addProjectModalIsOpen, setAddProjectModalIsOpen] =
    useState<boolean>(false);
  const [addArticleModalIsOpen, setAddArticleModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddEventModal = () => {
    setAddEventModalIsOpen(!addEventModalIsOpen);
  };

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

  const eventsToDisplay =
    upcomingEventsRecommendations?.length > 0
      ? upcomingEventsRecommendations
      : liveEventsRecommendations?.length > 0
      ? liveEventsRecommendations
      : eventsRecommendations;

  const MemoizedRecommendations = useMemo(
    () => (
      <RecommendationsComponent
        recommendations={eventsToDisplay}
        isLoading={isRecommendationsLoading}
        title={
          upcomingEventsRecommendations?.length > 0
            ? "Upcoming events"
            : liveEventsRecommendations?.length > 0
            ? "Live events"
            : "Events you may be interested in"
        }
        render={(event) => (
          <EventCardPreview event={event as Event} isPreview />
        )}
      />
    ),
    [
      eventsToDisplay,
      upcomingEventsRecommendations,
      liveEventsRecommendations,
      isRecommendationsLoading,
    ]
  );

  useEffect(() => {
    dispatch(fetchConnections());
  }, []);

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex lg:space-x-5">
        <div className="hidden xl:block">
          <aside className="w-96 space-y-5 md:sticky top-0 self-start">
            {MemoizedRecommendations}
          </aside>
        </div>
        <div className="w-full md:flex-1">
          <div className="space-y-6 sticky top-0 self-start">
            <div
              className={`p-4 rounded-lg border border-gray-300 space-y-5 s:space-y-3 flex flex-col s:flex-row items-center justify-between`}
            >
              {currentUser?.id && (
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col text-center s:text-left s:flex-row items-center space-x-2">
                    <div className="border border-gray-300 p-1 rounded-full">
                      <Image
                        src={
                          currentUser.profile.avatar ||
                          "/images/profile-placeholder.png"
                        }
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
                      onClick={() =>
                        !!connectionsData.followers?.length &&
                        handleToggleFollowersModal()
                      }
                    >
                      <span>{connectionsData.followers?.length}</span>{" "}
                      <span>Followers</span>
                    </span>
                    <span
                      className="underline cursor-pointer"
                      onClick={() =>
                        !!connectionsData.following?.length &&
                        handleToggleFollowingModal()
                      }
                    >
                      <span>{connectionsData.following?.length}</span>{" "}
                      <span className="underline">Following</span>
                    </span>
                  </div>
                </div>
              )}
              {!currentUser?.id && <SkeletonCardRounded />}
              <div className="space-y-3 xs:space-y-6">
                <div className="">
                  <div className="flex justify-start xs:justify-end items-center space-x-2">
                    <span className="text-xs-sm text-custom-gray-paragraph">
                      Create:
                    </span>
                    <div className="flex flex-wrap lg:flex-nowrap space-x-3 justify-end">
                      <AddItemButton
                        icon={
                          <div>
                            {WithTooltip(
                              "New Project",
                              <svg
                                className="w-4 h-4 xs:w-6 xs:h-6"
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
                      <AddItemButton
                        icon={
                          <div>
                            {WithTooltip(
                              "New Article",
                              <svg
                                className="w-4 h-4 xs:w-6 xs:h-6"
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
                                className="w-4 h-4 xs:w-6 xs:h-6"
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
                <div className="space-y-1 xs:space-y-3">
                  <span className="text-xs font-medium text-center s:text-right w-full block">
                    Customize feed
                  </span>
                  <div className="flex flex-wrap space-x-1 xs:space-x-2 items-center justify-start xs:justify-end">
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
                  <div className="flex flex-wrap space-x-1 xs:space-x-2 items-center justify-start sm:justify-end">
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
            {(projectsIsLoading || eventsIsLoading || articlesIsLoading) && (
              <SkeletonLoader />
            )}
            {!(projectsIsLoading || eventsIsLoading || articlesIsLoading) && (
              <div className="overflow-y-auto hide-scroll h-screen">
                {mainFeedSettings.contentType === "projects" && (
                  <div className="space-y-3">
                    {projects &&
                      projects?.map((project) => (
                        <ProjectCard key={project?.id} project={project} />
                      ))}
                    <PaginationComponent
                      data={projects || []}
                      total={projectsTotal}
                      setPagination={setProjectsPagination}
                      limit={projectsPagination.limit}
                      tag="projects"
                    />
                  </div>
                )}
                {mainFeedSettings.contentType === "events" && (
                  <div className="space-y-3">
                    {events &&
                      events?.map((event) => {
                        return (
                          <div
                            key={event?.id}
                            className="w-full border border-gray-300 rounded-lg p-4 h-auto md:h-48"
                          >
                            <EventCardPreview event={event} />
                          </div>
                        );
                      })}
                    <PaginationComponent
                      data={events || []}
                      total={eventsTotal}
                      setPagination={setEventsPagination}
                      limit={eventsPagination.limit}
                      tag="events"
                    />
                  </div>
                )}
                {mainFeedSettings.contentType === "articles" && (
                  <div className="space-y-3">
                    {articles &&
                      articles?.map((article) => (
                        <div
                          key={article?.id}
                          className="w-full border border-gray-300 rounded-lg p-4 h-auto md:h-48"
                        >
                          <ArticleCardPreview article={article} />
                        </div>
                      ))}
                    <PaginationComponent
                      data={articles || []}
                      total={articlesTotal}
                      setPagination={setArticlesPagination}
                      limit={articlesPagination.limit}
                      tag="articles"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:block md:w-1/3 xl:w-1/4">
          <aside className="space-y-5 sticky top-0 self-start">
            {/* {activities && !!activities.length && (
            <div className="p-4 bg-white rounded-lg border border-gray-300">
              <h3 className="font-app-medium mb-3 text-gray-700 text-base">
                Timeline Activities
              </h3>
              <div className="space-y-2">
                {activities &&
                  activities.map((activity) => (
                    <ActivityComponent
                      key={activity?.id}
                      activity={activity}
                      currentUserProfileId={currentUser?.profile?.id}
                    />
                  ))}
              </div>
            </div>
          )} */}
            <div className="p-4 bg-white rounded-lg border border-gray-300">
              <h3 className="font-app-medium mb-5  text-gray-700 text-base">
                Connect with professionals
              </h3>
              <div className="space-y-4">
                {profilesRecommendations &&
                  profilesRecommendations.length > 0 &&
                  profilesRecommendations.map((profile) => {
                    let hasFollowed = false;

                    if (currentUser)
                      hasFollowed = (connectionsData.following || [])
                        .map((following) => {
                          return (following as Connection).profile_id as string;
                        })
                        .includes(profile?.id);

                    return (
                      <div
                        key={profile?.id}
                        className="border-b border-b-gray-200 pb-4 last:border-0"
                      >
                        <ProfilePreviewCard
                          email={profile.email}
                          currentUserProfileId={currentUser?.profile?.id}
                          name={profile.first_name + " " + profile.last_name}
                          title={profile.title}
                          profile_id={profile?.id}
                          user_id={profile.user_id}
                          avatar={
                            profile.avatar || "/images/profile-placeholder.png"
                          }
                          hasFollowed={hasFollowed}
                        />
                      </div>
                    );
                  })}
                {profilesRecommendations?.length == 0 && (
                  <div className="text-sm text-gray-600">
                    Looks like there is nothing to show.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <AppModal
        title="Create event"
        isOpen={addEventModalIsOpen}
        onClose={() => handleToggleAddEventModal()}
      >
        <AddEventForm handleModalClose={handleToggleAddEventModal} />
      </AppModal>
      <AppModal
        title="Create Project"
        isOpen={addProjectModalIsOpen}
        onClose={() => handleToggleAddProjectModal()}
      >
        <CreateProjectForm handleModalClose={handleToggleAddProjectModal} />
      </AppModal>
      <AppModal
        title="Create Article"
        isOpen={addArticleModalIsOpen}
        onClose={() => handleToggleAddArticleModal()}
        width="w-full sm:w-[75%] md:w-[65%] lg:w-[60%] xl:w-[55%] xxl:w-[35%]"
      >
        <CreateArticleForm handleModalClose={handleToggleAddArticleModal} />
      </AppModal>
      <AppModal
        title="Following"
        isOpen={followingModalIsOpen}
        onClose={() => handleToggleFollowingModal()}
      >
        <div className="p-4">
          <div className="space-y-4">
            {currentUser?.profile?.following &&
              currentUser?.profile?.following.map((profile) => {
                let hasFollowed = false;

                if (currentUser)
                  hasFollowed = (connectionsData.following || [])
                    .map((following) => (following as Connection).profile_id)
                    .includes(profile.profile_id);

                return (
                  <div
                    key={profile.profile_id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      email={profile.email}
                      currentUserProfileId={currentUser?.profile?.id}
                      name={profile.first_name + " " + profile.last_name}
                      title={profile.title || ""}
                      profile_id={profile.profile_id}
                      user_id={profile.user_id}
                      avatar={
                        profile.avatar || "/images/profile-placeholder.png"
                      }
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
            {connectionsData?.followers &&
              connectionsData?.followers.map((follower: Connection) => {
                let hasFollowed = false;

                if (currentUser)
                  hasFollowed = (connectionsData.following || [])
                    .map((following) => (following as Connection).profile_id)
                    .includes(follower.profile_id);
                return (
                  <div
                    key={follower.profile_id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      email={follower.email}
                      currentUserProfileId={currentUser?.profile?.id}
                      name={follower.first_name + " " + follower.last_name}
                      title={follower.title || ""}
                      profile_id={follower.profile_id}
                      user_id={follower.user_id}
                      avatar={
                        follower.avatar || "/images/profile-placeholder.png"
                      }
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
