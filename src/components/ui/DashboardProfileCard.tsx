import React from "react";
import Image from "next/image";

interface IDashboardProfileCardProps {
  id: string;
  avatar?: string;
  name: string;
  title: string;
  heading: string;
  bio: string;
  skills: string[];
  dateJoined: string;
  likeCount: string;
  commentCount: string;
}

const DashboardProfileCard: React.FC<IDashboardProfileCardProps> = ({
  id,
  avatar,
  name,
  title,
  heading,
  bio,
  skills,
  dateJoined,
  likeCount,
  commentCount,
}) => {
  return (
    <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <div className="border border-gray-300 p-2 rounded-full">
          <Image
            src={avatar || "/images/test-avatar-2.jpg"}
            width={50}
            height={50}
            alt="logo"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-medium">{name}</span>
          <span className="text-sm text-custom-gray-paragraph">{title}</span>
        </div>
      </div>{" "}
      <p className="text-sm leading-snug text-gray-600">{heading}</p>
      <p className="text-sm leading-snug text-gray-700">{bio}</p>
      <div className="flex gap-2 flex-wrap">
        {skills.map((skill) => (
          <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
            {skill}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xs text-gray-600">
          <div className="">
            <span className="underline">
              <span>{commentCount}</span> <span>Comments</span>
            </span>
          </div>
          <div>
            <span className="underline">
              <span>{likeCount}</span> <span className="underline">Likes</span>
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-600 text-right">{dateJoined}</div>
      </div>
    </div>
  );
};

export default DashboardProfileCard;
