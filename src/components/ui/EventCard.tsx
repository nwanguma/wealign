import Image from "next/image";
import Link from "next/link";

import { Event } from "@/common/constants";
import { truncateString, formatDateShort } from "@/lib/helpers";
import { FormatDateOptionsEnum } from "@/lib/helpers/constants";

interface IEventCardPreviewProps {
  event: Partial<Event>;
  isPreview?: boolean;
}

export const EventCardPreview: React.FC<IEventCardPreviewProps> = ({
  isPreview,
  event,
}) => {
  const {
    id,
    banner,
    title,
    location,
    description,
    event_start_date,
    comments,
    reactions,
  } = event;

  const { dayOfWeek, day, month } = formatDateShort(
    event_start_date as string,
    {
      monthType: FormatDateOptionsEnum.SHORT,
      weekdayType: FormatDateOptionsEnum.SHORT,
    }
  );

  return (
    <div className="space-x-4 h-full relative">
      <Link href={`/dashboard/events/${id}`}>
        <div className="h-full flex items-center space-x-5">
          <div className="max-w-20">
            <div className="flex flex-col justify-center items-center">
              <span className="text-xs text-custom-gray-paragraph">
                {dayOfWeek}
              </span>
              <span className="text-lg font-app-medium text-custom-gray-heading">
                {day}
              </span>
              <span className="text-xs text-custom-gray-paragraph">
                {month}
              </span>
            </div>
          </div>
          <div className="w-1/3 h-full min-h-20 relative rounded-lg">
            <Image
              src={banner || `/images/test-event-2.jpg`}
              alt="avatar"
              className="rounded-lg"
              layout="fill"
            />
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <div className="flex flex-col space-y-2 py-2">
              <div className="flex flex-col">
                <span className="font-app-medium">
                  {truncateString(title as string, 25)}
                </span>
                <span className="text-xs text-custom-gray-paragraph">
                  {location}
                </span>
              </div>
              <span className="text-sm text-custom-gray-paragraph font-light leading-snug">
                {truncateString(description as string, 70)}
              </span>
            </div>
            {!isPreview && (
              <div className="absolute bottom-0 right-0 flex items-center space-x-3 text-xs text-gray-600">
                {!!comments?.length && (
                  <span className="underline">
                    <span>{comments?.length} Comments</span>
                  </span>
                )}
                {!!reactions && (
                  <span className="underline">
                    <span>{reactions?.length} Likes</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
