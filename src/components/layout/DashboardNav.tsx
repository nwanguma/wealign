"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import NotificationIcon from "@/components/ui/NotificationIcon";
import ProfileIcon from "@/components/ui/ProfileIcon";
import { RootState } from "@/store";

export default function DashboardNav() {
  /** User here to get user profile's avatar on sign up
   *  Todo: Update user profile everytime a profile update is made
   * */
  const user = useSelector((state: RootState) => state.user);
  const pathname = usePathname();

  //Todo: Fix nav active state for nested pages e.g events/{id}
  const links = [
    { name: "Home", href: "/dashboard" },
    { name: "Profiles", href: "/dashboard/profiles" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Events", href: "/dashboard/events" },
    { name: "Jobs", href: "/dashboard/jobs" },
    { name: "Spotlight", href: "/dashboard/spotlight" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 h-14 bg-white">
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
                pathname === link.href
                  ? "border-violet-700 text-violet-700 font-semibold"
                  : "border-transparent group-hover:border-b-violet-700 group-hover:text-violet-700 group-hover:font-normal"
              } transition-all duration-300 ease-in-out delay-150`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="flex space-x-6 items-center">
        <li>
          <NotificationIcon />
        </li>
        <li>
          <Link href="/dashboard/messages">
            <Image
              src="/icons/messages.svg"
              alt="messages"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </Link>
        </li>
        <li>
          <ProfileIcon avatar={user?.profile?.avatar} />
        </li>
      </ul>
    </nav>
  );
}
