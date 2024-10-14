"use client";

import { useState } from "react";
import AppModal from "@/components/ui/Modal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import ContentWrapper from "@/components/ui/ContentWrapper";
import FilterComponent from "@/components/ui/Filter";
import AddItemButton from "@/components/ui/AddItemButton";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import AddEventForm from "@/components/forms/CreateEventForm";
import { EventCardPreview } from "@/components/ui/EventCard";
import { Event } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import { EventWithPagination } from "@/common/constants";
import PaginationComponent from "@/components/ui/PaginationComponent";

export interface IPagination {
  page: number;
  limit: number;
}

export interface IFilters {
  skills?: string[] | string;
  status?: string;
  keyword?: string;
  is_mentor?: undefined | boolean;
  order?: string;
  sortBy?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  type?: string;
  createdAt?: string | Date;
}

const fetchEvents = async (
  pagination: IPagination,
  filters: IFilters
): Promise<EventWithPagination> => {
  try {
    const { type, ...rest } = filters;

    const response = await axiosInstance.get("/api/proxy/events", {
      params: {
        contentType: "all",
        ...pagination,
        ...rest,
        eventType: type,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Events() {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    startDate: "",
    endDate: "",
    order: "DESC",
    sortBy: "",
  });

  const {
    data: eventsData,
    error,
    isLoading,
    refetch,
  } = useQuery<EventWithPagination, Error>({
    queryKey: ["events", pagination],
    queryFn: () => fetchEvents(pagination, filters as IFilters),
    placeholderData: keepPreviousData,
  });

  let events;
  let total = 0;

  if (eventsData) {
    const { page, perPage, total: pageTotal, totalPages, data } = eventsData;
    events = eventsData.data;
    total = pageTotal;
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
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              triggerRefetch={refetch}
              options={{
                typeOptions: [
                  { value: "onsite", label: "Onsite" },
                  {
                    value: "hybrid",
                    label: "Hybrid",
                  },
                  {
                    value: "virtual",
                    label: "Virtual",
                  },
                ],
                sortByOptions: [
                  {
                    value: "start_date",
                    label: "Start Date",
                  },
                  { value: "views", label: "Views" },
                ],
              }}
            />
            <ContentWrapper data={events as Event[]}>
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
            </ContentWrapper>
            {eventsData && events && (
              <PaginationComponent
                data={events}
                total={total}
                setPagination={setPagination}
                limit={pagination.limit}
              />
            )}
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
