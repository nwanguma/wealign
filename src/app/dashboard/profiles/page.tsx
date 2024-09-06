"use client";

import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="w-1/4 border-gray-300 p-3 border rounded-lg flex flex-col space-y-4">
          <span className="font-medium text-sm">Filter</span>
          <div className="">
            <label htmlFor="jobType" className="text-sm font-medium">
              Job Type
            </label>
            <select
              id="jobType"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-700 focus:border-blue-700"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label htmlFor="salaryRange" className="text-sm font-medium">
              Salary Range
            </label>
            <input
              type="range"
              id="salaryRange"
              min="0"
              max="200000"
              step="10000"
              className="mt-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>$0</span>
              <span>$200,000</span>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">Benefits</span>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="healthcare"
                  className="w-4 p-1 h-4 text-blue-700 border-gray-300 rounded focus:ring-blue-700 focus:ring-2 checked:bg-blue-700 checked:border-transparent checked:focus:ring-blue-700"
                />
                <label htmlFor="healthcare" className="text-sm">
                  Healthcare
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remote"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 checked:bg-blue-600 checked:border-transparent checked:focus:ring-blue-500"
                />
                <label htmlFor="remote" className="text-sm">
                  Remote
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="vacation"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 checked:bg-blue-600 checked:border-transparent checked:focus:ring-blue-500"
                />
                <label htmlFor="vacation" className="text-sm">
                  Paid Vacation
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full flex flex-col justify-center space-y-5 h-40 bg-gradient-to-r from-blue-100 via-purple-100 to-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Find your dream job here
            </h2>
            <p className="text-gray-600 mt-2 text-sm w-1/2">
              Join Pepsi, Pepsi is a place where you find your dream job in
              various skills here, you will also get many benefits, Join Pepsi,
              Pepsi is a place where you find your dream job in various skills
              here, you will also get many benefits.
            </p>
          </div>
          <div className="h-14 py-5 flex flex-col space-y-5 items-center w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            <div className="w-full grid grid-cols-3 gap-3">
              <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="border border-gray-300 p-2 rounded-lg">
                    <Image
                      src="/icons/google.svg"
                      width={40}
                      height={40}
                      alt="logo"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Product Designer</span>
                    <span className="text-sm text-gray-500">
                      Facebook, inc.
                    </span>
                  </div>
                </div>{" "}
                <p className="text-sm leading-snug text-gray-600">
                  Lorem ipsum dolor si amet
                </p>
                <p className="text-sm leading-snug text-gray-700">
                  Facebook is opening opportunities to join our team! We are
                  looking for talented and passionate individuals.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Figma
                  </div>
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Illustration
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    After Effect
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Blender
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Mixer
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-right">
                  Posted 47 min ago
                </div>
              </div>{" "}
              <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="border border-gray-300 p-2 rounded-lg">
                    <Image
                      src="/icons/google.svg"
                      width={40}
                      height={40}
                      alt="logo"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Product Designer</span>
                    <span className="text-sm text-gray-500">
                      Facebook, inc.
                    </span>
                  </div>
                </div>{" "}
                <p className="text-sm leading-snug text-gray-600">
                  Lorem ipsum dolor si amet
                </p>
                <p className="text-sm leading-snug text-gray-700">
                  Facebook is opening opportunities to join our team! We are
                  looking for talented and passionate individuals.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Figma
                  </div>
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Illustration
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    After Effect
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Blender
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Mixer
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-right">
                  Posted 47 min ago
                </div>
              </div>{" "}
              <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="border border-gray-300 p-2 rounded-lg">
                    <Image
                      src="/icons/google.svg"
                      width={40}
                      height={40}
                      alt="logo"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Product Designer</span>
                    <span className="text-sm text-gray-500">
                      Facebook, inc.
                    </span>
                  </div>
                </div>{" "}
                <p className="text-sm leading-snug text-gray-600">
                  Lorem ipsum dolor si amet
                </p>
                <p className="text-sm leading-snug text-gray-700">
                  Facebook is opening opportunities to join our team! We are
                  looking for talented and passionate individuals.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Figma
                  </div>
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Illustration
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    After Effect
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Blender
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Mixer
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-right">
                  Posted 47 min ago
                </div>
              </div>{" "}
              <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="border border-gray-300 p-2 rounded-lg">
                    <Image
                      src="/icons/google.svg"
                      width={40}
                      height={40}
                      alt="logo"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Product Designer</span>
                    <span className="text-sm text-gray-500">
                      Facebook, inc.
                    </span>
                  </div>
                </div>{" "}
                <p className="text-sm leading-snug text-gray-600">
                  Lorem ipsum dolor si amet
                </p>
                <p className="text-sm leading-snug text-gray-700">
                  Facebook is opening opportunities to join our team! We are
                  looking for talented and passionate individuals.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Figma
                  </div>
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Illustration
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    After Effect
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Blender
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Mixer
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-right">
                  Posted 47 min ago
                </div>
              </div>{" "}
              <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="border border-gray-300 p-2 rounded-lg">
                    <Image
                      src="/icons/google.svg"
                      width={40}
                      height={40}
                      alt="logo"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Product Designer</span>
                    <span className="text-sm text-gray-500">
                      Facebook, inc.
                    </span>
                  </div>
                </div>{" "}
                <p className="text-sm leading-snug text-gray-600">
                  Lorem ipsum dolor si amet
                </p>
                <p className="text-sm leading-snug text-gray-700">
                  Facebook is opening opportunities to join our team! We are
                  looking for talented and passionate individuals.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Figma
                  </div>
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Illustration
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    After Effect
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Blender
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Mixer
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-right">
                  Posted 47 min ago
                </div>
              </div>
              <div className="border border-gray-300 p-3 rounded-lg flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="border border-gray-300 p-2 rounded-lg">
                    <Image
                      src="/icons/google.svg"
                      width={40}
                      height={40}
                      alt="logo"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Product Designer</span>
                    <span className="text-sm text-gray-500">
                      Facebook, inc.
                    </span>
                  </div>
                </div>{" "}
                <p className="text-sm leading-snug text-gray-600">
                  Lorem ipsum dolor si amet
                </p>
                <p className="text-sm leading-snug text-gray-700">
                  Facebook is opening opportunities to join our team! We are
                  looking for talented and passionate individuals.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Figma
                  </div>
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Illustration
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    After Effect
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Blender
                  </div>{" "}
                  <div className="text-xs border border-violet-500 text-violet-500 py-1 px-2 rounded">
                    Mixer
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-right">
                  Posted 47 min ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
