"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import { Event } from "@/common/constants";
import { EventCardMain } from "@/components/ui/EventCardMain";
import { EventCardPreview } from "@/components/ui/EventCard";
import { RootState } from "@/store";
import { useState } from "react";
import AppModal from "@/components/ui/Modal";
import AddEventForm from "@/components/forms/CreateEventForm";
import {
  SkeletonCard,
  SkeletonLoaderPage,
} from "@/components/ui/SkeletonLoader";
import { fetchEvent, deleteEvent } from "@/api";

export default function Dashboard() {
  const { recommendations, user } = useSelector((state: RootState) => ({
    recommendations: state.recommendations,
    user: state.user,
  }));
  const { isLoading: isRecommendationsLoading, events: eventRecommendations } =
    recommendations;
  const params = useParams();
  const id = params?.id;

  const {
    refetch,
    data: event,
    error,
    isLoading,
  } = useQuery<Event, Error>({
    queryKey: ["events", id],
    queryFn: () => fetchEvent(id as string),
  });

  const isOwner = user?.profile?.id === event?.owner?.id;
  const deleteMutation = useMutation({
    mutationFn: (eventId: string) => deleteEvent(eventId),
    onSuccess: () => {},
    onError: (error: any) => {},
  });

  const [addEventModalIsOpen, setAddEventModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddEventModal = () => {
    setAddEventModalIsOpen(!addEventModalIsOpen);
  };

  const handleDelete = (eventId: string) => {
    deleteMutation.mutate(eventId);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex space-x-5 p-6">
        <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg relative">
          {isLoading && <SkeletonLoaderPage />}
          {!isLoading && event && (
            <div className="w-full">
              <EventCardMain
                event={event}
                isOwner={isOwner}
                toggleModal={handleToggleAddEventModal}
                triggerRefetch={refetch}
              />
              {event && isOwner && (
                <div
                  className="w-full text-center cursor-pointer"
                  onClick={() => handleDelete(event.id)}
                >
                  <span className="inline-block rounded text-xs text-red-500 bg-red-50 px-3 py-2">
                    Delete this event
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <aside className="w-1/3 space-y-5">
          {isRecommendationsLoading && <SkeletonCard />}
          {!isRecommendationsLoading && (
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
                        <EventCardPreview event={event} isPreview />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </aside>
      </div>
      <AppModal
        title="Create event"
        isOpen={addEventModalIsOpen}
        onClose={() => handleToggleAddEventModal()}
        width="w-5/12"
      >
        <AddEventForm
          data={event as Event}
          handleModalClose={handleToggleAddEventModal}
          triggerRefetch={refetch}
        />
      </AppModal>
    </div>
  );
}
