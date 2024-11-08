import Image from "next/image";
import Link from "next/link";

import { getFilenameAndExtension } from "@/lib/helpers";
import { formatDateLong } from "@/lib/helpers";
import { WithTooltip } from "./WithTooltip";
import { Project, Reaction } from "@/common/constants";
import { ViewsComponent } from "./ViewsComponent";
import { Comments } from "./Comments";
import TopIconBar from "./TopIconBar";
import ShareComponent from "./ShareComponent";

import "../../app/globals.css";
import AvatarComponent from "./AvatarComponent";

interface IProjectCardMainProps {
  currentUserProfileId: string;
  project: Partial<Project>;
  isOwner?: boolean;
  toggleModal?: () => void;
  toggleFeedbackModal?: () => void;
  toggleEditFeedbackModal?: (id: string) => void;
  handleDeleteFeedback?: (projectId: string, feedbackId: string) => void;
  triggerRefetch?: () => void;
}

export const ProjectCardMain: React.FC<IProjectCardMainProps> = ({
  currentUserProfileId,
  project,
  isOwner,
  toggleModal,
  toggleFeedbackModal,
  toggleEditFeedbackModal,
  triggerRefetch,
  handleDeleteFeedback,
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
    requires_feedback,
    feedbacks,
    feedback_guide,
  } = project;

  return (
    <>
      <TopIconBar>
        <ViewsComponent views={views as number} />
        {!isOwner && requires_feedback && toggleFeedbackModal && (
          <div onClick={toggleFeedbackModal}>
            {WithTooltip(
              "Add feedback",
              <Image src="/icons/feedback.svg" alt="" width={20} height={20} />
            )}
          </div>
        )}
        {isOwner &&
          WithTooltip(
            "Edit project",
            <div onClick={() => toggleModal && toggleModal()}>
              <Image src="/icons/edit.svg" alt="" width={20} height={20} />
            </div>
          )}
      </TopIconBar>
      <div className="relative space-y-4">
        <div className="flex flex-col space-y-6 border-b border-b-gray-200 pb-4">
          <div className="flex flex-col xs:flex-row items-center xs:space-x-6">
            {/* <div className="border border-gray-300 p-1 rounded-lg">
              <Image
                src="/icons/google.svg"
                width={70}
                height={70}
                alt=""
                className="rounded-lg"
              />
            </div> */}
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="font-app-medium text-2xl text-gray-900">
                  {title}
                </span>
              </div>
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
          </div>
        </div>
        <div className="space-y-3 border-b border-b-gray-200 pb-4">
          <h3 className="text-sm font-bold">Details</h3>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
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
                  <Link
                    href={website!}
                    className="text-xs text-blue-800 break-all"
                    target="_blank"
                  >
                    {website}
                  </Link>
                </div>
              </div>
            )}
            {github_url && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Repo URL</h3>
                <div className="flex space-x-2 items-center">
                  <Link
                    href={github_url!}
                    className="text-xs text-blue-800 break-all"
                    target="_blank"
                  >
                    {github_url}
                  </Link>
                </div>
              </div>
            )}
            {owner && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Contact</h3>
                <div className="flex space-x-2 items-center">
                  <Link
                    className="text-sm text-gray-400 font-bold"
                    href={`/dashboard/profiles/${owner.id}`}
                  >
                    {owner.first_name} {owner.last_name}
                  </Link>
                </div>
              </div>
            )}
            <ShareComponent text="Check out this awesome project on WeAlign" />
            <div className="space-y-1">
              <h3 className="text-sm text-gray-600 font-bold">Posted</h3>
              <div className="flex space-x-2 items-center">
                <span className="text-xs">
                  {formatDateLong(created_at as string)}
                </span>
              </div>
            </div>
            {location && (
              <div className="space-y-1">
                <h3 className="text-sm text-gray-600 font-bold">Location</h3>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs">{location}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        {description && (
          <div className="space-y-2 border-b border-b-gray-200 pb-4">
            <h3 className="text-sm font-bold">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        )}
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
        {collaborators && !!collaborators.length && (
          <div className="space-y-2 border-b border-b-gray-200 pb-4">
            <h3 className="text-sm font-bold">Collaborators</h3>
            <div className="flex flex-col gap-2 flex-wrap">
              {collaborators.map((c) => (
                <div key={c.id} className="flex items-center space-x-2">
                  <div className="border border-gray-200 p-1 rounded-full">
                    <Image
                      src={c.avatar || "/images/profile-placeholder.png"}
                      width={30}
                      height={30}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/dashboard/profiles/${c.id}`}
                      className="text-xs-sm"
                    >
                      {c.first_name + " " + c.last_name}
                    </Link>
                  </div>
                </div>
              ))}
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
        {(isOwner ||
          feedbacks?.some((f) => f.owner.id === currentUserProfileId)) &&
          feedbacks &&
          !!feedbacks.length && (
            <div className="space-y-2 border-b border-b-gray-200 pb-4 overflow-y-scroll overflow-x-auto hide-scroll max-h-72">
              <h3 className="text-sm font-bold">Feedback</h3>
              {requires_feedback && feedback_guide && (
                <div className="flex flex-col space-y-2">
                  <div className="text-xs-sm text-gray-700">
                    <span className="font-app-medium">Question or guide:</span>{" "}
                    {feedback_guide}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[...feedbacks]
                  .filter((f) => isOwner || f.owner.id === currentUserProfileId)
                  .map((f) => (
                    <div
                      key={f.id}
                      className="border border-gray-200 py-3 px-2 rounded flex flex-col items-end"
                    >
                      <div className="flex items-center space-x-1">
                        {f.owner.id === currentUserProfileId && (
                          <div>
                            {WithTooltip(
                              "Edit feedback",
                              <div
                                onClick={() => {
                                  alert("clicked");

                                  toggleEditFeedbackModal &&
                                    toggleEditFeedbackModal(f.id);
                                }}
                              >
                                <Image
                                  src="/icons/edit.svg"
                                  alt=""
                                  width={13}
                                  height={13}
                                />
                              </div>
                            )}
                          </div>
                        )}
                        <div
                          onClick={() =>
                            handleDeleteFeedback &&
                            handleDeleteFeedback(id!, f.id)
                          }
                          className="cursor-pointer"
                        >
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path d="m0 0h32v32h-32z" />
                              <path
                                d="m19 0c3.3137085 0 6 2.6862915 6 6h6c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1l-3-.001v18.001c0 3.3137085-2.6862915 6-6 6h-12c-3.3137085 0-6-2.6862915-6-6v-18h-3c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h6c0-3.3137085 2.6862915-6 6-6zm7 8h-20v18c0 2.1421954 1.68396847 3.8910789 3.80035966 3.9951047l.19964034.0048953h12c2.1421954 0 3.8910789-1.6839685 3.9951047-3.8003597l.0048953-.1996403zm-13 6c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm6 0c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm0-12h-6c-2.1421954 0-3.89107888 1.68396847-3.99510469 3.80035966l-.00489531.19964034h7 7c0-2.14219539-1.6839685-3.89107888-3.8003597-3.99510469z"
                                fill="#ef4444"
                                fillRule="nonzero"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="w-full flex items-start space-x-2">
                        <AvatarComponent
                          avatar={f.owner.avatar}
                          className="w-7 h-7"
                        />
                        <div className="flex-1 flex flex-col">
                          <Link
                            href={`/dashboard/profiles/${f.owner.id}`}
                            className="text-xs-sm"
                          >
                            {f.owner.first_name + " " + f.owner.last_name}
                          </Link>
                          <span className="text-xs text-gray-500 mt-0.5">
                            {f.owner.title}
                          </span>
                          <span className="text-xs-sm text-gray-700 mt-2">
                            {f.text}
                          </span>
                        </div>
                      </div>
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
          reactions={reactions as Reaction[]}
          triggerRefetch={triggerRefetch}
        />
      </div>
    </>
  );
};
