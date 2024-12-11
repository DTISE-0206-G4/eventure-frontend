import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faPlus, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import TicketCard from "../TicketCard";

interface EventCardProps {
  event: {
    id: number;
    name: string;
    location: string;
    time: string;
    imageUrl: string;
  };
  handleDeleteClick: (event: { id: number; name: string }) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, handleDeleteClick }) => {
  return (
    <div className="flex flex-col gap-5 bg-white rounded-md w-full p-5 border border-platinum">
      <div className="flex gap-5 items-center">
        <Image
          className="rounded-md w-[100px] h-[50px] object-cover"
          src={event.imageUrl}
          width={50}
          height={100}
          alt={`Image for ${event.name}`}
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <div className="font-semibold">{event.name}</div>
            <div className="flex gap-2">
              <button className="bg-american-green rounded-lg py-2 px-5 text-white flex gap-2">
                <FontAwesomeIcon className="w-[25px] h-[25px] shrink-0 text-white" icon={faPlus} />
                <div>Add Ticket</div>
              </button>
              <button className="bg-true-blue rounded-lg py-2 px-5 text-white">Edit</button>
              <button
                className="border border-red-500 rounded-lg py-2 px-5 text-red-500"
                onClick={() => handleDeleteClick({ id: event.id, name: event.name })}
              >
                Delete
              </button>
              <button className="bg-true-blue rounded-lg py-2 px-5 text-white">Reviews</button>
              <button className="bg-azureish-white rounded-lg py-2 px-5 flex gap-2 items-center">
                <div>Event page</div>
                <FontAwesomeIcon className="w-[15px] h-[15px] shrink-0 text-slate-gray" icon={faUpRightFromSquare} />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-5">
              <div className="flex gap-2">
                <FontAwesomeIcon className="w-[15px] h-[15px] shrink-0 text-slate-gray" icon={faLocationDot} />
                <div className="text-sm text-slate-gray">{event.location}</div>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon className="w-[15px] h-[15px] shrink-0 text-slate-gray" icon={faClock} />
                <div className="text-sm text-slate-gray">{event.time}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ticket List Container */}
      <div className="flex gap-5 flex-wrap">
        <TicketCard 
          title="Regular"
          available={10}
          sold={25}
          price="Rp. 50.000"
          onEdit={() => console.log("edit")}
          onRelease={() => console.log("release")}
          onClose={() => console.log("close")}
        />
        <TicketCard 
          title="VIP"
          available={10}
          sold={25}
          price="Rp. 100.000"
          onEdit={() => console.log("edit VIP")}
          onRelease={() => console.log("release VIP")}
          onClose={() => console.log("close VIP")}
        />
      </div>
    </div>
  );
};

export default EventCard;
