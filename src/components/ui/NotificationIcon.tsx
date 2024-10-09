"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function NotificationIcon() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

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
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <div className="p-4">
            <div className="pb-2 border-b border-gray-200 flex space-x-1 items-center">
              <p className="text-sm font-bold">Notifications</p>
              <span className="w-4 h-4 text-center text-xs inline-block bg-blue-700 rounded-full text-white">
                4
              </span>
            </div>

            <ul className="mt-2 text-sm text-gray-600 space-y-2">
              <li className="p-2 bg-slate-50 rounded-lg flex items-start space-x-2 justify-between">
                <span className="flex flex-col space-y-1">
                  <span className="text-gray-800 font-normal">
                    This is a new message
                  </span>
                  <span className="text-custom-gray-paragraph text-xs">
                    Fri 3:12 PM
                  </span>
                </span>
                <span className="w-1.5 h-1.5 inline-block bg-blue-700 rounded-full mt-1"></span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
