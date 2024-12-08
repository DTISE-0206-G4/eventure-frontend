import { Event } from "@/types/event";
import { Carousel } from "flowbite-react";
import { FC } from "react";

interface EventDescriptionSectionProps {
  event: Event;
}
const EventDescriptionSection: FC<EventDescriptionSectionProps> = ({
  event,
}) => {
  return (
    <div className="w-2/3 bg-white border border-platinum rounded-sm p-5">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-5">
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div>
      <div>
        <div className="font-semibold text-lg">About this event</div>
        <div className="text-justify">{event?.description}</div>
      </div>
    </div>
  );
};
export default EventDescriptionSection;
