"use client";
import Image from "next/image";
import { FC, use, useState } from "react";
import { Button, Carousel, Modal } from "flowbite-react";
import {
  faStar,
  faBuilding,
  faLocationDot,
  faClock,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound } from "next/navigation";
import useEvent from "@/hooks/useEvent";
import { useSession } from "next-auth/react";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import { Ticket } from "@/types/event";
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
  const { isLoading, error, event } = useEvent(parseInt(id, 10));
  const [openModal, setOpenModal] = useState(false);
  const [modalTicket, setModalTicket] = useState<Ticket | null>(null);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleClickTicket = (ticket: Ticket) => {
    setModalTicket(ticket);
    setOpenModal(true);
  };
  //todo add organizer data from get event
  return (
    <div className="container mx-auto min-h-[calc(100vh-150px)]">
      <div className="my-5">
        <div className="font-semibold text-xl">{event?.title}</div>
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
              <div className="text-justify">{event?.description}</div>
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
                {/* <div>Jawa Barat, Bandung</div> */}
                <div>{event?.location}</div>
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
                  <div>: {formatDate(event?.startTime as string)}</div>
                  <div>: {formatDate(event?.endTime as string)}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap items-center justify-center">
              {session?.user?.roles[0] === "ATTENDEE" && (
                <>
                  {event?.tickets.map((ticket) => {
                    if (ticket.availableSeat - ticket.soldSeat > 0) {
                      return (
                        <div
                          onClick={() => {
                            handleClickTicket(ticket);
                          }}
                          key={ticket.id}
                          className="bg-true-blue text-white rounded-lg py-2 px-5 hover:bg-american-green text-center hover:cursor-pointer"
                        >
                          <div className="font-semibold text-lg">
                            {ticket.name}
                          </div>
                          <div>
                            Available : {ticket.availableSeat - ticket.soldSeat}
                          </div>
                          <div>IDR {ticket.price}</div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={ticket.id}
                          className="bg-platinum text-white rounded-lg py-2 px-5 text-center hover:cursor-pointer"
                        >
                          <div className="font-semibold text-lg">
                            {ticket.name}
                          </div>
                          <div>Available : 0</div>
                          <div>IDR {ticket.price}</div>
                        </div>
                      );
                    }
                  })}
                </>
              )}
              {session?.user?.roles[0] === "ORGANIZER" && (
                <div className="bg-platinum text-white rounded-lg py-2 px-5 text-center hover:cursor-pointer">
                  <div className="font-semibold text-lg">
                    Can't buy ticket as Organizer
                  </div>
                </div>
              )}
              {!session && (
                <Link
                  href="/login"
                  className="bg-true-blue text-white rounded-lg py-2 px-5 text-center hover:cursor-pointer"
                >
                  <div className="font-semibold text-lg">
                    Login to buy ticket
                  </div>
                </Link>
              )}
              <Modal
                dismissible
                show={openModal}
                onClose={() => setOpenModal(false)}
                size="5xl"
              >
                <Modal.Header>Buy Ticket</Modal.Header>
                <Modal.Body>
                  <div className="grid grid-cols-3 gap-5">
                    <div>
                      <div className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                        {modalTicket?.name}
                      </div>

                      <div className="space-y-4">
                        {/* Price Section */}
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-medium text-gray-600">
                            Price:
                          </div>
                          <div className="text-lg font-semibold text-gray-900">
                            IDR {modalTicket?.price}
                          </div>
                        </div>

                        {/* Discount Section */}
                        <div className="space-y-1">
                          <div className="text-lg font-medium text-gray-600">
                            Discount:
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-semibold text-slate-gray">
                              Point 10000
                            </div>
                            <div className="text-lg font-semibold text-red-600">
                              IDR -10000
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-semibold text-slate-gray">
                              10%
                            </div>
                            <div className="text-lg font-semibold text-red-600">
                              IDR -10000
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-300 my-4" />

                        {/* Total Section */}
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-medium text-gray-600">
                            Total:
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            IDR 10000
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                        Your Discounts
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="default-search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          Search
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <FontAwesomeIcon
                              className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                              icon={faSearch}
                            />
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            className="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                            required
                          />
                        </div>
                      </div>
                      <div className="overflow-y-scroll space-y-2 h-72">
                        <div className="flex flex-col gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum hover:bg-azureish-white hover:cursor-pointer">
                          <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between">
                              <div className="font-semibold">
                                Referral Discount
                              </div>
                              <div className="text-american-green font-semibold">
                                10000 points
                              </div>
                            </div>
                            <div className="text-sm text-slate-gray">
                              diskon hehe
                            </div>
                            <div className="text-sm text-slate-gray">
                              Code :{" "}
                              <span className="text-american-green font-semibold">
                                TOLOL
                              </span>
                            </div>
                            <div className="text-sm text-slate-gray">
                              Expired : 27 November 2025 at 01:15
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum">
                          <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between">
                              <div className="font-semibold">
                                Referral Discount
                              </div>
                              <div className="text-american-green font-semibold">
                                10000 points
                              </div>
                            </div>
                            <div className="text-sm text-slate-gray">
                              diskon hehe
                            </div>
                            <div className="text-sm text-slate-gray">
                              Code :{" "}
                              <span className="text-american-green font-semibold">
                                TOLOL
                              </span>
                            </div>
                            <div className="text-sm text-slate-gray">
                              Expired : 27 November 2025 at 01:15
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum">
                          <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between">
                              <div className="font-semibold">
                                Referral Discount
                              </div>
                              <div className="text-american-green font-semibold">
                                10000 points
                              </div>
                            </div>
                            <div className="text-sm text-slate-gray">
                              diskon hehe
                            </div>
                            <div className="text-sm text-slate-gray">
                              Code :{" "}
                              <span className="text-american-green font-semibold">
                                TOLOL
                              </span>
                            </div>
                            <div className="text-sm text-slate-gray">
                              Expired : 27 November 2025 at 01:15
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                        Event Discounts
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="default-search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          Search
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <FontAwesomeIcon
                              className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                              icon={faSearch}
                            />
                          </div>
                          <input
                            type="search"
                            id="default-search"
                            className="block w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                            required
                          />
                        </div>
                      </div>
                      <div className="overflow-y-scroll space-y-2 h-72">
                        <div className="flex flex-col gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum hover:bg-azureish-white hover:cursor-pointer">
                          <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between">
                              <div className="font-semibold">Diskon Wibu</div>
                              <div className="text-american-green font-semibold">
                                10 %
                              </div>
                            </div>
                            <div className="text-sm text-slate-gray">
                              yang ngaku wibu diskon 10 %
                            </div>
                            <div className="text-sm text-slate-gray">
                              Code :{" "}
                              <span className="text-american-green font-semibold">
                                AKUWIBU2024_2
                              </span>
                            </div>
                            <div className="text-sm text-slate-gray">
                              Available : 10
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {modalTicket?.name} {modalTicket?.price}
                    </p>
                  </div> */}
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setOpenModal(false)}>I accept</Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Decline
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
