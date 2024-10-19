import Image from "next/image";
import Link from "next/link";

import { getFilenameAndExtension } from "@/lib/helpers";
import { formatDateLong } from "@/lib/helpers";
import { WithTooltip } from "./WithTooltip";
import { Project } from "@/common/constants";
import { ViewsComponent } from "./ViewsComponent";
import { Comments } from "./Comments";

interface IProjectCardMainProps {
  project: Partial<Project>;
  isOwner?: boolean;
  toggleModal?: () => void;
  triggerRefetch?: () => void;
}

export const ProjectCardMain: React.FC<IProjectCardMainProps> = ({
  project,
  isOwner,
  toggleModal,
  triggerRefetch,
}) => {
  const {
    id,
    title,
    description,
    website,
    reactions,
    comments,
    collaborators,
    github_url,
    skills,
    location,
    created_at,
    attachment,
    start_date,
    status,
    owner,
    views,
  } = project;

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
          {start_date && (
            <div className="space-y-1">
              <h3 className="text-sm text-gray-600 font-bold">Start Date</h3>
              <div className="flex space-x-2 items-center">
                <span className="text-xs">
                  {formatDateLong(start_date as string)}
                </span>
              </div>
            </div>
          )}
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
              <span className="text-xs">
                {formatDateLong(created_at as string)}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Location</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-xs">{location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 border-b border-b-gray-200 pb-4">
        <h3 className="text-sm font-bold">Description</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
      {attachment && (
        <div className="w-full border-b border-b-gray-200 py-4">
          <div className="space-y-2 w-2/3">
            <h3 className="text-sm font-bold">Attachment</h3>
            <div className="space-y-2">
              <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50">
                <Link href={attachment as string} download target="_blank">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/icons/file.svg"
                        width={20}
                        height={20}
                        alt="file icon"
                      />
                      <span className="">
                        {getFilenameAndExtension(attachment)}
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
        resource="projects"
        isOwner={isOwner!}
        resourceId={id!}
        comments={comments!}
        reactions={reactions}
        triggerRefetch={triggerRefetch}
      />
    </div>
  );
};
