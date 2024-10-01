"use client";

import { useState } from "react";
import AppModal from "@/components/ui/Modal";
import { useQuery } from "@tanstack/react-query";

import FilterComponent from "@/components/ui/Filter";
import AddItemButton from "@/components/ui/AddItemButton";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import AddEventForm from "@/components/forms/CreateEventForm";
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
            title="Discover Events to Connect and Collaborate with Top Talent"
            description="Explore events where innovators, creators, and skilled professionals come together. Whether you're seeking collaboration opportunities or looking to grow your network, find the perfect event to connect with individuals who share your vision and expertise."
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
