import { useState } from "react";
import Image from "next/image";

import { formatDateLong } from "@/lib/helpers";
import { Job } from "@/common/constants";

interface IJobCardMainProps {
  job: Partial<Job>;
}

export const JobCardMain: React.FC<IJobCardMainProps> = ({ job }) => {
  const {
    id,
    title,
    description,
    website,
    likes,
    comments,
    // reactions,
    application_url,
    skills,
    created_at,
    deadline,
    status,
    owner,
  } = job;
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
              <span className="font-app-medium text-2xl text-gray-900">
                {title}
              </span>
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
            <h3 className="text-sm text-gray-600 font-bold">Deadline</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-xs">
                {formatDateLong(deadline as string)}
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
          {application_url && (
            <div className="space-y-1">
              <h3 className="text-sm text-gray-600 font-bold">Apply Here</h3>
              <div className="flex space-x-2 items-center">
                <span className="text-xs text-blue-800">{application_url}</span>
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
              <span className="text-xs">
                {formatDateLong(created_at as string)}
              </span>
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
          <div className="flex items-center pt-2 space-x-3 px-3 pb-2 border-green-500">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 placeholder:text-sm placeholder:text-custom-gray-paragraph rounded-lg focus:border-0 focus:outline-none focus:ring-1 focus:ring-blue-700"
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
