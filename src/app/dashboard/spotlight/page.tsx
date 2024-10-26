"use client";

import { useState } from "react";
import AppModal from "@/components/ui/Modal";
import { useQuery } from "@tanstack/react-query";

import FilterComponent from "@/components/ui/Filter";
import AddItemButton from "@/components/ui/AddItemButton";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import AddEventForm from "@/components/forms/EventForm";
import { EventCardPreview } from "@/components/ui/EventCard";
import { Event } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import { EventWithPagination } from "@/common/constants";

const fetchEvents = async (): Promise<EventWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/events", {
      params: {
        contentType: "all",
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Events() {
  const {
    data: eventsData,
    error,
    isLoading,
  } = useQuery<EventWithPagination, Error>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  let events;

  if (eventsData) {
    const { page, perPage, total, totalPages, data } = eventsData;
    events = eventsData.data;
  }

  const [addEventModalIsOpen, setAddEventModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddEventModal = () => {
    setAddEventModalIsOpen(!addEventModalIsOpen);
  };

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="min-h-screen px-5 md:px-10 lg:px-20">
          <DashboardPageHeader
            title="Spotlight on Emerging Talent and Projects"
            description="Discover standout individuals, projects and events making waves in the industry. From groundbreaking ideas to inspiring professionals, explore the spotlight to learn more about the talent shaping the future of collaboration. Stay updated with the latest trends and gain insights from top innovators and creators."
          />

          <div className="py-5 flex flex-col space-y-5 w-full">
            <FilterComponent />
            <div className="w-full grid grid-cols-2 gap-5">
              {eventsData &&
                events?.map((event: Event) => (
                  <div
                    key={event.id}
                    className="w-full border border-gray-300 rounded-lg p-4 h-48"
                  >
                    <EventCardPreview
                      id={event.id}
                      banner={event.banner}
                      title={event.title}
                      location={event.location as string}
                      event_start_date={event.event_start_date}
                      description={event.description}
                      comment_count={event.comments?.length}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <AppModal
        title="Create event"
        isOpen={addEventModalIsOpen}
        onClose={() => handleToggleAddEventModal()}
        width="w-5/12"
      >
        <AddEventForm />
      </AppModal>
    </div>
  );
}
