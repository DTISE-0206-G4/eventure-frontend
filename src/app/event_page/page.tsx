"use client";
import Image from "next/image";
import { FC } from "react";
import { Carousel } from "flowbite-react";
import {
  faStar,
  faBuilding,
  faLocationDot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EventPage: FC = () => {
  return (
    <div className="container mx-auto min-h-[calc(100vh-150px)]">
      <div className="my-5">
        <div className="font-semibold text-xl">Pesta Wibu 2024</div>
        <div className="flex gap-5 justify-between mt-5 items-start">
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
              <div className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                perspiciatis commodi est, aliquid temporibus accusamus molestias
                exercitationem quae, minus cumque quo recusandae tenetur
                repellat ad id veritatis soluta voluptatum ut! Temporibus
                tenetur excepturi nam nulla similique laboriosam pariatur qui
                architecto, ut accusamus odit amet! Neque ipsam enim cumque eum
                architecto nemo, at officiis beatae ipsum veritatis nam incidunt
                temporibus praesentium minus mollitia facilis laboriosam
                repellendus excepturi dolorem laudantium. Optio soluta
                architecto a quae! Eos quisquam eveniet odit aliquid dicta,
                temporibus sint molestiae reiciendis id ab voluptates amet
                velit. Ipsam accusantium assumenda laboriosam laborum veniam
                corrupti quae adipisci laudantium reiciendis enim!
              </div>
            </div>
          </div>
          <div className="w-1/3 bg-white border border-platinum rounded-sm p-5 flex flex-col gap-5">
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
                  <div>Gora Asep</div>
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
                <div>Jawa Barat, Bandung</div>
                <div>Jl. Raya Bandung No. 1, Gedung ABC</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  className="h-5 w-5 text-slate-gray"
                  icon={faClock}
                />
                <div className="font-semibold text-lg">Time</div>
              </div>
              <div className="flex gap-2">
                <div>
                  <div>Start </div>
                  <div>End </div>
                </div>
                <div>
                  <div>: 29 January 2025 19:00 WIB</div>
                  <div>: 29 January 2025 22:00 WIB</div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap items-center justify-center">
              <div className="bg-true-blue text-white rounded-lg py-2 px-5 hover:bg-american-green text-center hover:cursor-pointer">
                <div className="font-semibold text-lg">Regular</div>
                <div>Available : 10</div>
                <div>Rp. 50.000</div>
              </div>
              <div className="bg-platinum text-white rounded-lg py-2 px-5 text-center hover:cursor-pointer">
                <div className="font-semibold text-lg">VIP</div>
                <div>Available : 0</div>
                <div>Rp. 100.000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
