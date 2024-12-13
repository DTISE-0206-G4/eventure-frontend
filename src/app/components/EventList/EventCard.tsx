import Image from "next/image";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";
import { Event } from "@/types/event";
import formatDate from "@/utils/formatDate";

interface EventCardProps {
  event: Event;
  handleClick: (eventId: number) => void;
}

const EventCard: FC<EventCardProps> = ({ event, handleClick }) => {
  const ticketPriceRange = event.tickets.reduce(
    (range, ticket) => {
      return {
        min: Math.min(range.min, ticket.price),
        max: Math.max(range.max, ticket.price),
      };
    },
    { min: Infinity, max: -Infinity }
  );
  return (
    <div
      key={event.id}
      onClick={() => {
        handleClick(event.id);
      }}
      className={`flex gap-5 items-center ${
        event.endTime < new Date().toISOString() ? "bg-platinum" : "bg-white"
      } rounded-md w-full p-5 border border-platinum hover:cursor-pointer hover:bg-azureish-white`}
    >
      <Image
        className="rounded-md w-[100px] h-[50px] object-cover"
        src="/images/carousel-1.svg"
        width={50}
        height={100}
        alt="Event Image"
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <div className="font-semibold">{event.title}</div>
          <div className="text-american-green">
            {event.endTime < new Date().toISOString() ? (
              <div>Event has ended</div>
            ) : (
              <>
                {event.tickets.length > 0 ? (
                  <>
                    IDR {ticketPriceRange.min} - IDR {ticketPriceRange.max}
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>

        <div className="flex max-md:flex-col max-md:gap-2 md:justify-between">
          <div className="flex max-md:flex-col max-md:gap-2 gap-5">
            <div className="flex gap-2">
              <FontAwesomeIcon
                className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                icon={faLocationDot}
              />
              <div className="text-sm text-slate-gray">{event.location}</div>
            </div>
            <div className="flex gap-2">
              <FontAwesomeIcon
                className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                icon={faClock}
              />
              <div className="text-sm text-slate-gray">
                {formatDate(event.startTime)} - {formatDate(event.endTime)}
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap flex-row-reverse">
            {event.categories.map((category) => (
              <div
                key={category.id}
                className="text-slate-gray rounded-full px-2 border border-slate-gray"
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
