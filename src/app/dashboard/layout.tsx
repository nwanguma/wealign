import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen bg-[#f7f7f7]">
      <header className="w-full font-light text-gray-600">
        <nav className="flex justify-between items-center px-6 py-6 bg-white">
          <ul className="flex space-x-4 items-center">
            <li className="hover:scale-110 transform transition duration-300">
              <Link href="/home">
                <Image
                  src="/icons/google.svg"
                  alt="home"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition duration-300"
                />
              </Link>
            </li>
          </ul>

          <ul className="flex text-sm text-gray-700">
            {["Profiles", "Projects", "Events", "Jobs", "Things"].map(
              (linkText, index) => (
                <li key={index} className="relative group">
                  <Link
                    href={`/${linkText.toLowerCase()}`}
                    className="px-8 py-2 hover:text-blue-500 hover:font-medium transition duration-300"
                  >
                    {linkText}
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
              )
            )}
          </ul>
          <ul className="flex space-x-6 items-center">
            {[
              { src: "/icons/notifications.svg", alt: "notifications" },
              { src: "/icons/messages.svg", alt: "messages" },
              { src: "/icons/profile.svg", alt: "profile" },
            ].map((icon, index) => (
              <li
                key={index}
                className="hover:rotate-12 transform transition duration-300"
              >
                <Link href={`/${icon.alt}`}>
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={24}
                    height={24}
                    className="hover:opacity-80 transition duration-300 hover:filter hover:brightness-0 hover:sepia hover:saturate-[10000%] hover:hue-rotate-[180deg]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 py-4 bg-white border-t border-b border-gray-200">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>
      <main className="">
        <div>{children}</div>
      </main>
      <footer className="text-center py-4 bg-gray-100">
        <p className="text-sm text-gray-500">This is the footer</p>
      </footer>
    </div>
  );
}
