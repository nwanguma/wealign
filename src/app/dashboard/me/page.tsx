"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { ProfilePreviewCard } from "@/components/ui/ProfileCard";
import { mapLanguageToFlag, Profile } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AppModal from "@/components/ui/Modal";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import AccountsSettings from "@/components/forms/AccountsSettings";

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

interface IProfileCardMainProps extends Profile {}

function getFilenameAndExtension(url: string): string {
  const pathname = new URL(url).pathname;
  const filenameWithExt = pathname.substring(pathname.lastIndexOf("/") + 1);
  const dotIndex = filenameWithExt.lastIndexOf(".");
  const filename = filenameWithExt.substring(0, dotIndex);
  const extension = filenameWithExt.substring(dotIndex + 1);

  return filename + "." + extension;
}

// {
//     "status": "success",
//     "message": "Request successful",
//     "data": {
//         "id": "c67432cb-79ff-4a69-b8f1-9de7074138d4",
//         "first_name": "Childish",
//         "last_name": "Gambino",
//         "avatar": "https://example.com/avatar.jpg",
//         "bio": "Software developer with 5+ years of experience in web development.",
//         "heading": "Doer of things and solver of hard problems",
//         "title": "Technical Project Manager",
//         "location": "San Francisco, CA",
//         "phone": "+1234567890",
//         "website": "https://childishgambino.com",
//         "linkedin": "https://linkedin.com/in/childish-gambino",
//         "github": "https://github.com/childish-gambino",
//         "resume": "https://example.com/resume.pdf",
//         "languages": [
//             "english",
//             "spanish"
//         ],
//         "skills": [
//             {
//                 "title": "html"
//             },
//             {
//                 "title": "css"
//             }
//         ],
//         "user_id": "101e8bd5-336a-4fb1-88cd-d1efd935a4b9"
//     },
//     "code": null,
//     "timestamp": "2024-09-15T10:17:11.408Z"
// }

export const ProfileCardMain: React.FC<IProfileCardMainProps> = ({
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
  id,
  comments = [],
  likes = [],
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setNewComment("");
    }
  };

  return (
    <div className="relative space-y-4">
      <div className="flex flex-col space-y-6 border-b border-b-gray-200 pb-4">
        <div className="flex items-center space-x-6">
          <div className="border border-gray-300 p-1 rounded-full">
            <Image
              src="/images/test-avatar.jpg"
              width={150}
              height={150}
              alt="avatar"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="font-bold text-2xl text-gray-900">
                  {first_name} {last_name}
                </span>
                <span className="text-sm text-gray-700 font-normal">
                  {title}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">{heading}</span>
              </div>
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
              {languages.map((language) => (
                <span className="rounded-full inline-block bg-slate-50 p-1 shadow">
                  <Image
                    key={language}
                    src={`/icons/${mapLanguageToFlag[language]}.svg`}
                    alt=""
                    width={23}
                    height={23}
                    className="rounded-full"
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Share</h3>
            <div className="flex space-x-3">
              {["Linkedin"].map((platform) => (
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
        <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
      </div>
      {skills && (
        <div className="space-y-2 border-b border-b-gray-200 pb-4">
          <h3 className="text-sm font-bold">Skills</h3>
          <div className="flex gap-2 flex-wrap">
            {skills.map((skill) => (
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
        <div className="w-full border-b border-b-gray-200 pb-4">
          <div className="space-y-2 w-2/3">
            <h3 className="text-sm font-bold">Attachments</h3>
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
                      <Image
                        src="/icons/download.svg"
                        width={18}
                        height={18}
                        alt="file icon"
                      />
                      {/* <span>Download</span> */}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Comments Section */}
      {!comments && (
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
                    <p className="text-xs text-gray-500">{comment.author}</p>
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
      )}
    </div>
  );
};

const fetchProfile = async (id: string): Promise<Profile> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/profiles/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);
  const id = user.profile.id;

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery<Profile, Error>({
    queryKey: ["profiles", id],
    queryFn: () => fetchProfile(id as string),
  });

  return (
    <div className="bg-white">
      {profile && (
        <div className="min-h-screen w-9/12 bg-white mx-auto">
          <div className="flex space-x-5 p-6">
            <div className="flex-1 p-4 flex flex-col space-y-5 w-full rounded-lg">
              <div className="w-full">
                <ProfileCardMain
                  first_name={profile.first_name}
                  last_name={profile.last_name}
                  avatar={profile.avatar}
                  bio={profile.bio}
                  heading={profile.heading}
                  title={profile.title}
                  location={profile.location}
                  phone={profile.phone}
                  website={profile.website}
                  linkedin={profile.linkedin}
                  github={profile.github}
                  resume={profile.resume}
                  languages={profile.languages}
                  skills={profile.skills}
                  id={profile.id}
                  // comments={profile.comments}
                  // likes={profile.likes}
                />
              </div>
            </div>
          </div>
          <AppModal
            title="This is the title"
            isOpen={true}
            onClose={() => console.log("closed")}
          >
            {/* <AddEventForm /> */}

            {/* <CreateProjectForm /> */}

            <UpdateProfileForm />
            {/* <AccountsSettings /> */}
          </AppModal>
        </div>
      )}
    </div>
  );
}
