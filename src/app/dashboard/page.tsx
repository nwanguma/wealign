"use client";

import { useState } from "react";
import AppModal from "@/components/ui/Modal";
import Image from "next/image";

import { Event, Project } from "../constants";

import eventsData from "../constants/events.json";
import projectsData from "../constants/projects.json";

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

export const EventCard: React.FC<IEventCardProps> = ({
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
  return (
    <div className="space-x-4 h-full relative">
      <div className="h-full flex items-center space-x-5">
        <div className="max-w-20">
          <div className="flex flex-col justify-center items-center">
            <span className="text-xs text-gray-500">Mon</span>
            <span className="text-lg font-bold text-gray-900">{banner}</span>
            <span className="text-xs text-gray-500">April</span>
          </div>
        </div>
        <div className="w-1/3 h-full min-h-20 relative rounded-lg">
          <Image
            src={`/images/test-event-${Math.min(4, banner)}.jpg`}
            alt="avatar"
            className="rounded-lg"
            layout="fill"
          />
        </div>
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex flex-col space-y-2 py-2">
            <div className="flex flex-col">
              <span className="font-medium">{title}</span>
              <span className="text-xs text-gray-500">{location}</span>
            </div>
            {/** Truncate string past a certain character limit */}
            {!isPreview && (
              <span className="text-sm text-gray-600 leading-snug">
                {description}
              </span>
            )}
          </div>
          {!isPreview && (
            <div className="absolute bottom-0 right-0 flex items-center space-x-3 text-xs text-gray-600">
              <span className="underline">
                <span>{comment_count} Comments</span>
              </span>
              <div>
                <span className="underline spac">
                  <span>{like_count} Likes</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface IProfilePreviewCardProps {
  id: string;
  name: string;
  title: string;
  isPreview?: boolean;
}

export const ProfilePreviewCard: React.FC<IProfilePreviewCardProps> = ({
  id,
  name,
  title,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 flex items-center space-x-2">
        <div className="border border-gray-300 p-1 rounded-full">
          <Image
            src="/images/test-avatar-3.jpg"
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs text-gray-500">{title}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="flex items-center p-3 shadow bg-white border border-gray-300 text-sm rounded-full hover:bg-gray-100 text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 45.902 45.902"
            className="w-5 h-5"
          >
            <g>
              <g>
                <path
                  d="M43.162,26.681c-1.564-1.578-3.631-2.539-5.825-2.742c1.894-1.704,3.089-4.164,3.089-6.912
          c0-5.141-4.166-9.307-9.308-9.307c-4.911,0-8.932,3.804-9.281,8.625c4.369,1.89,7.435,6.244,7.435,11.299
          c0,1.846-0.42,3.65-1.201,5.287c1.125,0.588,2.162,1.348,3.066,2.26c2.318,2.334,3.635,5.561,3.61,8.851l-0.002,0.067
          l-0.002,0.057l-0.082,1.557h11.149l0.092-12.33C45.921,30.878,44.936,28.466,43.162,26.681z"
                />
                <path
                  d="M23.184,34.558c1.893-1.703,3.092-4.164,3.092-6.912c0-5.142-4.168-9.309-9.309-9.309c-5.142,0-9.309,4.167-9.309,9.309
          c0,2.743,1.194,5.202,3.084,6.906c-4.84,0.375-8.663,4.383-8.698,9.318l-0.092,1.853h14.153h15.553l0.092-1.714
          c0.018-2.514-0.968-4.926-2.741-6.711C27.443,35.719,25.377,34.761,23.184,34.558z"
                />
                <path
                  d="M6.004,11.374v3.458c0,1.432,1.164,2.595,2.597,2.595c1.435,0,2.597-1.163,2.597-2.595v-3.458h3.454
          c1.433,0,2.596-1.164,2.596-2.597c0-1.432-1.163-2.596-2.596-2.596h-3.454V2.774c0-1.433-1.162-2.595-2.597-2.595
          c-1.433,0-2.597,1.162-2.597,2.595V6.18H2.596C1.161,6.18,0,7.344,0,8.776c0,1.433,1.161,2.597,2.596,2.597H6.004z"
                />
              </g>
            </g>
          </svg>
        </button>

        <button className="flex items-center p-3 bg-white border  shadow border-gray-300 text-blue-700 text-sm hover:bg-gray-100 rounded-full">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface IProfileCardProps {
  id: string;
  name: string;
  title: string;
  description: string;
}

export const ProfileCard: React.FC<IProfileCardProps> = ({
  id,
  name,
  title,
  description,
}) => {
  return (
    <div className="flex items-center justify-between relative">
      <div className="flex flex-col space-y-6">
        <div className="flex-1 flex items-center space-x-2">
          <div className="border border-gray-300 p-1 rounded-full">
            <Image
              src="/images/test-avatar-3.jpg"
              width={75}
              height={75}
              alt="avatar"
              className="rounded-full"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex flex-col">
              <span className="font-medium text-sm">{name}</span>
              <span className="text-xs text-gray-500">{title}</span>
            </div>
            <div className="w-3/4 leading-4 text-gray-700">
              <span className="text-sm leading-tight text-gray-500">
                {description}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Figma", "Blender", "Homebrew", "Yahoo"].map((skill, index) => (
            <div
              key={skill + index}
              className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded"
            >
              {skill}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 text-xs text-gray-600">
            <span className="underline">
              <span>4</span> <span>Followers</span>
            </span>
            <span className="underline">
              <span>4</span> <span className="underline">Following</span>
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-gray-600">
            <span className="underline">
              <span>4 Comments</span>
            </span>
            <span className="underline spac">
              <span>4 Likes</span>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <div className="flex items-center space-x-2">
          <button className="flex items-center p-3 shadow bg-white border border-gray-300 text-sm rounded-full hover:bg-gray-100 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 45.902 45.902"
              className="w-4 h-4"
            >
              <g>
                <g>
                  <path
                    d="M43.162,26.681c-1.564-1.578-3.631-2.539-5.825-2.742c1.894-1.704,3.089-4.164,3.089-6.912
          c0-5.141-4.166-9.307-9.308-9.307c-4.911,0-8.932,3.804-9.281,8.625c4.369,1.89,7.435,6.244,7.435,11.299
          c0,1.846-0.42,3.65-1.201,5.287c1.125,0.588,2.162,1.348,3.066,2.26c2.318,2.334,3.635,5.561,3.61,8.851l-0.002,0.067
          l-0.002,0.057l-0.082,1.557h11.149l0.092-12.33C45.921,30.878,44.936,28.466,43.162,26.681z"
                  />
                  <path
                    d="M23.184,34.558c1.893-1.703,3.092-4.164,3.092-6.912c0-5.142-4.168-9.309-9.309-9.309c-5.142,0-9.309,4.167-9.309,9.309
          c0,2.743,1.194,5.202,3.084,6.906c-4.84,0.375-8.663,4.383-8.698,9.318l-0.092,1.853h14.153h15.553l0.092-1.714
          c0.018-2.514-0.968-4.926-2.741-6.711C27.443,35.719,25.377,34.761,23.184,34.558z"
                  />
                  <path
                    d="M6.004,11.374v3.458c0,1.432,1.164,2.595,2.597,2.595c1.435,0,2.597-1.163,2.597-2.595v-3.458h3.454
          c1.433,0,2.596-1.164,2.596-2.597c0-1.432-1.163-2.596-2.596-2.596h-3.454V2.774c0-1.433-1.162-2.595-2.597-2.595
          c-1.433,0-2.597,1.162-2.597,2.595V6.18H2.596C1.161,6.18,0,7.344,0,8.776c0,1.433,1.161,2.597,2.596,2.597H6.004z"
                  />
                </g>
              </g>
            </svg>
          </button>

          <button className="flex items-center p-3 bg-white border  shadow border-gray-300 text-gray-500 text-sm hover:bg-gray-100 rounded-full">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProjectCard = () => {
  return (
    <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <div className="border border-gray-300 p-2 rounded-full">
          <Image
            src="/icons/google.svg"
            width={40}
            height={40}
            alt="logo"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-medium">Product Designer</span>
          <span className="text-sm text-gray-500">Facebook, inc.</span>
        </div>
      </div>{" "}
      <p className="text-sm leading-snug text-gray-600">
        Lorem ipsum dolor si amet
      </p>
      <p className="text-sm leading-snug text-gray-700">
        Facebook is opening opportunities to join our team! We are looking for
        talented and passionate individuals.
      </p>
      <div className="flex gap-2 flex-wrap">
        {[
          "Figma",
          "Photoshop",
          "Lighthouse",
          "Blender",
          "Homebrew",
          "Yahoo",
        ].map((skill, index) => (
          <div
            key={skill + index}
            className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded"
          >
            {skill}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-600 ">
        <div className="flex items-center space-x-3">
          <span className="underline">
            <span>4 Comments</span>
          </span>
          <span className="underline spac">
            <span>4 Likes</span>
          </span>
        </div>
        <span>Posted 47 mins ago</span>
      </div>
    </div>
  );
};

const MainFeed: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [projects, setProjects] = useState<Project[]>(projectsData);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "John Doe",
      avatar: "/images/test-avatar.jpg",
      content:
        "Excited to announce the launch of our new product! Check it out and give your feedback.",
      likes: 5,
      comments: 2,
      shares: 1,
      timeAgo: "2h",
      media: null,
    },
    {
      id: 2,
      author: "Jane Smith",
      avatar: "/images/test-avatar-2.jpg",
      content: "Who else is attending React Conf 2024? Let's meet up!",
      likes: 10,
      comments: 5,
      shares: 3,
      timeAgo: "1h",
      media: "/images/event.jpg",
    },
  ]);

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <aside className="w-96 space-y-5">
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
        <div className="flex-1 space-y-6">
          <div className="p-4 bg-white rounded-lg border border-gray-300 space-y-3 flex justify-between items-center">
            <div className="w-1/2 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="border border-gray-300 p-1 rounded-full">
                  <Image
                    src="/images/test-avatar.jpg"
                    width={80}
                    height={80}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-sm text-gray-900">
                    Kayode Otitoju
                  </span>
                  <span className="text-xs text-gray-500">Product Manager</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-600">
                <span className="underline">
                  <span>4</span> <span>Followers</span>
                </span>
                <span className="underline">
                  <span>4</span> <span className="underline">Following</span>
                </span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="">
                <div className="">
                  <div className="flex space-x-3 justify-end">
                    <button className="flex items-center px-2 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-xs">Event</span>
                    </button>
                    <button className="flex items-center px-2 py-2 border border-gray-300 text-gray-600 text-sm rounded-md hover:bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-xs">Project</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-right">
                <span className="text-xs font-medium">Customize feed</span>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs text-gray-500">Feed Content:</span>
                  {["Events", "Projects"].map((skill) => (
                    <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2 items-center">
                  <span className="text-xs text-gray-500">From:</span>
                  {["Following", "All"].map((skill) => (
                    <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="border border-gray-300 rounded-lg p-3">
              <ProfileCard
                name="Hauwa Halima"
                title="Project Manager"
                id="4"
                description="Lorem ipsum dolor si amet, things, things, and more things, and more things, and more things, and more things."
              />
            </div>
            {posts.map((post, index) => (
              <div className="w-full border border-gray-300 rounded-lg p-4 h-48">
                <EventCard
                  id={String(post.id)}
                  banner={++index}
                  date="4, April, 2027"
                  title="A futuristic event"
                  location="London, England"
                  event_start_date="4th July, 2023"
                  description="An annual conference showcasing the latest in technology and innovation. An annual conference showcasing..."
                  like_count="47"
                  comment_count="46"
                />
              </div>
            ))}
            <ProjectCard />
          </div>
        </div>
        <aside className="w-1/4 space-y-5">
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-semibold mb-3 text-gray-700 text-base">
              Timeline Activities
            </h3>
            <div className="space-y-0">
              <div className="flex space-x-2 items-center text-sm text-gray-600 border-b border-b-gray-300 py-3">
                <div className="border border-gray-300 p-1 rounded-full">
                  <Image
                    src="/images/test-avatar.jpg"
                    width={30}
                    height={30}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <span className="font-semibold">You</span> added comment in{" "}
                  <span className="font-semibold">Tochukwu Nwanguma's</span>{" "}
                  post
                </div>
              </div>
              <div className="flex space-x-2 items-center text-sm text-gray-600 border-b border-b-gray-300 py-3">
                <div className="border border-gray-300 p-1 rounded-full">
                  <Image
                    src="/images/test-avatar-3.jpg"
                    width={30}
                    height={30}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <span className="font-semibold">Mukesh Ambani</span> added
                  comment in <span className="font-semibold">your</span> project
                </div>
              </div>
              <div className="flex space-x-2 items-center text-sm text-gray-600 border-b border-b-gray-300 last:border-0 py-3">
                <div className="border border-gray-300 p-1 rounded-full">
                  <Image
                    src="/images/test-avatar-3.jpg"
                    width={30}
                    height={30}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <span className="font-semibold">Mukesh Ambani</span> added
                  comment in your project
                </div>
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default MainFeed;
