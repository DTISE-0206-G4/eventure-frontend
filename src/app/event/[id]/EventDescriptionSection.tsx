import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";

interface EventDescriptionSectionProps {
  event: Event;
}
const EventDescriptionSection: FC<EventDescriptionSectionProps> = ({
  event,
}) => {
  return (
    <>
      <div className="lg:w-2/3 bg-white border border-platinum rounded-sm p-5">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-5">
          <div className="relative w-full h-full">
            <Image
              className="object-contain"
              src={
                event.imageUrl
                  ? event.imageUrl
                  : "https://flowbite.com/docs/images/carousel/carousel-1.svg"
              }
              fill
              alt="Event Image"
            />
          </div>
        </div>
        <div>
          <div className="font-semibold text-lg">About this event</div>
          <div className="text-justify">{event?.description}</div>
        </div>
      </div>
    </>
  );
};
export default EventDescriptionSection;
