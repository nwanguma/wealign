import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Article, mapLanguageToFlag, Skill } from "@/common/constants";
import { getFilenameAndExtension } from "@/lib/helpers";
import { Profile, Event, Project, Job } from "@/common/constants";

import { EventCardPreview } from "./EventCard";
import { ProjectCard } from "./ProjectCard";
import { JobCard } from "./JobCard";
import { WithTooltip } from "./WithTooltip";
import { SkeletonLoader } from "./SkeletonLoader";
import ShareComponent from "./ShareComponent";
import { ArticleCardPreview } from "./ArticleCard";

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
    articles,
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
                  href={"/dashboard/me/projects"}
                  className="text-xs text-gray-600 flex items-center space-x-2"
                >
                  <span>View projects</span>
                  <Image src="/icons/link.svg" width={15} height={15} alt="" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-5">
                {[...projects]?.splice(0, 2).map((project) => {
                  return <ProjectCard key={project.id} project={project} />;
                })}
              </div>
              {!(projects as Project[]).length && (
                <div
                  className="text-custom-gray-paragraph"
                  style={{ fontSize: "13.5px" }}
                >
                  Projects will be displayed here.
                </div>
              )}
            </div>
          )}
          {events && (
            <div className="space-y-2 w-full relative border-b border-b-gray-200 py-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold">Events</h3>
                <Link
                  href={"/dashboard/me/events"}
                  className="text-xs text-gray-600 flex items-center space-x-2"
                >
                  <span> events</span>
                  <Image src="/icons/link.svg" width={15} height={15} alt="" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-5">
                {[...events]?.splice(0, 2).map((event: Event) => {
                  return (
                    <div className="border border-gray-300 rounded-lg px-3 py-6">
                      <EventCardPreview event={event} isPreview />
                    </div>
                  );
                })}
              </div>
              {!events.length && (
                <div
                  className="text-custom-gray-paragraph"
                  style={{ fontSize: "13.5px" }}
                >
                  Events will be displayed here.
                </div>
              )}
            </div>
          )}
          {articles && (
            <div className="space-y-2 w-full relative border-b border-b-gray-200 py-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold">Articles</h3>
                <Link
                  href={"/dashboard/me/articles"}
                  className="text-xs text-gray-600 flex items-center space-x-2"
                >
                  <span>View articles</span>
                  <Image src="/icons/link.svg" width={15} height={15} alt="" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-5">
                {[...articles].splice(0, 2).map((article: Article) => (
                  <div
                    key={article.id}
                    className="border border-gray-300 rounded-lg px-3 py-6"
                  >
                    <ArticleCardPreview article={article} />
                  </div>
                ))}
              </div>
              {(articles as Article[])?.length === 0 && (
                <div
                  className="text-custom-gray-paragraph"
                  style={{ fontSize: "13.5px" }}
                >
                  Articles will be listed here.
                </div>
              )}
            </div>
          )}
          {jobs && (
            <div className="space-y-2 w-full relative border-b border-b-gray-200 py-4">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold">Jobs</h3>
                <Link
                  href={"/dashboard/me/jobs"}
                  className="text-xs text-gray-600 flex items-center space-x-2"
                >
                  <span>View jobs</span>
                  <Image src="/icons/link.svg" width={15} height={15} alt="" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-5">
                {[...jobs]?.splice(0, 2).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              {!(jobs as Job[]).length && (
                <div
                  className="text-custom-gray-paragraph"
                  style={{ fontSize: "13.5px" }}
                >
                  Jobs will be listed here.
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
