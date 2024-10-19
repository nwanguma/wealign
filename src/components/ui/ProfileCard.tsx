import Image from "next/image";
import Link from "next/link";

import { Profile } from "@/common/constants";
import { useFollow } from "@/app/hooks/useFollow";
import MoreActionsComponent from "./MoreActions";

interface IProfileCardProps {
  profile: Partial<Profile>;
  currentUserProfileId: string;
  hasFollowed?: boolean;
}

export const ProfileCard: React.FC<IProfileCardProps> = ({
  profile,
  currentUserProfileId,
  hasFollowed,
}) => {
  const {
    handleInitiateConversations,
    handleFollow,
    justFollowed,
    handleUnfollow,
  } = useFollow();
  const {
    id,
    first_name,
    last_name,
    title,
    bio,
    heading,
    skills,
    avatar,
    user_id,
    comments,
    reactions,
  } = profile;
  const isCurrentUser = currentUserProfileId === id;

  return (
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
              <Link
                href={`/dashboard/profiles/${id}`}
                className="font-app-medium text-sm"
              >
                {first_name + " " + last_name}
              </Link>
              <span className="text-xs text-gray-700 font-normal">{title}</span>
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
            {!!comments && comments.length > 0 && (
              <span className="underline">
                <span>{comments.length} Comments</span>
              </span>
            )}
            {!!reactions && reactions.length > 0 && (
              <span className="underline">
                <span>{reactions.length} Likes</span>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-0">
        <div className="flex items-center space-x-2">
          {!hasFollowed && !justFollowed[id as string] && !isCurrentUser && (
            <button
              onClick={() => handleFollow(id as string)}
              className="flex items-center p-2 bg-white border border-gray-300 text-sm rounded-full hover:bg-gray-100 text-blue-700"
            >
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
          )}
          {!isCurrentUser && (
            <button
              onClick={() => handleInitiateConversations(user_id as string)}
              className="flex items-center p-2 bg-white border border-gray-300 text-blue-700 text-sm hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="#FFFFFF"
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
          )}
          {!isCurrentUser && (justFollowed[id as string] || hasFollowed) && (
            <MoreActionsComponent
              renderWithAction={(toggleMoreActionsModal: any) => (
                <li
                  onClick={() => {
                    handleUnfollow(id as string);
                    toggleMoreActionsModal();
                  }}
                  className="text-xs text-gray-700 text-center px-3 py-2 cursor-pointer"
                >
                  Unfollow
                </li>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};
