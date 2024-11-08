import Image from "next/image";
import Link from "next/link";

import { timeAgo } from "@/lib/helpers";
import { Project } from "@/common/constants";
import CommentsReactionsUI from "./CommentsReactionsUI";

interface IProjectCardProps {
  project: Partial<Project>;
}

export const ProjectCard: React.FC<IProjectCardProps> = ({ project }) => {
  const {
    id,
    title,
    description,
    website,
    comments,
    reactions,
    github_url,
    created_at,
    skills,
    status,
    collaborators,
    requires_feedback,
  } = project;
  return (
    <div className="block h-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col justify-center xs:justify-normal text-center xs:text-left xs:flex-row items-center xs:items-start space-x-3">
          {/* <div className="border border-gray-300 p-2 rounded-lg">
            <Image src="/icons/google.svg" width={40} height={40} alt="logo" />
          </div> */}
          <div className="flex flex-col space-y-2">
            <div>
              <Link
                href={`/dashboard/projects/${id}`}
                className="font-app-medium"
              >
                {title}
              </Link>
              {!requires_feedback && status && (
                <div className="space-y-2">
                  <span className="capitalize text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
                    {status}
                  </span>
                </div>
              )}
              {requires_feedback && (
                <div className="space-y-2">
                  <span className="capitalize text-xs font-medium rounded text-gray-700 py-1 px-1">
                    Requires feedback
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              {website && (
                <span className="flex items-center space-x-2">
                  <Image
                    src="/icons/link-2.svg"
                    alt=""
                    width={15}
                    height={15}
                  />
                  <Link
                    href={website as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-800 break-all"
                  >
                    {website}
                  </Link>
                </span>
              )}
              {github_url && (
                <span className="flex items-center space-x-2">
                  {/* Todo: Icon with text */}
                  <Image src="/icons/git.svg" alt="" width={15} height={15} />
                  <Link
                    href={github_url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-800 break-all"
                  >
                    {github_url}
                  </Link>
                </span>
              )}
              {collaborators!?.length > 0 && (
                <span className="flex items-center space-x-2">
                  {/* Todo: Icon with text */}
                  <Image
                    src="/icons/person.svg"
                    alt=""
                    width={15}
                    height={15}
                  />
                  <span className="text-xs break-all">
                    {collaborators?.length}{" "}
                    {collaborators?.length == 1
                      ? "collaborator"
                      : "collaborators"}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>{" "}
        {description && (
          <p className="text-sm leading-snug text-gray-700">{description}</p>
        )}
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
        <div
          className={`flex ${
            comments!?.length > 0 || reactions!?.length > 0
              ? "justify-between"
              : "justify-end"
          } text-xs text-gray-600`}
        >
          <CommentsReactionsUI comments={comments!} reactions={reactions!} />
          <span>{timeAgo(created_at as string)}</span>
        </div>
      </div>
    </div>
  );
};
