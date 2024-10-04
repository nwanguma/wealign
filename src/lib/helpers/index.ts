import { DateInfo, FormatDateOptions } from "./constants";

export const formatDateShort = (
  dateString: string,
  { monthType, weekdayType }: FormatDateOptions
): DateInfo => {
  const date = new Date(dateString);

  const dayOfWeek = date.toLocaleString("en-US", { weekday: weekdayType });
  const day = date.getDate().toString();
  const month = date.toLocaleString("en-US", { month: monthType });

  return { dayOfWeek, day, month };
};

export const truncateString = (str: string, maxLength: number): string => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const timeIntervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (diffInSeconds >= timeIntervals.year) {
    const years = Math.floor(diffInSeconds / timeIntervals.year);
    return years > 1 ? `${years} years ago` : "1 year ago";
  } else if (diffInSeconds >= timeIntervals.month) {
    const months = Math.floor(diffInSeconds / timeIntervals.month);
    return months > 1 ? `${months} months ago` : "1 month ago";
  } else if (diffInSeconds >= timeIntervals.day) {
    const days = Math.floor(diffInSeconds / timeIntervals.day);
    return days > 1 ? `${days} days ago` : "1 day ago";
  } else if (diffInSeconds >= timeIntervals.hour) {
    const hours = Math.floor(diffInSeconds / timeIntervals.hour);
    return hours > 1 ? `${hours} hours ago` : "1 hour ago";
  } else if (diffInSeconds >= timeIntervals.minute) {
    const minutes = Math.floor(diffInSeconds / timeIntervals.minute);
    return minutes > 1 ? `${minutes} mins ago` : "1 min ago";
  } else {
    return "Just now";
  }
};

export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
  const day = date.getDate();
  const suffix = ["th", "st", "nd", "rd"][day % 10 < 4 ? day % 10 : 0] || "th";
  const dayWithSuffix = `${day}${suffix}`;
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const time = `${hour12}:${minutes}${ampm}`;

  return `${dayOfWeek}, ${dayWithSuffix} ${month}, ${year} ${time}`;
};

export const getFilenameAndExtension = (url: string): string => {
  const pathname = new URL(url).pathname;
  const filenameWithExt = pathname.substring(pathname.lastIndexOf("/") + 1);
  const dotIndex = filenameWithExt.lastIndexOf(".");
  const filename = filenameWithExt.substring(0, dotIndex);
  const extension = filenameWithExt.substring(dotIndex + 1);

  return filename + "." + extension;
};
