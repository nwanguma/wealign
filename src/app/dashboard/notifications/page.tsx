"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import axiosInstance from "@/lib/axiosInstance";
import PaginationComponent from "@/components/ui/PaginationComponent";

import { NotificationsWithPagination, IPagination } from "@/common/constants";
import NotificationsCard from "@/components/ui/NotificationsCard";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const fetchNotifications = async (
  pagination: IPagination
): Promise<NotificationsWithPagination> => {
  const response = await axiosInstance.get("/api/proxy/notifications", {
    params: {
      ...pagination,
    },
  });

  return response.data.data;
};

export default function Notifications() {
  const newNotifications = useSelector(
    (state: RootState) => state.notifications
  );

  const [pagination, setPagination] = useState({ page: 1, limit: 2 });
  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ["notifications", pagination],
    queryFn: () => fetchNotifications(pagination),
    placeholderData: keepPreviousData,
  });

  let notifications;
  let total = 0;

  if (notificationsData) {
    const { total: pageTotal } = notificationsData;

    notifications = notificationsData.data;
    total = pageTotal;
  }

  return (
    <div className="min-h-screen w-full bg-white pb-5">
      <div className="min-h-screen w-8/12 mx-auto">
        <div className="flex flex-col">
          {!isLoading && (
            <>
              <div className="w-full px-10 flex space-x-1 items-center py-5 border-b border-b-gray-200 font-app-medium">
                <span>Notifications</span>
                {/* <div className="bg-blue-600 rounded-full text-white h-4 w-4 text-center text-xs">
                  {notifications ? notifications?.length : 0}
                </div> */}
              </div>
              <div className="mb-5">
                {notifications &&
                  notifications.map((notification) => (
                    <NotificationsCard
                      key={notification.id}
                      notification={notification}
                      newNotifications={newNotifications.data}
                    />
                  ))}
              </div>
            </>
          )}
          {isLoading && <SkeletonLoader />}
          {notifications && (
            <PaginationComponent
              data={notifications}
              total={total}
              setPagination={setPagination}
              limit={pagination.limit}
              tag="notifications"
            />
          )}
        </div>
      </div>
    </div>
  );
}
