"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProfileIcon() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      <div className="border border-gray-300 p-1 rounded-full">
        <Image
          src="/images/test-avatar-3.jpg"
          width={30}
          height={30}
          alt="avatar"
          className="cursor-pointer rounded-full"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        />
      </div>
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <div className="p-4">
            <div className="pb-2 border-b border-gray-200 flex space-x-1 items-center">
              <p className="text-sm font-bold">Profile</p>
              <Image src="/icons/person.svg" alt="" width={11} height={11} />
            </div>
            <ul className="mt-2 text-sm text-gray-600 space-y-2">
              <li className="p-2 bg-slate-50 rounded-lg flex items-start space-x-2">
                <span className="text-gray-800 font-normal">
                  Update Profile
                </span>
              </li>
              <li className="p-2 bg-slate-50 rounded-lg flex items-start space-x-2">
                <span className="text-gray-800 font-normal">
                  Account Settings
                </span>
              </li>
              <li className="p-2 bg-slate-50 rounded-lg flex items-start space-x-2 justify-between">
                <span className="flex flex-col space-y-1">
                  <span className="text-red-600">Logout</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
