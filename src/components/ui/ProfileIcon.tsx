"use client"; // Mark this as a client component
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProfileIcon() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close the modal when clicking outside
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
      <Image
        src="/icons/profile.svg"
        alt="profile"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      />
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <div className="p-4">
            <Link href="/profile" className="block text-sm text-gray-600">
              Account Settings
            </Link>
            <Link href="/settings" className="block text-sm text-gray-600">
              Account Settings
            </Link>
            <button className="mt-2 text-sm text-red-600">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}
