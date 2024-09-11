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
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="w-1/4 border-gray-300 p-3 border rounded-lg flex flex-col space-y-4">
          <div className="border-b border-b-gray-300 pb-2">
            <span className="font-medium text-sm">Filter</span>
          </div>
          <div className="">
            <label htmlFor="jobType" className="text-sm font-medium">
              Job Type
            </label>
            <div className="relative w-full">
              <select
                id="jobType"
                className="w-full mt-2 px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm appearance-none focus:ring-blue-700 focus:border-blue-700"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="freelance">Freelance</option>
              </select>
              <div className="absolute inset-y-4 right-1 flex items-center px-2 pointer-events-none h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">Salary range</span>
            <div className="mt-2 rounded-lg border border-gray-300 py-4 px-3">
              <div className="w-full">
                {/* <label htmlFor="salaryRange" className="text-sm font-medium">
                  Salary Range
                </label> */}

                <input
                  type="range"
                  id="salaryRange"
                  min="0"
                  max="200000"
                  step="10000"
                  className="mt-2 w-full h-1 border bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>$0</span>
                  <span>$200,000</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">Benefits</span>
            <div className="mt-2 grid grid-cols-2 gap-3 rounded-lg border border-gray-300 py-4 px-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">Experience Level</span>
            <div className="mt-2 grid grid-cols-2 gap-3 rounded-lg border border-gray-300 py-4 px-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">Skills</span>
            <div className="mt-2 grid grid-cols-2 gap-3 rounded-lg border border-gray-300 py-4 px-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-xs">
                  Healthcare
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <DashboardPageHeader
            title="Find skilled individuals to collaborate with"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
          />

          <div className="h-14 py-5 flex flex-col space-y-5 w-full">
            {" "}
            <div className="w-2/3">
              <DashboardSearchInput />
            </div>
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="border border-gray-300 rounded-lg p-3">
                <ProfileCard
                  name="Hauwa Halima"
                  title="Project Manager"
                  id="4"
                  description="Lorem ipsum dolor si amet, things, things, and more things, and more things, and more things, and more things."
                />
              </div>
              <div className="border border-gray-300 rounded-lg p-3">
                <ProfileCard
                  name="Hauwa Halima"
                  title="Project Manager"
                  id="4"
                  description="Lorem ipsum dolor si amet, things, things, and more things, and more things, and more things, and more things."
                />
              </div>
              <div className="border border-gray-300 rounded-lg p-3">
                <ProfileCard
                  name="Hauwa Halima"
                  title="Project Manager"
                  id="4"
                  description="Lorem ipsum dolor si amet, things, things, and more things, and more things, and more things, and more things."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
