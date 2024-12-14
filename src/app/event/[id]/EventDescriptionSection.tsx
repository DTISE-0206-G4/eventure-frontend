import { Event } from "@/types/event";
import { Carousel } from "flowbite-react";
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
          <Carousel>
            <div className="relative w-full h-full">
              <Image
                src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                alt="Carousel 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-full">
              <Image
                src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                alt="Carousel 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-full">
              <Image
                src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                alt="Carousel 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-full">
              <Image
                src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                alt="Carousel 4"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-full">
              <Image
                src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                alt="Carousel 5"
                fill
                className="object-cover"
              />
            </div>
          </Carousel>
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
