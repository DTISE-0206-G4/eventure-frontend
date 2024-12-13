"use client";
import { FC, useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faClock,
  faLocationDot,
  faSearch,
  faUpRightFromSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Modal } from "flowbite-react";
import Link from "next/link";
import TicketCard from "./TicketCard";
import useEventsListOrg from "@/hooks/useEventListOrg";
import { useRouter } from "next/router";
import { Event, EventDatatableRequest } from "@/types/event";

interface IEventToDelete {
  id: number;
  name: string;
}

interface IEventToRelease {
  id: number;
  name: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <div 
      className="flex gap-5 items-center" 
      key={event.id}
    >
    <Image
      className="rounded-md w-[100px] h-[50px] object-cover border-2 border-red-600"
      src="/images/carousel-1.svg"
      width={50}
      height={100}
      alt="Picture of the author"
    />
    <div className="flex flex-col gap-2 w-full border-2 border-red-600">
      <div className="flex justify-between">
        <div className="font-semibold">{event.title}</div>
      </div>
    </div>
  </div>
  )
}

const OrganizerEventPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<IEventToDelete | null>(
    null
  );
  const [eventToRelease, setEventToRelease] = useState<IEventToRelease | null>(
    null
  );

  const {
    isLoading,
    error,
    data: eventsData,
    setParams,
  } = useEventsListOrg();

  // const router = useRouter();
  if (error && !eventsData) return <div>Error</div>;
  if (isLoading || !eventsData) return <div>Loading...</div>;
  

  
  return (
    <>
      <div className="flex justify-between">
        <div className="font-semibold text-xl">My Events</div>
        <Link href="/organizer_event/add_event">
          <button className="bg-true-blue rounded-lg py-2 px-5 text-white flex gap-2">
            <FontAwesomeIcon
              className="w-[25px] h-[25px] shrink-0 text-white"
              icon={faPlus}
            />
            <div>Add Event</div>
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-5 bg-white rounded-md w-full p-5 border border-platinum">

        {eventsData?.data.map((event: Event) => (
          <EventCard key={event.id} event={event}  />
        ))}
      </div>
        {/* <div className="flex gap-5 items-center">
          <Image
              className="rounded-md w-[100px] h-[50px] object-cover border-2 border-red-600"
              src="/images/carousel-1.svg"
              width={50}
              height={100}
              alt="Picture of the author"
            />
            <div className="flex flex-col gap-2 w-full border-2 border-red-600">
              <div className="flex justify-between">
                <div className="font-semibold">Pesta Wibu 2024</div>
              </div>
            </div>
        </div> */}
        {/* <div className="flex gap-5 items-center">
          <Image
              className="rounded-md w-[100px] h-[50px] object-cover border-2 border-red-600"
              src="/images/carousel-1.svg"
              width={50}
              height={100}
              alt="Picture of the author"
            />
            <div className="flex flex-col gap-2 w-full border-2 border-red-600">
              <div className="flex justify-between">
                <div className="font-semibold">Pesta Wibu 2024</div>
              </div>
            </div>
          </div>
          {/* Ticket List Container */}
          <div className="flex gap-5 flex-wrap">
            <TicketCard 
              title="Regular"
              available={10}
              sold={25}
              price="Rp. 50.000"
              onEdit={() => console.log("edit")}
              onRelease={() => console.log("release")}
              onClose={() => console.log("close")}
            />
            <TicketCard 
              title="VIP"
              available={10}
              sold={25}
              price="Rp. 100.000"
              onEdit={() => console.log("edit VIP")}
              onRelease={() => console.log("release VIP")}
              onClose={() => console.log("close VIP")}
            />
          </div>
        </div>

        {/* <div className="flex flex-col gap-5 bg-white rounded-md w-full p-5 border border-platinum">
          <div className="flex gap-5 items-center">
            <Image
              className="rounded-md w-[100px] h-[50px] object-cover"
              src="/images/carousel-1.svg"
              width={50}
              height={100}
              alt="Picture of the author"
            />
            <div className="flex flex-col gap-2 w-full">
              
              
              <div className="flex justify-between">
                <div className="font-semibold">Pesta Wibu 2024</div>
                <div className="flex gap-2">
                  <button className="bg-azureish-white rounded-lg py-2 px-5  flex gap-2 items-center">
                    <div>Event page</div>
                    <FontAwesomeIcon
                      className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                      icon={faUpRightFromSquare}
                    />
                  </button>
                </div>
              </div>
              
              
              <div className="flex justify-between">
                <div className="flex gap-5">
                  
                  
                  <div className="flex gap-2">
                    <FontAwesomeIcon
                      className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                      icon={faLocationDot}
                    />
                    <div className="text-sm text-slate-gray">
                      Jawa Barat, Bandung
                    </div>
                  </div>
                  
                  
                  <div className="flex gap-2">
                    <FontAwesomeIcon
                      className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                      icon={faClock}
                    />
                    <div className="text-sm text-slate-gray">
                      29 January 2025 19:00 WIB
                    </div>
                  </div>



                </div>
              </div>
            </div>
          </div>
          
        </div> */}

      
      
    </>
  );
};
export default OrganizerEventPage;
