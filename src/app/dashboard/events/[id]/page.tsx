"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import axiosInstance from "@/lib/axiosInstance";
import { Event } from "@/common/constants";
import { EventCardMain, EventCardPreview } from "@/components/ui/EventCard";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const fetchEvent = async (id: string): Promise<Event> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/events/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Dashboard() {
  const { events: eventRecommendations } = useSelector(
    (state: RootState) => state.recommendations
  );
  const params = useParams();
  const id = params?.id;

  const {
    data: event,
    error,
    isLoading,
  } = useQuery<Event, Error>({
    queryKey: ["events", id],
    queryFn: () => fetchEvent(id as string),
  });

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex space-x-5 p-6">
        <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg">
          <div className="w-full">
            {event && (
              <EventCardMain
                id={event.id}
                banner={
                  "https://nwanguma.github.io/Quick-host/test-event-5.jpg"
                }
                title={event.title}
                location="London, England"
                event_start_date={event.event_start_date}
                event_end_date={event.event_end_date}
                description={event.description}
                like_count={0}
                comment_count={event.comments}
                owner={event.owner}
              />
            )}
          </div>
        </div>
        <aside className="w-1/3 space-y-5">
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-app-medium mb-3 text-gray-700">
              Upcoming events
            </h3>
            <div className="space-y-4">
              {eventRecommendations &&
                eventRecommendations.slice(0, 4).map((event) => {
                  return (
                    <div
                      key={event.id}
                      className="border-b border-b-gray-200 py-3"
                    >
                      <EventCardPreview
                        id={event.id}
                        banner={event.banner}
                        title={event.title}
                        location={event.location as string}
                        event_start_date={event.event_start_date}
                        isPreview
                      />
                    </div>
                  );
                })}
              <div className="space-x-4">
                <div className="flex items-center space-x-5">
                  <div className="max-w-20">
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-xs text-custom-gray-paragraph">
                        Mon
                      </span>
                      <span className="text-lg font-bold text-gray-900">4</span>
                      <span className="text-xs text-custom-gray-paragraph">
                        April
                      </span>
                    </div>
                  </div>
                  <div className="w-1/3 h-20 relative rounded-lg">
                    <Image
                      src="/images/test-event-3.jpg"
                      alt="avatar"
                      className="rounded-lg"
                      layout="fill"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">A futuristic tech event</span>
                    <span className="text-xs text-custom-gray-paragraph">
                      London, England
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
