import React from "react";
import Image from "next/image";
import Link from "next/link";

import HomeAuthControls from "@/components/ui/HomeAuthControls";
import { Toaster } from "react-hot-toast";

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

  const links: { href: string; name: string }[] = [];

  return (
    <>
      <div className="w-full">
        <header className="w-full min-h-screen pt-6 bg-gradient-to-r from-blue-100 via-purple-100 to-white">
          <nav className="flex justify-between items-center px-6 h-10">
            <ul className="flex space-x-2 lg:space-x-4 items-center">
              <li className="hover:scale-110 transform transition duration-300">
                <Link href="/home">
                  <Image
                    src="/icons/collabhub-logo.svg"
                    alt="home"
                    width={120}
                    height={50}
                    className="hover:opacity-80 transition duration-300"
                  />
                </Link>
              </li>
            </ul>
            {/* <ul className="flex text-sm text-gray-700">
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
            </ul> */}
            <ul className="space-x-3 lg:space-x-5">
              <HomeAuthControls main action={actionParam} />
            </ul>
          </nav>
          <div className="w-full min-h-[calc(100vh-10%)] flex">
            <div className="flex items-center flex-col w-11/12 lg:w-8/12 xl:w-9/12 mx-auto mt-[15%] lg:mt-[6%] 2xl:mt-[8%]">
              <div className="bg-blue-100 text-blue-600 text-md px-2 rounded flex space-x-1 items-center">
                <span>{riderText[riderTextDisplayIndex]}</span>
                <Image
                  src="/icons/work-color.svg"
                  width={15}
                  height={15}
                  alt="work"
                />
              </div>
              <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center mt-2 mb-8 md:mb-10 lg:mb-16 text-gray-800">
                Discover top <span className="text-blue-700">talent</span>{" "}
                <br></br> collaborate on{" "}
                <span className="text-blue-700">projects</span>
                <br></br> and unlock new{" "}
                <span className="text-blue-700">job opportunities</span>
              </div>
              <div className="mb-5 text-gray-500 w-full md:w-2/3 lg:w-1/2 text-center text-lg-xl">
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
              <div className="mt-5 md:mt-10">
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
