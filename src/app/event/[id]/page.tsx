"use client";
import Image from "next/image";
import { FC, use, useEffect, useState } from "react";
import { Button, Carousel, Modal } from "flowbite-react";
import {
  faStar,
  faBuilding,
  faLocationDot,
  faClock,
  faSearch,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";
import useEvent from "@/hooks/useEvent";
import { useSession } from "next-auth/react";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import { Ticket } from "@/types/event";
import axios from "axios";
import useUserDiscounts from "@/hooks/useUserDiscounts";
import { UserDiscountRespond } from "@/types/userDiscountType";
import useEventDiscounts from "@/hooks/useEventDiscounts";
import { EventDiscountRespond } from "@/types/eventDiscountType";
import EventDescriptionSection from "./EventDescriptionSection";
import EventDetailsSection from "./EventDetailsSection";
import TicketSection from "./TicketSection";
interface PageProps {
  params: Promise<{ id: string }>; // params is a Promise<{ id: string }>
}
const EventPage: FC<PageProps> = ({ params }) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  if (!id) {
    notFound(); // Redirects to the 404 page
  }
  const { data: session } = useSession();
  const {
    isLoading: isLoadingEvent,
    error: errorEvent,
    event,
  } = useEvent(parseInt(id, 10));
  if (isLoadingEvent) return <div>Loading...</div>;
  if (errorEvent) return <div>Error: {errorEvent.message}</div>;

  //todo add organizer data from get event
  return (
    <div className="container mx-auto min-h-[calc(100vh-150px)]">
      <div className="my-5">
        <div className="font-semibold text-xl">{event?.title}</div>
        <div className="flex gap-5 justify-between mt-5 items-start">
          {event && <EventDescriptionSection event={event} />}
          <div className="w-1/3 bg-white border border-platinum rounded-sm p-5 flex flex-col gap-5">
            {event && (
              <>
                <EventDetailsSection event={event} />
                <TicketSection event={event} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
