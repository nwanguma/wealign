"use client";

import AppModal from "@/components/ui/Modal";
import Image from "next/image";

import CustomForm from "@/components/forms/CustomForm";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import DashboardProfileCard from "@/components/ui/DashboardProfileCard";
import DashboardEventCard from "@/components/ui/DashboardEventCard";
import DashboardProjectCard from "@/components/ui/DashboardProjectCard";

import AddEventForm from "@/components/forms/CreateEventForm";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import AccountSettings from "@/components/forms/AccountsSettings";
import CreateEventForm from "@/components/forms/CreateEventForm";

import { ProfileCard } from "../page";

export const DashboardSearchInput = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 pr-12 border placeholder:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button className="absolute inset-y-0 right-0 px-4 py-2 text-white bg-blue-700 rounded-r-md hover:bg-blue-600 transition duration-300 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M18 10.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="min-h-screen w-5/12 mx-auto">
        <AccountSettings />
      </div>
    </div>
  );
}
