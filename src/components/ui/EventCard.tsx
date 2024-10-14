import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { truncateString, formatDateShort, formatDateLong } from "@/lib/helpers";
import { FormatDateOptionsEnum } from "@/lib/helpers/constants";

interface IEventCardPreviewProps {
  id: string;
  title: string;
  banner: string;
  location: string;
  description?: string;
  website?: string;
  like_count?: number;
  comment_count?: number;
  event_start_date: string;
  isPreview?: boolean;
  description_limit?: number;
}

export const EventCardPreview: React.FC<IEventCardPreviewProps> = ({
  id,
  banner,
  title,
  location,
  description,
  like_count,
  comment_count,
  event_start_date,
  description_limit = 140,
  isPreview,
}) => {
  const { dayOfWeek, day, month } = formatDateShort(event_start_date, {
    monthType: FormatDateOptionsEnum.SHORT,
    weekdayType: FormatDateOptionsEnum.SHORT,
  });

  return (
    <div className="space-x-4 h-full relative">
      {/* Need to save all routes in a file & export */}
      <Link href={`/dashboard/events/${id}`}>
        <div className="h-full flex items-center space-x-5">
          <div className="max-w-20">
            <div className="flex flex-col justify-center items-center">
              <span className="text-xs text-custom-gray-paragraph">
                {dayOfWeek}
              </span>
              <span className="text-lg font-app-medium text-custom-gray-heading">
                {day}
              </span>
              <span className="text-xs text-custom-gray-paragraph">
                {month}
              </span>
            </div>
          </div>
          <div className="w-1/3 h-full min-h-20 relative rounded-lg">
            <Image
              src={banner || `/images/test-event-2.jpg`}
              alt="avatar"
              className="rounded-lg"
              layout="fill"
            />
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <div className="flex flex-col space-y-2 py-2">
              <div className="flex flex-col">
                <span className="font-app-medium">
                  {truncateString(title, 25)}
                </span>
                <span className="text-xs text-custom-gray-paragraph">
                  {location}
                </span>
              </div>
              {/** Truncate string past a certain character limit */}
              {!isPreview && (
                <span className="text-sm text-custom-gray-paragraph font-light leading-snug">
                  {truncateString(description as string, description_limit)}
                </span>
              )}
            </div>
            {!isPreview && (
              <div className="absolute bottom-0 right-0 flex items-center space-x-3 text-xs text-gray-600">
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
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

interface IEventCardMainProps {
  id: string;
  date: string;
  title: string;
  banner: string;
  location: string;
  description?: string;
  website?: string;
  like_count?: number;
  comment_count?: number;
  event_start_date: string;
  event_end_date: string;
  isPreview?: boolean;
  //Correct type
  owner?: any;
}

export const EventCardMain: React.FC<IEventCardMainProps> = ({
  id,
  date,
  banner,
  title,
  location,
  description,
  website,
  like_count,
  comment_count,
  event_start_date,
  event_end_date,
  isPreview,
  owner,
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, author: "John Doe", text: "This event looks amazing!" },
    { id: 2, author: "Jane Smith", text: "Can't wait to attend!" },
    { id: 3, author: "Emily Rose", text: "What a fantastic initiative!" },
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, author: "You", text: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="relative space-y-5">
      <div className="flex items-center space-x-5">
        <div className="relative w-2/3 h-80">
          <Image
            src={`/images/test-event-5.png`}
            alt="event banner"
            className="rounded-lg"
            layout="fill"
          />
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Starts</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-xs">
                {formatDateLong(event_start_date)}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Ends</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-xs">{formatDateLong(event_end_date)}</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Website</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-blue-800">
                https://event.google.com
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Ticket Link</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-blue-800">{website}</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Contact</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-sm text-gray-400 font-bold">
                {owner.first_name} {owner.last_name}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Share</h3>
            <div className="flex space-x-3">
              {["linkedin", "google", "facebook", "twitter"].map((platform) => (
                <Image
                  key={platform}
                  src={`/icons/${platform}-share.svg`}
                  alt=""
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
          {new Date(event_start_date) > new Date()
            ? "Not started"
            : new Date(event_end_date) < new Date()
            ? "Event Ended"
            : "In progress"}
        </span>
        <p className="text-gray-600 text-xl font-bold leading-relaxed">
          {title}
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Description</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="space-y-2 w-2/3">
        <h3 className="text-sm font-semibold">Attachments</h3>
        <div className="space-y-2">
          <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/file.svg"
                  width={20}
                  height={20}
                  alt="file icon"
                />
                <span>filename.docx</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/download.svg"
                  width={18}
                  height={18}
                  alt="file icon"
                />
                {/* <span>Download</span> */}
              </div>
            </div>
          </div>{" "}
          <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/file.svg"
                  width={20}
                  height={20}
                  alt="file icon"
                />
                <span>filename.docx</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/download.svg"
                  width={18}
                  height={18}
                  alt="file icon"
                />
                {/* <span>Download</span> */}
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      {/* Comments Section */}
      <div className="space-y-2 p-3 rounded-lg">
        <h3 className="text-sm font-semibold underline">
          Comments ({comments.length})
        </h3>
        <div className="space-y-3 border border-gray-300 rounded-lg p-1">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="px-3 py-2 rounded-lg flex items-center space-x-3 border-b border-gray-100  justify-between"
            >
              <div className="flex items-center space-x-2">
                <div className="border border-gray-300 p-1 rounded-full">
                  <Image
                    src="/images/test-avatar-3.jpg"
                    width={35}
                    height={35}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-custom-gray-paragraph font-normal">
                      {comment.author}
                    </p>
                    <span
                      className="inline-block w-0.5 h-0.5 rounded-full bg-gray-900"
                      style={{ width: "3px", height: "3px" }}
                    ></span>
                    <span
                      className="text-xs text-custom-gray-paragraph"
                      style={{ fontSize: "11px" }}
                    >
                      30th Jul 2024
                    </span>
                  </div>
                  <p
                    className="text-gray-800 text-xs"
                    style={{ fontSize: "13px" }}
                  >
                    {comment.text}
                  </p>
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
    </div>
  );
};
