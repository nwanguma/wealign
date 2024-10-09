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

import events from "../constants/events.json";
import { ProfilePreviewCard } from "@/components/ui/ProfileCard";

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
    <div className="relative space-y-4">
      <div className="flex flex-col space-y-6 border-b border-b-gray-200 pb-4">
        <div className="flex items-center space-x-6">
          <div className="border border-gray-300 p-1 rounded-full">
            <Image
              src="/images/test-avatar-3.jpg"
              width={150}
              height={150}
              alt="avatar"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-2xl text-gray-900">
                Kayode Otitoju
              </span>
              <span className="text-sm text-custom-gray-paragraph">
                Product Manager
              </span>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium rounded text-gray-700 bg-green-200 py-1 px-1">
                Looking for work
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b border-b-gray-200 pb-4">
        <h3 className="text-sm font-bold">Details</h3>
        <div className="flex-1 grid grid-cols-3 gap-4">
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
      <div className="space-y-2 border-b border-b-gray-200 pb-4">
        <h3 className="text-sm font-bold">About</h3>
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
      <div className="space-y-2 border-b border-b-gray-200 pb-4">
        <h3 className="text-sm font-bold">Skills</h3>
        <div className="flex gap-2 flex-wrap">
          {[
            "Figma",
            "Blender",
            "Homebrew",
            "Yahoo",
            "Honest",
            "Independent",
          ].map((skill, index) => (
            <div
              key={skill + index}
              className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-b border-b-gray-200 pb-4">
        <div className="space-y-2 w-2/3">
          <h3 className="text-sm font-bold">Attachments</h3>
          <div className="space-y-2">
            <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-100">
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
            <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-100">
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
            <div className="border border-gray-300 p-3 rounded-lg text-xs">
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
            </div>
            <div className="border border-gray-300 p-3 rounded-lg text-xs">
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
            </div>
          </div>
        </div>
      </div>
      {/* Comments Section */}
      <div className="space-y-2 p-3 rounded-lg">
        <h3 className="text-sm font-medium underline">
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
            <h3 className="font-semibold mb-3 text-gray-700 text-base">
              Who to Follow
            </h3>
            <div className="space-y-4">
              <ProfilePreviewCard
                name="Hauwa Halima"
                title="Project Manager"
                id="4"
              />
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
