import React, { useState } from "react";
import Image from "next/image";
import {
  useQueries,
  UseQueryResult,
  UseQueryOptions,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { fetchCurrentUser } from "@/store/user";
import { Event } from "@/common/constants";
import AppModal from "@/components/ui/Modal";
import { AppDispatch, RootState } from "@/store";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import AddEventForm from "@/components/forms/CreateEventForm";
import { EventCardPreview } from "@/components/ui/EventCard";
import { ProfilePreviewCard } from "@/components/ui/ProfileCard";
import { ActivityComponent } from "@/components/ui/Activity";
import {
  fetchProfiles,
  fetchEvents,
  fetchProjects,
  fetchJobs,
} from "@/store/recommendations";
import { User } from "@/common/constants";
import AddItemButton from "@/components/ui/AddItemButton";
import { Activity } from "@/common/constants";
import { fetchConversations } from "@/store/conversations";

import { EventWithPagination } from "@/common/constants";
import { ProjectsWithPagination } from "@/common/constants";
import { ProfilesWithPagination } from "@/common/constants";
import { Profile, Project } from "@/common/constants";
import HomeAuthControls from "@/components/ui/HomeAuthControls";
import { useSearchParams } from "next/navigation";

const fetchActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axios.get("/api/proxy/activities");

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

const fetchEventsData = async (
  pagination: any,
  contentType: string
): Promise<EventWithPagination> => {
  try {
    const response = await axios.get("/api/proxy/events", {
      params: {
        limit: pagination.limit,
        page: pagination.page,
        contentType,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

const fetchProjectsData = async (
  pagination: any,
  contentType: string
): Promise<ProjectsWithPagination[]> => {
  try {
    const response = await axios.get("/api/proxy/projects", {
      params: {
        limit: pagination.limit,
        page: pagination.page,
        contentType,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

const riderText = [
  "Connecting you with the finest talent globally",
  "Connect with innovators and bring your ideas to life",
  "Unlock career-defining opportunities with top professionals",
  "Discover exciting collaborations and make an impact",
  "Build your dream team and achieve success together",
  "Explore job openings that match your passion and expertise",
  "Create, collaborate, and grow in a thriving professional network",
  "Elevate your career by working with industry-leading talent",
  "Turn your ideas into reality with the right connections",
  "Find the perfect team for your next big project",
];

const Home: React.FC = ({ searchParams, params }: any) => {
  const riderTextDisplayIndex = Math.floor(Math.random() * 10);
  const actionParam = searchParams?.action;

  const { slug } = params;
  const events: Event[] = [];
  const projects: Project[] = [];
  const profiles: Profile[] = [];

  const links: { href: string; name: string }[] = [];

  return (
    <div className="w-full">
      <header className="w-full min-h-screen pt-6 bg-gradient-to-r from-blue-100 via-purple-100 to-white">
        <nav className="flex justify-between items-center px-6 h-10">
          <ul className="flex space-x-4 items-center">
            <li className="hover:scale-110 transform transition duration-300">
              <Link href="/home">
                <Image
                  src="/icons/collabhub-logo.svg"
                  alt="home"
                  width={140}
                  height={50}
                  className="hover:opacity-80 transition duration-300"
                />
              </Link>
            </li>
          </ul>
          <ul className="flex text-sm text-gray-700">
            {links.map((link) => (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`px-8 py-2 border-b ${
                    slug === link.href
                      ? "border-violet-700 text-violet-700 font-semibold"
                      : "border-transparent group-hover:border-b-violet-700 group-hover:text-violet-700 group-hover:font-normal"
                  } transition-all duration-300 ease-in-out delay-150`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-x-5">
            <HomeAuthControls main action={actionParam} />
          </ul>
        </nav>
        <div className="w-full min-h-[calc(100vh-10%)] flex">
          <div className="flex items-center flex-col w-9/12 mx-auto mt-[6%] 2xl:mt-[8%]">
            <div className="bg-blue-100 text-blue-600 text-sm px-2 rounded flex space-x-1 items-center">
              <span>{riderText[riderTextDisplayIndex]}</span>
              <Image
                src="/icons/work-color.svg"
                width={15}
                height={15}
                alt="work"
              />
            </div>
            <div className="text-6xl font-bold text-center mt-2 mb-16 text-gray-800">
              Discover top <span className="text-blue-700">talent</span>{" "}
              <br></br> collaborate on{" "}
              <span className="text-blue-700">projects</span>
              <br></br> and unlock new{" "}
              <span className="text-blue-700">job opportunities</span>
            </div>
            <div className="mb-5 text-gray-500 w-1/2 text-center">
              Connect with professionals, explore exciting projects, and find
              your next career move in one dynamic platform
              <Image
                src="/icons/celebration.svg"
                width={16}
                height={16}
                alt="work"
                className="ml-1 -mt-1 inline"
              />
            </div>
            <div className="w-1/2 text-center space-x-3 space-y-3 pb-3">
              {[
                { title: "JavaScript" },
                { title: "TypeScript" },
                { title: "Front-end" },
                { title: "React" },
                { title: "Node.js" },
                { title: "Next.js" },
                { title: "Go" },
                { title: "Design" },
                { title: "UI/UX" },
                { title: "Docker" },
              ].map((skill) => (
                <span
                  key={skill.title}
                  className="inline-block capitalize text-sm border border-violet-500 text-violet-500 py-2 px-3 rounded"
                >
                  {skill.title}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <HomeAuthControls />
            </div>
          </div>
        </div>
      </header>
      {/* <div className="flex space-x-5">
        <div className="w-1/4 space-y-5">
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <div className="space-y-4">
              {projects &&
                projects.map((project) => {
                  return <div key={project.id}>This is the project</div>;
                })}
            </div>
            <div className="space-y-4">
              {events &&
                events.map((event) => {
                  return <div key={event.id}>This is the event</div>;
                })}
            </div>
            <div className="space-y-4">
              {profiles &&
                profiles.map((profile) => {
                  return <div key={profile.id}>This is the profile</div>;
                })}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
