"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import NotificationIcon from "@/components/ui/NotificationIcon";
import ProfileIcon from "@/components/ui/ProfileIcon";
import MessageIcon from "@/components/ui/MessageIcon";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/dashboard" },
    { name: "Profiles", href: "/dashboard/profiles" },
    { name: "Projects", href: "/dashboard/projects" },
    { name: "Events", href: "/dashboard/events" },
  ];

  return (
    <div className="w-full h-screen bg-[#f7f7f7]">
      <header className="w-full font-light text-gray-600 border-b border-gray-200">
        <nav className="flex justify-between items-center px-6 h-14 bg-white">
          <ul className="flex space-x-4 items-center">
            <li className="hover:scale-110 transform transition duration-300">
              <Link href="/home">
                <Image
                  src="/icons/th-logo.svg"
                  alt="home"
                  width={100}
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
              <ProfileIcon />
            </li>
          </ul>
        </nav>
      </header>

      <main className="min-h-screen">
        <div>{children}</div>
      </main>

      <footer className="text-center py-4 bg-gray-100">
        <p className="text-sm text-custom-gray-paragraph">This is the footer</p>
      </footer>
    </div>
  );
}
