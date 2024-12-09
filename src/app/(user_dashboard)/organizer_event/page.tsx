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

interface IEventToDelete {
  id: number;
  name: string;
}

interface IEventToRelease {
  id: number;
  name: string;
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

  const handleDeleteClick = (event: IEventToDelete) => {
    setEventToDelete(event);
    setIsModalOpen(true);
  };

  const handleReleaseClick = (event: IEventToRelease) => {
    setEventToRelease(event);
    setIsReleaseModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting event: ${eventToDelete}`);
    setIsModalOpen(false);
  };

  const handleConfirmRelease = () => {
    if (eventToRelease) {
      console.log(`Releasing event: ${eventToRelease.name}`);
      setIsReleaseModalOpen(false);
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="font-semibold text-xl">My Events</div>
        <button className="bg-true-blue rounded-lg py-2 px-5 text-white flex gap-2">
          <FontAwesomeIcon
            className="w-[25px] h-[25px] shrink-0 text-white"
            icon={faPlus}
          />
          <div>Add Event</div>
        </button>
      </div>

      <div className="flex justify-between items-center mt-5">
        <div>
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
        <div>
          <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <FontAwesomeIcon
                    className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                    icon={faChevronLeft}
                  />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  3
                </a>
              </li>

              <li>
                <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  ...
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  10
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <FontAwesomeIcon
                    className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                    icon={faChevronRight}
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <div className="flex flex-col gap-5 bg-white rounded-md w-full p-5 border border-platinum">
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
                  <button className="bg-american-green rounded-lg py-2 px-5 text-white">
                    Edit
                  </button>
                  <button
                    className="border border-red-500 rounded-lg py-2 px-5 text-red-500"
                    onClick={() =>
                      handleDeleteClick({ id: 1, name: "Pesta Wibu 2024" })
                    }
                  >
                    Delete
                  </button>
                  <button className="bg-true-blue rounded-lg py-2 px-5 text-white">
                    Reviews
                  </button>
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

                <div className="flex gap-2 flex-wrap flex-row-reverse">
                  <div className="text-slate-gray rounded-full px-2 border border-slate-gray">
                    Offline
                  </div>
                  <div className="text-slate-gray rounded-full px-2 border border-slate-gray">
                    Concert
                  </div>
                  <div className="text-slate-gray rounded-full px-2 border border-slate-gray">
                    MeetNGreet
                  </div>
                  <div className="text-slate-gray rounded-full px-2 border border-slate-gray">
                    Exhibition
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="border border-platinum rounded-lg py-2 px-5 text-center">
              <div className="font-semibold text-lg">Regular</div>
              <div>Available : 10</div>
              <div>Sold: 25</div>
              <div>Rp. 50.000</div>
              <div className="flex gap-2 mt-2">
                <button className="bg-american-green rounded-lg py-2 px-5 text-white">
                  Edit
                </button>
                <button
                  className="bg-true-blue rounded-lg py-2 px-5 text-white"
                  onClick={() =>
                    handleReleaseClick({ id: 1, name: "Pesta Wibu 2024" })
                  }
                >
                  Release
                </button>
                <button className="border border-red-500 rounded-lg py-2 px-5 text-red-500">
                  Close
                </button>
              </div>
            </div>
            <div className="border border-platinum rounded-lg py-2 px-5 text-center">
              <div className="font-semibold text-lg">VIP</div>
              <div>Available : 10</div>
              <div>Sold: 25</div>
              <div>Rp. 100.000</div>
              <div className="flex gap-2 mt-2">
                <button className="bg-azureish-white rounded-lg py-2 px-5 text-slate-gray">
                  Edit
                </button>
                <button className="bg-azureish-white rounded-lg py-2 px-5 text-slate-gray">
                  Released
                </button>
                <button className="bg-azureish-white rounded-lg py-2 px-5 text-slate-gray">
                  Closed
                </button>
              </div>
            </div>
            <div className="py-2 px-5 text-center flex items-center">
              <button className="bg-true-blue rounded-lg p-5 text-white flex gap-2">
                <FontAwesomeIcon
                  className="w-[25px] h-[25px] shrink-0 text-white"
                  icon={faPlus}
                />
                <div>Add Ticket</div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 bg-white rounded-md w-full p-5 border border-platinum">
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
                  <button className="bg-azureish-white rounded-lg py-2 px-5 text-slate-gray">
                    Edit
                  </button>
                  <button className="bg-azureish-white rounded-lg py-2 px-5 text-slate-gray">
                    Delete
                  </button>
                  <button className="bg-true-blue rounded-lg py-2 px-5 text-white">
                    Reviews
                  </button>
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

                <div className="flex gap-2 flex-wrap flex-row-reverse">
                  <div className="text-slate-gray rounded-full px-2 border border-slate-gray">
                    Offline
                  </div>
                  <div className="text-slate-gray rounded-full px-2 border border-slate-gray">
                    Concert
                  </div>
                  <div className="text-slate-gray rounded-full px-2 border border-slate-gray">
                    MeetNGreet
                  </div>
                  <div className="text-slate-gray rounded-full px-2 border border-slate-gray">
                    Exhibition
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="py-2 px-5 text-center flex items-center">
              <button className="bg-true-blue rounded-lg p-5 text-white flex gap-2">
                <FontAwesomeIcon
                  className="w-[25px] h-[25px] shrink-0 text-white"
                  icon={faPlus}
                />
                <div>Add Ticket</div>
              </button>
            </div>
          </div>
        </div>

        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Header>Delete Event</Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete the event &quot;
              {eventToDelete?.name}&quot;?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="bg-gray-500 text-white rounded-lg px-4 py-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white rounded-lg px-4 py-2"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={isReleaseModalOpen}
          onClose={() => setIsReleaseModalOpen(false)}
        >
          <Modal.Header>Release Event</Modal.Header>
          <Modal.Body>
            {eventToRelease && (
              <p>
                Are you sure you want to release the event &quot;
                {eventToRelease?.name}&quot;?
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="bg-gray-500 text-white rounded-lg px-4 py-2"
              onClick={() => setIsReleaseModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white rounded-lg px-4 py-2"
              onClick={handleConfirmRelease}
            >
              Release
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default OrganizerEventPage;
