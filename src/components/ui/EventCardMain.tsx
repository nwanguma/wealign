import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { formatDateLong, getFilenameAndExtension } from "@/lib/helpers";
import { WithTooltip } from "./WithTooltip";
import { Event } from "@/common/constants";

interface IEventCardMainProps {
  event: Event;
}

export const EventCardMain: React.FC<IEventCardMainProps> = ({ event }) => {
  const {
    banner,
    title,
    location,
    description,
    website,
    event_start_date,
    event_end_date,
    owner,
    attachment,
    ticket_link,
    link: meeting_link,
  } = event;

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
            src={banner || "/images/test-event-5.png"}
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
              <span className="text-xs text-blue-800">{website}</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Ticket Link</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-blue-800">{ticket_link}</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Contact</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-sm text-gray-400 font-bold">
                {owner?.first_name} {owner?.last_name}
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
      <div className="space-y-2 py-2 border-b border-gray-200">
        <span className="text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
          {new Date(event_start_date) > new Date()
            ? "Not started"
            : new Date(event_end_date) < new Date()
            ? "Event Ended"
            : "In progress"}
        </span>
        <p className="text-gray-800 text-xl font-app-medium leading-relaxed">
          {title}
        </p>
        {meeting_link && (
          <p className="text-xs text-blue-800">{meeting_link}</p>
        )}
        {location && <p className="text-sm text-gray-600">{location}</p>}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Description</h3>
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
