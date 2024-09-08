"use client"; // Mark this as a client component
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function NotificationIcon() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close the modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      <Image
        src="/icons/notifications.svg"
        alt="notifications"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
      />
      {isNotificationsOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <div className="p-4">
            <p className="text-sm font-semibold">Notifications</p>
            <ul className="mt-2 text-sm text-gray-600">
              <li className="py-1">You have a new message.</li>
              <li className="py-1">Project update available.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
