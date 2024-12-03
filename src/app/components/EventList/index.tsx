import Image from "next/image";
import { FC } from "react";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faClock,
  faSearch,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EventList: FC = () => {
  return (
    <div className="w-full mx-5">
      <div className="flex justify-between items-center">
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
      <div className="my-5 flex flex-col gap-5">
        <div className="flex gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum">
          <Image
            className="rounded-md w-[45px] h-[45px]"
            src="/images/default-profile.jpg"
            width={45}
            height={45}
            alt="Picture of the author"
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between">
              <div className="font-semibold">Pesta Wibu 2024</div>
              <div className="text-american-green">
                Rp 100.000 - Rp 1.000.000
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
        <div className="flex gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum">
          <Image
            className="rounded-md w-[45px] h-[45px]"
            src="/images/default-profile.jpg"
            width={45}
            height={45}
            alt="Picture of the author"
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between">
              <div className="font-semibold">Pesta Wibu 2024</div>
              <div className="text-american-green">
                Rp 100.000 - Rp 1.000.000
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
        <div className="flex gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum">
          <Image
            className="rounded-md w-[45px] h-[45px]"
            src="/images/default-profile.jpg"
            width={45}
            height={45}
            alt="Picture of the author"
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between">
              <div className="font-semibold">Pesta Wibu 2024</div>
              <div className="text-american-green">
                Rp 100.000 - Rp 1.000.000
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
      </div>
    </div>
  );
};
export default EventList;
