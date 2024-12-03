import Image from "next/image";
import { FC } from "react";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EventList: FC = () => {
  return (
    <div className="w-full">
      <div className="flex gap-5 items-center bg-white rounded-md w-full mx-5 p-5 border border-platinum">
        <Image
          className="rounded-md w-[45px] h-[45px]"
          src="/images/default-profile.jpg"
          width={45}
          height={45}
          alt="Picture of the author"
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="font-semibold">Pesta Wibu 2024</div>
          <div className="flex justify-between">
            <div className="flex gap-5">
              <div className="flex gap-2">
                <FontAwesomeIcon
                  className="w-[20px] h-[20px] shrink-0 text-slate-gray"
                  icon={faLocationDot}
                />
                <div className="text-sm text-slate-gray">
                  Jawa Barat, Bandung
                </div>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon
                  className="w-[20px] h-[20px] shrink-0 text-slate-gray"
                  icon={faClock}
                />
                <div className="text-sm text-slate-gray">
                  29 January 2025 19:00 WIB
                </div>
              </div>
            </div>

            <div>categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventList;
