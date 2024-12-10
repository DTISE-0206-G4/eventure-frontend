import { Event } from "@/types/event";
import formatDate from "@/utils/formatDate";
import {
  faBuilding,
  faClock,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC } from "react";

interface EventDetailsSectionProps {
  event: Event;
}
const EventDetailsSection: FC<EventDetailsSectionProps> = ({ event }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon
            className="h-5 w-5 text-slate-gray"
            icon={faBuilding}
          />
          <div className="font-semibold text-lg">Organized by</div>
        </div>

        <div className="flex gap-2 items-center justify-start">
          <Image
            className="rounded-full"
            src="/images/default-profile.jpg"
            width={45}
            height={45}
            alt="User Profile"
          />
          <div className="flex flex-col justify-center">
            <div>{event.user.name}</div>
            <div className="flex gap-1">
              <FontAwesomeIcon
                className="h-5 w-5 text-yellow-300"
                icon={faStar}
              />{" "}
              <div>4.7</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon
            className="h-5 w-5 text-slate-gray"
            icon={faLocationDot}
          />
          <div className="font-semibold text-lg">Location</div>
        </div>
        <div>
          {/* <div>Jawa Barat, Bandung</div> */}
          <div>{event?.location}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon className="h-5 w-5 text-slate-gray" icon={faClock} />
          <div className="font-semibold text-lg">Time</div>
        </div>
        <div className="flex gap-2">
          <div>
            <div>Start </div>
            <div>End </div>
          </div>
          <div>
            <div>: {formatDate(event?.startTime as string)}</div>
            <div>: {formatDate(event?.endTime as string)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsSection;
