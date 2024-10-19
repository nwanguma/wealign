"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import axiosInstance from "@/lib/axiosInstance";
import PaginationComponent from "@/components/ui/PaginationComponent";

import {
  NotificationsWithPagination,
  IPagination,
  Notification,
} from "@/common/constants";

//article - liked, commented
//event - liked, commented
//project - liked, commented, feedback recieved
//profile - liked, commented, followed
//job - like, commented

const FollowNotification = ({
  notification,
}: {
  notification: Notification;
}) => {
  return (
    <div className="border-b border-gray-200 px-10 py-4">
      <div className="flex items-center">
        <Image
          src={notification.initiator.profile.avatar!}
          className="rounded-full"
          alt=""
          width={40}
          height={40}
        />
        <div>
          <div className="text-xs-sm font-app-light">
            <Link
              className="text-gray-600 font-app-medium"
              href={`/dashboard/profiles/${notification.initiator.profile.id}`}
            >
              {notification.initiator.profile.first_name +
                " " +
                notification.initiator.profile.last_name}{" "}
            </Link>
            <span>followed you</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsCard = ({
  notification,
}: {
  notification: Notification;
}) => {
  return (
    <>
      <FollowNotification notification={notification} />
    </>
  );
};

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
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const { data: notificationsData } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(pagination),
  });

  let notifications;
  let total = 0;

  if (notificationsData) {
    const { total: pageTotal } = notificationsData;

    notifications = notificationsData.data;
    total = pageTotal;
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="min-h-screen w-7/12 mx-auto border border-gray-200">
        <div className="flex flex-col">
          <div className="w-full px-10 flex space-x-2 items-center py-5 border-b border-b-gray-200 font-app-medium">
            <span>Notifications</span>
            <div className="bg-blue-600 rounded-full text-white h-4 w-4 text-center text-xs">
              {total}
            </div>
          </div>
          <div className="mb-5">
            {notifications &&
              notifications.map((notification) => (
                <NotificationsCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
          </div>
          {notifications && (
            <PaginationComponent
              data={notifications}
              total={total}
              setPagination={setPagination}
              limit={pagination.limit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
