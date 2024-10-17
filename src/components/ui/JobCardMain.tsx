import { useState } from "react";
import Image from "next/image";

import { formatDateLong } from "@/lib/helpers";
import { Job } from "@/common/constants";
import { ViewsComponent } from "./ViewsComponent";
import { WithTooltip } from "./WithTooltip";
import { Comments } from "./Comments";
interface IJobCardMainProps {
  job: Partial<Job>;
  isOwner?: boolean;
  toggleModal?: () => void;
  triggerRefetch?: () => void;
}

export const JobCardMain: React.FC<IJobCardMainProps> = ({
  job,
  isOwner,
  toggleModal,
  triggerRefetch,
}) => {
  const {
    id,
    title,
    description,
    website,
    comments,
    reactions,
    application_url,
    skills,
    created_at,
    deadline,
    status,
    owner,
    views,
  } = job;
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");

  return (
    <div className="relative space-y-4">
      <div className="absolute top-0 right-4">
        <div className="flex space-x-3">
          <ViewsComponent views={views as number} />
          {isOwner &&
            WithTooltip(
              "Edit event",
              <div onClick={() => toggleModal && toggleModal()}>
                <Image src="/icons/edit.svg" alt="" width={20} height={20} />
              </div>
            )}
        </div>
      </div>
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
      <Comments
        resource="jobs"
        resourceId={id}
        comments={comments}
        reactions={reactions}
        triggerRefetch={triggerRefetch}
      />
    </div>
  );
};
