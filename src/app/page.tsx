import React from "react";
import Image from "next/image";

import HomeAuthControls from "@/components/ui/HomeAuthControls";
import { Toaster } from "react-hot-toast";
import HomeNav from "@/components/ui/HomeNav";

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

interface HomeProps {
  searchParams: Record<string, string>;
  params: { slug?: string[] };
}

const Home: React.FC<HomeProps> = ({ searchParams, params }) => {
  const riderTextDisplayIndex = Math.floor(Math.random() * 10);
  const actionParam = searchParams?.action;
  const pathname = `/${params.slug?.join("/") || ""}`;

  return (
    <>
      <div className="w-full">
        <header className="w-full min-h-screen py-4 bg-gradient-to-r from-blue-100 via-purple-100 to-white">
          <HomeNav actionParam={actionParam} pathname={pathname} />
          <div className="w-full min-h-[calc(100vh-10%)] flex">
            <div className="flex items-center flex-col w-11/12 lg:w-9/12 xl:w-10/12 mx-auto mt-[12%] lg:mt-[6%] 2xl:mt-[8%]">
              <div className="bg-blue-100 text-blue-600 text-md px-2 rounded flex space-x-1 items-center">
                <span>{riderText[riderTextDisplayIndex]}</span>
                <Image
                  src="/icons/work-color.svg"
                  width={15}
                  height={15}
                  alt="work"
                />
              </div>
              <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center mt-2 mb-8 md:mb-10 lg:mb-10 text-gray-800">
                Join <span className="text-blue-700">WeAlign</span> to <br></br>
                discover top <span className="text-blue-700">talent</span>{" "}
                <br></br> collaborate on{" "}
                <span className="text-blue-700">projects</span>
                <br></br> and unlock new{" "}
                <span className="text-blue-700">job opportunities</span>
              </div>
              <div className="mb-4 text-gray-500 w-full md:w-2/3 lg:w-1/2 text-center text-lg-xl">
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
              <div className="w-full md:w-2/3 lg:w-1/2 text-center space-x-3 space-y-3 pb-1 md:pb-3">
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
                    className="inline-block capitalize text-sm border border-violet-500 text-violet-500 py-1 px-2 sm:py-2 sm:px-3 rounded"
                  >
                    {skill.title}
                  </span>
                ))}
              </div>
              <div className="mt-4 md:mt-6">
                <HomeAuthControls />
              </div>
            </div>
          </div>
        </header>
      </div>
      <Toaster />
    </>
  );
};

export default Home;
