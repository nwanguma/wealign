import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";

import { mapLanguageToFlag, Skill } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import { AppDispatch, RootState } from "@/store";
import { fetchProfiles } from "@/store/recommendations";
import { addToConversations } from "@/store/conversations";
import { getFilenameAndExtension } from "@/lib/helpers";
import { Profile, Event, Project, Job } from "@/common/constants";

import { EventCardPreview } from "./EventCard";
import { ProjectCard } from "./ProjectCard";
import { JobCard } from "./JobCard";
import { WithTooltip } from "./WithTooltip";
import { SkeletonLoader } from "./SkeletonLoader";
import ShareComponent from "./ShareComponent";

interface IProfilePreviewCardProps {
  profile_id: string;
  user_id?: string;
  name: string;
  title: string;
  isPreview?: boolean;
  hasFollowed?: boolean;
}

const followUser = async (profileId: string) => {
  const response = await axiosInstance.patch(
    `/api/proxy/profiles/${profileId}/follow`
  );

  return response.data.data;
};

const initiateConversation = async (recipientId: string) => {
  const response = await axiosInstance.post(
    `/api/proxy/conversations/${recipientId}`
  );

  return response.data?.data;
};

interface JustFollowed {
  [key: string]: boolean;
}

export const ProfilePreviewCard: React.FC<IProfilePreviewCardProps> = ({
  profile_id,
  user_id,
  name,
  title,
  hasFollowed,
}) => {
  const router = useRouter();
  const { conversations } = useSelector((state: RootState) => ({
    conversations: state.conversations.data,
  }));
  const dispatch = useDispatch<AppDispatch>();
  const [justFollowed, setJustFollowed] = useState<JustFollowed>({});
  const followMutation = useMutation({
    mutationFn: (profileId: string) => followUser(profileId),
    onSuccess: (data, profileId) => {
      setJustFollowed((prevState) => ({
        ...prevState,
        [profileId]: true,
      }));

      dispatch(fetchProfiles());
    },
    onError: (error: any) => {
      console.error("Error following the user:", error);
    },
  });
  const initiateConversationsMutation = useMutation({
    mutationFn: (recipientId: string) => initiateConversation(recipientId),
    onSuccess: (data) => {
      const isExistingConversation = conversations.find(
        (conversation) => conversation.id === data.id
      );

      if (isExistingConversation) {
        router.push(`/dashboard/messages/${data.id}`);
      } else {
        dispatch(addToConversations(data));

        setTimeout(() => {
          router.push("/dashboard/messages");
        }, 2000);
      }
    },
    onError: (error: any) => {
      // console.error("Error following the user:", error);
    },
  });

  const handleFollow = (profileId: string) => {
    followMutation.mutate(profileId);
  };

  const handleInitiateConversations = (recipientId: string) => {
    initiateConversationsMutation.mutate(recipientId);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 flex items-center space-x-2">
        <div className="border border-gray-300 p-1 rounded-full">
          <Image
            src="/images/test-avatar-3.jpg"
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-app-medium text-sm">{name}</span>
          <span className="text-xs text-custom-gray-paragraph">{title}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {!hasFollowed && !justFollowed[profile_id] && (
          <button
            onClick={() => handleFollow(profile_id)}
            className="flex items-center p-3 shadow bg-white border border-gray-300 text-sm rounded-full hover:bg-gray-100 text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 45.902 45.902"
              className="w-5 h-5"
            >
              <g>
                <g>
                  <path
                    d="M43.162,26.681c-1.564-1.578-3.631-2.539-5.825-2.742c1.894-1.704,3.089-4.164,3.089-6.912
          c0-5.141-4.166-9.307-9.308-9.307c-4.911,0-8.932,3.804-9.281,8.625c4.369,1.89,7.435,6.244,7.435,11.299
          c0,1.846-0.42,3.65-1.201,5.287c1.125,0.588,2.162,1.348,3.066,2.26c2.318,2.334,3.635,5.561,3.61,8.851l-0.002,0.067
          l-0.002,0.057l-0.082,1.557h11.149l0.092-12.33C45.921,30.878,44.936,28.466,43.162,26.681z"
                  />
                  <path
                    d="M23.184,34.558c1.893-1.703,3.092-4.164,3.092-6.912c0-5.142-4.168-9.309-9.309-9.309c-5.142,0-9.309,4.167-9.309,9.309
          c0,2.743,1.194,5.202,3.084,6.906c-4.84,0.375-8.663,4.383-8.698,9.318l-0.092,1.853h14.153h15.553l0.092-1.714
          c0.018-2.514-0.968-4.926-2.741-6.711C27.443,35.719,25.377,34.761,23.184,34.558z"
                  />
                  <path
                    d="M6.004,11.374v3.458c0,1.432,1.164,2.595,2.597,2.595c1.435,0,2.597-1.163,2.597-2.595v-3.458h3.454
          c1.433,0,2.596-1.164,2.596-2.597c0-1.432-1.163-2.596-2.596-2.596h-3.454V2.774c0-1.433-1.162-2.595-2.597-2.595
          c-1.433,0-2.597,1.162-2.597,2.595V6.18H2.596C1.161,6.18,0,7.344,0,8.776c0,1.433,1.161,2.597,2.596,2.597H6.004z"
                  />
                </g>
              </g>
            </svg>
          </button>
        )}
        <button
          onClick={() => handleInitiateConversations(user_id as string)}
          className="flex items-center p-3 bg-white border  shadow border-gray-300 text-blue-700 text-sm hover:bg-gray-100 rounded-full"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface IProfileCardProps {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  heading: string;
  skills: Skill[];
  comment_count?: number;
  like_count?: number;
  avatar?: string;
}

export const ProfileCard: React.FC<IProfileCardProps> = ({
  id,
  name,
  title,
  bio,
  heading,
  skills,
  comment_count,
  like_count,
  avatar,
}) => {
  return (
    <Link href={`/dashboard/profiles/${id}`}>
      <div className="flex w-full items-center justify-between relative">
        <div className="flex flex-col space-y-6 pt-2 w-full">
          <div className="flex-1 flex items-center space-x-2">
            <div className="border border-gray-300 p-1 rounded-full">
              <Image
                src={avatar || "/images/test-avatar-3.jpg"}
                width={75}
                height={75}
                alt="avatar"
                className="rounded-full"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-col space-y-1">
                <span className="font-app-medium text-sm">{name}</span>
                <span className="text-xs text-gray-700 font-normal">
                  {title}
                </span>
                <span className="text-xs text-custom-gray-paragraph">
                  {heading}
                </span>
              </div>
              <div className="w-3/4 leading-4 text-gray-700">
                <span className="text-sm leading-tight text-custom-gray-paragraph font-light">
                  {bio}{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {skills &&
              skills.map((skill, index) => (
                <div
                  key={skill.title}
                  className="capitalize text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded"
                >
                  {skill.title}
                </div>
              ))}
          </div>
          <div className="flex items-center w-full justify-end">
            <div className="text-xs text-gray-600 space-x-2">
              {!!comment_count && comment_count > 0 && (
                <span className="underline">
                  <span>{comment_count} Comments</span>
                </span>
              )}
              {!!like_count && like_count > 0 && (
                <span className="underline">
                  <span>{like_count} Likes</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <div className="flex items-center space-x-2">
            <button className="flex items-center p-3 shadow bg-white border border-gray-300 text-sm rounded-full hover:bg-gray-100 text-custom-gray-paragraph">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 45.902 45.902"
                className="w-4 h-4"
              >
                <g>
                  <g>
                    <path
                      d="M43.162,26.681c-1.564-1.578-3.631-2.539-5.825-2.742c1.894-1.704,3.089-4.164,3.089-6.912
          c0-5.141-4.166-9.307-9.308-9.307c-4.911,0-8.932,3.804-9.281,8.625c4.369,1.89,7.435,6.244,7.435,11.299
          c0,1.846-0.42,3.65-1.201,5.287c1.125,0.588,2.162,1.348,3.066,2.26c2.318,2.334,3.635,5.561,3.61,8.851l-0.002,0.067
          l-0.002,0.057l-0.082,1.557h11.149l0.092-12.33C45.921,30.878,44.936,28.466,43.162,26.681z"
                    />
                    <path
                      d="M23.184,34.558c1.893-1.703,3.092-4.164,3.092-6.912c0-5.142-4.168-9.309-9.309-9.309c-5.142,0-9.309,4.167-9.309,9.309
          c0,2.743,1.194,5.202,3.084,6.906c-4.84,0.375-8.663,4.383-8.698,9.318l-0.092,1.853h14.153h15.553l0.092-1.714
          c0.018-2.514-0.968-4.926-2.741-6.711C27.443,35.719,25.377,34.761,23.184,34.558z"
                    />
                    <path
                      d="M6.004,11.374v3.458c0,1.432,1.164,2.595,2.597,2.595c1.435,0,2.597-1.163,2.597-2.595v-3.458h3.454
          c1.433,0,2.596-1.164,2.596-2.597c0-1.432-1.163-2.596-2.596-2.596h-3.454V2.774c0-1.433-1.162-2.595-2.597-2.595
          c-1.433,0-2.597,1.162-2.597,2.595V6.18H2.596C1.161,6.18,0,7.344,0,8.776c0,1.433,1.161,2.597,2.596,2.597H6.004z"
                    />
                  </g>
                </g>
              </svg>
            </button>
            <button className="flex items-center p-3 bg-white border  shadow border-gray-300 text-custom-gray-paragraph text-sm hover:bg-gray-100 rounded-full">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface IProfileCardMainProps {
  profile: Profile;
}

export const ProfileCardMain: React.FC<IProfileCardMainProps> = ({
  profile,
}) => {
  const {
    first_name,
    last_name,
    avatar,
    bio,
    heading,
    title,
    location,
    phone,
    website,
    linkedin,
    github,
    resume,
    languages,
    skills,
    status,
    id,
    comments = [],
    reactions = [],
    events,
    projects,
    jobs,
    is_mentor,
    mentor_note,
    requires_update,
  } = profile;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");

  const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}${
    searchParams
      ? `${searchParams.toString() ? "?" : ""}${searchParams.toString()}`
      : ""
  }`;

  const handleAddComment = () => {
    if (newComment.trim()) {
      setNewComment("");
    }
  };

  return (
    <div className="relative space-y-4">
      <div className="flex flex-col space-y-6 border-b border-b-gray-200 py-4">
        <div className="flex items-center space-x-6">
          <div className="border border-gray-300 p-1 rounded-full">
            <Image
              src={avatar || "/images/test-avatar.jpg"}
              width={150}
              height={150}
              alt="avatar"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="text-2xl text-gray-900 flex items-center space-x-2 capitalize font-app-medium">
                  <span>
                    {first_name} {last_name}
                  </span>
                  {is_mentor && (
                    <span className="text-xs font-app-normal rounded text-gray-700 bg-green-200 py-1 px-1">
                      mentor
                    </span>
                  )}
                </span>
                {title && (
                  <span className="text-sm text-gray-700 font-normal">
                    {title}
                  </span>
                )}
              </div>
              {heading && (
                <div>
                  <span className="text-sm text-custom-gray-paragraph">
                    {heading}
                  </span>
                </div>
              )}
            </div>
            {status && (
              <div className="space-x-2 capitalize">
                <span className="text-xs font-medium rounded text-gray-700 bg-violet-200 py-1 px-1">
                  {status}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {!requires_update && (
        <div>
          <div className="space-y-3 border-b border-b-gray-200 py-4">
            <h3 className="text-sm font-bold">Details</h3>
            <div className="flex-1 grid grid-cols-3 gap-5">
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Location</h3>
                <div className="flex space-x-2 items-center">
                  {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
                  <span className="text-xs">{location}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Phone</h3>
                <div className="flex space-x-2 items-center">
                  {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
                  <span className="text-xs text-blue-800">{phone}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Linkedin</h3>
                <div className="flex space-x-2 items-center">
                  {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
                  <span className="text-xs text-blue-800">{linkedin}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Website</h3>
                <div className="flex space-x-2 items-center">
                  {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
                  <span className="text-xs text-blue-800">{website}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Github</h3>
                <div className="flex space-x-2 items-center">
                  {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
                  <span className="text-xs text-blue-800">{github}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Languages</h3>
                <div className="flex space-x-3">
                  {(languages as string[]).map((language: string) => (
                    <span
                      className="rounded-full inline-block bg-slate-50 p-1 shadow"
                      key={language}
                    >
                      {WithTooltip(
                        language,
                        <Image
                          src={`/icons/${
                            (mapLanguageToFlag as any)[language]
                          }.svg`}
                          alt=""
                          width={23}
                          height={23}
                          className="rounded-full"
                        />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <ShareComponent
                url={fullUrl}
                text="Collaborate with this professional on collabhub"
              />
            </div>
          </div>
          <div className="space-y-2 border-b border-b-gray-200 py-4">
            <h3 className="text-sm font-bold">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
          </div>
          {is_mentor && mentor_note && (
            <div className="space-y-2 border-b border-b-gray-200 py-4">
              <h3 className="text-sm font-bold">Mentor Note</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {mentor_note}
              </p>
            </div>
          )}
          {skills && (
            <div className="space-y-2 border-b border-b-gray-200 py-4">
              <h3 className="text-sm font-bold">Skills</h3>
              <div className="flex gap-2 flex-wrap">
                {skills.map((skill: { title: string }) => (
                  <div
                    key={skill.title}
                    className="capitalize text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded"
                  >
                    {skill.title}
                  </div>
                ))}
              </div>
            </div>
          )}
          {resume && (
            <div className="w-full border-b border-b-gray-200 py-4">
              <div className="space-y-2 w-2/3">
                <h3 className="text-sm font-bold">Resume</h3>
                <div className="space-y-2">
                  <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50">
                    <Link href={resume as string} download target="_blank">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Image
                            src="/icons/file.svg"
                            width={20}
                            height={20}
                            alt="file icon"
                          />
                          <span className="">
                            {getFilenameAndExtension(resume)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {WithTooltip(
                            "Download",
                            <Image
                              src="/icons/download.svg"
                              width={18}
                              height={18}
                              alt="file icon"
                            />
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {projects && (
            <div className="space-y-2 w-full relative border-b border-b-gray-200 py-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold">Projects</h3>
                <Link
                  href={"/projects"}
                  className="text-xs text-gray-600 flex items-center space-x-2"
                >
                  <span>View your projects</span>
                  <Image src="/icons/link.svg" width={15} height={15} alt="" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                {projects
                  ?.slice(0, 4)
                  .map(
                    ({
                      id,
                      title,
                      description,
                      website,
                      github_url,
                      created_at,
                      skills,
                      status,
                    }: Project) => {
                      return (
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
                      );
                    }
                  )}
              </div>
              {!(projects as Project[]).length && (
                <div
                  className="text-custom-gray-paragraph"
                  style={{ fontSize: "13.5px" }}
                >
                  Your projects will be displayed here.
                </div>
              )}
            </div>
          )}
          {events && (
            <div className="space-y-2 w-full relative border-b border-b-gray-200 py-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold">Events</h3>
                <Link
                  href={"/events"}
                  className="text-xs text-gray-600 flex items-center space-x-2"
                >
                  <span>View your events</span>
                  <Image src="/icons/link.svg" width={15} height={15} alt="" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                {events?.slice(0, 4).map((event: Event) => {
                  return (
                    <div className="border border-gray-300 rounded-lg px-3 py-6">
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
                  );
                })}
              </div>
              {!events.length && (
                <div
                  className="text-custom-gray-paragraph"
                  style={{ fontSize: "13.5px" }}
                >
                  Youre events will be displayed here.
                </div>
              )}
            </div>
          )}
          {jobs && (
            <div className="space-y-2 w-full relative border-b border-b-gray-200 py-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold">Jobs</h3>
                <Link
                  href={"/jobs"}
                  className="text-xs text-gray-600 flex items-center space-x-2"
                >
                  <span>View your jobs</span>
                  <Image src="/icons/link.svg" width={15} height={15} alt="" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-10">
                {jobs?.map(
                  ({
                    id,
                    title,
                    description,
                    website,
                    application_url,
                    created_at,
                    requirements,
                    status,
                  }) => (
                    <JobCard
                      key={id}
                      id={id}
                      title={title}
                      description={description}
                      website={website}
                      application_url={application_url as string}
                      created_at={created_at}
                      requirements={requirements}
                      status={status}
                    />
                  )
                )}
              </div>
              {!(jobs as Job[]).length && (
                <div
                  className="text-custom-gray-paragraph"
                  style={{ fontSize: "13.5px" }}
                >
                  Your jobs will be listed here.
                </div>
              )}
            </div>
          )}
          {!comments && (
            <div className="space-y-2 p-3 rounded-lg">
              <h3 className="text-sm font-medium underline">
                Comments ({(comments as any[]).length})
              </h3>
              <div className="space-y-3 border border-gray-300 rounded-lg p-1">
                {(comments as any[]).map((comment: any) => (
                  <div
                    key={comment.id}
                    className="px-3 py-2 rounded-lg flex items-center space-x-3 border-b border-gray-100  justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="border border-gray-300 p-1 rounded-full">
                        <Image
                          src="/images/test-avatar-3.jpg"
                          width={30}
                          height={30}
                          alt="avatar"
                          className="rounded-full"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-custom-gray-paragraph">
                          {comment.author}
                        </p>
                        <p className="text-gray-700 text-sm">{comment.text}</p>
                      </div>
                    </div>
                    <div className="text-xs">
                      {/* <Image src="/icons/bin.svg" width={18} height={18} alt="" /> */}
                      <span className="text-red-400 underline">Delete</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center space-x-3 px-3 pb-2 border-green-500">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 placeholder:text-sm placeholder:text-custom-gray-paragraph rounded-lg focus:border-0 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                  {/* <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Post
            </button> */}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {requires_update && <SkeletonLoader />}
    </div>
  );
};
