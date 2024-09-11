"use client";

import AppModal from "@/components/ui/Modal";
import Image from "next/image";

import { useState } from "react";

import CustomForm from "@/components/forms/CustomForm";
import DashboardPageHeader, {
  DashboardPageSecondaryHeader,
} from "@/components/ui/DashboardPageHeader";
import DashboardProfileCard from "@/components/ui/DashboardProfileCard";
import DashboardEventCard from "@/components/ui/DashboardEventCard";
import DashboardProjectCard from "@/components/ui/DashboardProjectCard";

import AddEventForm from "@/components/forms/CreateEventForm";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import AccountSettings from "@/components/forms/AccountsSettings";

import { EventCard } from "../../page";

import events from "../../../constants/events.json";

interface IEventCardProps {
  id: string;
  date: string;
  title: string;
  banner: number;
  location: string;
  description?: string;
  website?: string;
  like_count?: string;
  comment_count?: string;
  event_start_date: string;
  isPreview?: boolean;
}

export const EventCardMain: React.FC<IEventCardProps> = ({
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
  isPreview,
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
              {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
              <span className="text-xs">Thursday, 7th March, 2024 8:00PM</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Ends</h3>
            <div className="flex space-x-2 items-center">
              {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
              <span className="text-xs">Thursday, 7th March, 2024 8:00PM</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Website</h3>
            <div className="flex space-x-2 items-center">
              {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
              <span className="text-xs text-blue-800">
                https://event.google.com
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Ticket Link</h3>
            <div className="flex space-x-2 items-center">
              {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
              <span className="text-xs text-blue-800">
                https://event.google.com
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Contact</h3>
            <div className="flex space-x-2 items-center">
              {/* <Image src="/icons/calendar.svg" alt="" width={20} height={20} /> */}
              <span className="text-sm text-gray-400 font-bold">
                Jidenna Offor
              </span>
            </div>
          </div>
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
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
          Not started
        </span>
        <p className="text-gray-600 text-xl font-bold leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Description</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
          ex, dolore nesciunt neque architecto velit minus ipsam quisquam, modi
          eius vel totam maxime natus eveniet officia. Beatae sed nam vel? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Et quod eaque
          eveniet reiciendis culpa nulla, rerum necessitatibus facere architecto
          consectetur quo veritatis ipsam qui vel vitae iusto corrupti cum nam.
          <br></br>
          <br></br>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
          ex, dolore nesciunt neque architecto velit minus ipsam quisquam, modi
          eius vel totam maxime natus eveniet officia.
        </p>
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
                    <p className="text-xs text-gray-500 font-normal">
                      {comment.author}
                    </p>
                    <span
                      className="inline-block w-0.5 h-0.5 rounded-full bg-gray-900"
                      style={{ width: "3px", height: "3px" }}
                    ></span>
                    <span
                      className="text-xs text-gray-500"
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
              className="flex-1 px-4 py-2 border border-gray-300 placeholder:text-sm placeholder:text-gray-500 rounded-lg focus:border-0 focus:outline-none focus:ring-1 focus:ring-blue-700"
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

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex space-x-5 p-6">
        <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg">
          <div className="w-full">
            <EventCardMain
              id={String(1)}
              banner={1}
              date="4, April, 2027"
              title="A futuristic event"
              location="London, England"
              event_start_date="4th July, 2023"
              description="An annual conference showcasing the latest in technology and innovation. An annual conference showcasing..."
              like_count="47"
              comment_count="46"
            />
          </div>
        </div>
        <aside className="w-1/3 space-y-5">
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-semibold mb-3 text-gray-700">
              Upcoming events
            </h3>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div className="border-b border-b-gray-300 py-3">
                  <EventCard
                    id={event.id}
                    banner={++index}
                    date="4, April, 2027"
                    title="A futuristic event"
                    location="London, England"
                    event_start_date="4th July, 2023"
                    isPreview
                  />
                </div>
              ))}
              <div className="space-x-4">
                <div className="flex items-center space-x-5">
                  <div className="max-w-20">
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-xs text-gray-500">Mon</span>
                      <span className="text-lg font-bold text-gray-900">4</span>
                      <span className="text-xs text-gray-500">April</span>
                    </div>
                  </div>
                  <div className="w-1/3 h-20 relative rounded-lg">
                    <Image
                      src="/images/test-event-3.jpg"
                      alt="avatar"
                      className="rounded-lg"
                      layout="fill"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">A futuristic tech event</span>
                    <span className="text-xs text-gray-500">
                      London, England
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      {/* <AppModal
        title="This is the title"
        isOpen={true}
        onClose={() => console.log("closed")}
      > */}
      {/* <AddEventForm /> */}

      {/* <CreateProjectForm /> */}

      {/* <UpdateProfileForm /> */}
      {/* <AccountSettings /> */}
      {/* </AppModal> */}
      {/* <CustomForm /> */}
    </div>
  );
}
