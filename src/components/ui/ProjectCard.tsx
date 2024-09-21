import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { timeAgo } from "@/lib/helpers";
import { Skill, Profile } from "@/common/constants";
import { formatDateLong } from "@/lib/helpers";

interface IProjectCardProps {
  id: string;
  title: string;
  description: string;
  website?: string;
  github_url?: string | null;
  created_at: string;
  skills?: Skill[];
  comment_count?: number;
  like_count?: number;
  status?: string;
  collaborators?: Profile[];
}

export const ProjectCard: React.FC<IProjectCardProps> = ({
  id,
  title,
  description,
  website,
  comment_count,
  like_count,
  github_url,
  created_at,
  skills,
  status,
  collaborators,
}) => {
  return (
    <Link href={`/dashboard/projects/${id}`} className="block">
      <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
        <div className="flex items-center space-x-3">
          <div className="border border-gray-300 p-2 rounded-lg">
            <Image src="/icons/google.svg" width={40} height={40} alt="logo" />
          </div>
          <div className="flex flex-col space-y-2">
            <div>
              <span className="font-medium">{title}</span>
              {status && (
                <div className="space-y-2">
                  <span className="capitalize text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
                    {status}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <span className="flex items-center space-x-2">
                <Image src="/icons/link-2.svg" alt="" width={15} height={15} />
                <Link
                  href={website as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-800"
                >
                  {website}
                </Link>
              </span>
              {github_url && (
                <span className="flex items-center space-x-2">
                  {/* Todo: Icon with text */}
                  <Image src="/icons/git.svg" alt="" width={15} height={15} />
                  <Link
                    href={github_url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-800"
                  >
                    {github_url}
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>{" "}
        <p className="text-sm leading-snug text-gray-700">{description}</p>
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
        <div className="flex justify-between text-xs text-gray-600 ">
          <div className="flex items-center space-x-3">
            {comment_count && (
              <span className="underline">
                <span>{comment_count} Comments</span>
              </span>
            )}
            {like_count && (
              <span className="underline spac">
                <span>{like_count} Likes</span>
              </span>
            )}
          </div>
          <span>{timeAgo(created_at)}</span>
        </div>
      </div>
    </Link>
  );
};

interface IProjectCardMainProps {
  id: string;
  title: string;
  description: string;
  website?: string;
  likes: any[] | undefined;
  comments: any[] | undefined;
  like_count?: number | undefined;
  comment_count?: number | undefined;
  collaborators?: Profile[];
  skills?: Skill[];
  created_at: string;
  owner: Profile | undefined;
  github_url?: string | null;
  start_date?: string;
  status?: string;
}

export const ProjectCardMain: React.FC<IProjectCardMainProps> = ({
  id,
  title,
  description,
  website,
  likes,
  comments,
  comment_count,
  like_count,
  collaborators,
  github_url,
  skills,
  created_at,
  start_date,
  status,
  owner,
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");

  return (
    <div className="relative space-y-4">
      <div className="flex flex-col space-y-6 border-b border-b-gray-200 pb-4">
        <div className="flex items-center space-x-6">
          <div className="border border-gray-300 p-1 rounded-lg">
            <Image
              src="/icons/google.svg"
              width={100}
              height={100}
              alt="avatar"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-2xl text-gray-900">{title}</span>
            </div>
            {status && (
              <div className="space-y-2">
                <span className="capitalize text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
                  {status}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b border-b-gray-200 pb-4">
        <h3 className="text-sm font-bold">Details</h3>
        <div className="flex-1 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Start Date</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-xs">
                {formatDateLong(start_date as string)}
              </span>
            </div>
          </div>
          {website && (
            <div className="space-y-1">
              <h3 className="text-sm text-gray-600 font-bold">Website</h3>
              <div className="flex space-x-2 items-center">
                <span className="text-xs text-blue-800">{website}</span>
              </div>
            </div>
          )}
          {github_url && (
            <div className="space-y-1">
              <h3 className="text-sm text-gray-600 font-bold">Repo URL</h3>
              <div className="flex space-x-2 items-center">
                <span className="text-xs text-blue-800">{github_url}</span>
              </div>
            </div>
          )}
          {owner && (
            <div className="space-y-1">
              <h3 className="text-sm text-gray-600 font-bold">Contact</h3>
              <div className="flex space-x-2 items-center">
                <span className="text-sm text-gray-400 font-bold">
                  {owner.first_name} {owner.last_name}
                </span>
              </div>
            </div>
          )}
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Share</h3>
            <div className="flex space-x-3">
              {["linkedin", "google", "facebook", "twitter"].map((platform) => (
                <Image
                  src={`/icons/${platform}-share.svg`}
                  alt=""
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Posted</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-xs">{formatDateLong(created_at)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 border-b border-b-gray-200 pb-4">
        <h3 className="text-sm font-bold">Description</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
      {skills && !!skills.length && (
        <div className="space-y-2 border-b border-b-gray-200 pb-4">
          <h3 className="text-sm font-bold">Skills</h3>
          <div className="flex gap-2 flex-wrap">
            {skills.map((skill, index) => (
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

      <div className="space-y-2 p-3 rounded-lg">
        {comments && !!comments.length && (
          <h3 className="text-sm font-medium underline">
            Comments ({comments.length})
          </h3>
        )}
        <div className="space-y-3 border border-gray-300 rounded-lg p-1">
          {comments &&
            !!comments.length &&
            comments.map((comment) => (
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
                    <p className="text-xs text-gray-500">{comment.author}</p>
                    <p className="text-gray-700 text-sm">{comment.text}</p>
                  </div>
                </div>
                <div className="text-xs">
                  {/* <Image src="/icons/bin.svg" width={18} height={18} alt="" /> */}
                  <span className="text-red-400 underline">Delete</span>
                </div>
              </div>
            ))}
          <div className="flex items-center pt-2 space-x-3 px-3 pb-2 border-green-500">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 placeholder:text-sm placeholder:text-gray-500 rounded-lg focus:border-0 focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
            <button
              onClick={() => console.log("clicked")}
              className="bg-blue-600 text-white px-4 text-sm py-2 rounded-md hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
