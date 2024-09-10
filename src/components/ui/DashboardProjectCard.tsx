import React from "react";
import Image from "next/image";
import { Description } from "@headlessui/react";

interface IDashboardProjectCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  website: string;
  github: string;
  skills: string[];
  dateCreated: string;
  likeCount: string;
  commentCount: string;
}

const DashboardProjectCard: React.FC<IDashboardProjectCardProps> = ({
  id,
  title,
  author,
  description,
  website,
  github,
  skills,
  commentCount,
  likeCount,
  dateCreated,
}) => {
  return (
    <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <div className="border border-gray-300 p-2 rounded-lg">
          <Image src="/icons/th-logo.svg" width={40} height={40} alt="logo" />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-medium">{title}</span>
          <span className="text-sm text-gray-500">{author}</span>
        </div>
      </div>{" "}
      <p className="text-sm leading-snug text-gray-700">{description}</p>
      <p className="text-sm leading-snug text-gray-600">{website}</p>
      <p className="text-sm leading-snug text-gray-600">{github}</p>
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
        <div className="text-xs text-gray-600 text-right">{dateCreated}</div>
      </div>
    </div>
  );
};

export default DashboardProjectCard;
