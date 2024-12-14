'use client'
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faPlus, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import ActionButton from "@/app/(user_dashboard)/organizer_event/components/ActionButton";
import { Event } from "@/types/event";
import formatDate from "@/utils/formatDate";
import { Modal, Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import Link from "next/link";
import AddTicketModal from "../AddTicketModal";

interface IEventContainer {
  event: Event;
  handleClick: (eventId: number) => void;
  refetchEvents: () => void;
}

const EventContainer: FC<IEventContainer> = ({ event, refetchEvents }) => {
  

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  
  const { data: session } = useSession();
  const { showToast } = useToast();


  const showDeleteModal = (): void => {
    setIsModalOpen(true);
  }

  const hideDeleteModal = (): void => {
    setIsModalOpen(false);
  }

  const handleDeleteEvent = async(event: Event): Promise<void> => {
    if(!event.id) return;
  
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/${event.id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        showToast(data.message, "success");
        refetchEvents();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      hideDeleteModal(); 
    } 
  }

  return (
    <div className="flex flex-col gap-5 bg-white rounded-md w-full p-5 border border-platinum">
      <div 
        className="flex gap-5 items-center flex-col lg:flex-row" 
        key={event.id}
      >
        <Image
          className="rounded-md w-[100px] h-[50px] object-cover"
          src="/images/carousel-1.svg"
          width={50}
          height={100}
          alt="Picture of the author"
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="font-semibold mb-3 lg:mb-0">{event.title}</div>

            <div className="flex flex-wrap gap-2">
              <AddTicketModal
                eventId={event.id}
                eventTitle={event.title}
                refetchEvents={refetchEvents}
              />

              {/* <ActionButton
                label="Add Ticket"
                onClick={() => console.log("Add Ticket")}
                icon={faPlus}
                className="bg-american-green text-white"
              /> */}
              
              <ActionButton
                label="Add Discount"
                onClick={() => console.log("Add Discount")}
                icon={faPlus}
                className="bg-true-blue text-white"
              />

              <Link href={`/organizer_event/edit_event/${event.id}`}>
                <ActionButton
                  label="Edit"
                  className="bg-true-blue text-white"
                />
              </Link>

              <ActionButton
                label="Delete"
                onClick={() => showDeleteModal()}
                className="border-[1px] border-red-500 hover:bg-red-600 text-red-500 hover:text-white"
              />

              <ActionButton
                label="Reviews"
                onClick={() => console.log("View Reviews")}
                className="bg-true-blue text-white"
              />

              <Link href={`/event/${event.id}`}>
                <ActionButton
                  label="Event"
                  icon={faUpRightFromSquare}
                  className="bg-true-blue text-white"
                />
              
              </Link>
            
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between items-center">
            
            <div className="flex flex-col lg:flex-row gap-5">

              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                  icon={faLocationDot}
                />
                <div className="text-sm text-slate-gray">
                  {event.location}
                </div>
              </div>

              <div className="flex  gap-2 items-center">
                <FontAwesomeIcon
                  className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                  icon={faClock}
                />
                <div className="text-sm text-slate-gray">
                  {formatDate(event.startTime)} - {formatDate(event.endTime)}
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap flex-row-reverse">
              {event.categories.map((category, index) => (
                <div key={index} className="text-slate-gray rounded-full px-2 border border-slate-gray">
                  {category.name}
                </div>
              ))}
            </div>

          </div>
        </div>
        

    

      {/* Delete Confirmation Modal */}
      <Modal show={isModalOpen} onClose={hideDeleteModal}>
          <Modal.Header>Confirm Delete</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this event? {event.title}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={() => handleDeleteEvent(event)}>
              Delete
            </Button>
            <Button color="gray" onClick={hideDeleteModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        
    </div>
    {/* <TicketCard title={event.title} available={0} sold={0} price={""} onEdit={function (): void {
          throw new Error("Function not implemented.");
        } } onRelease={function (): void {
          throw new Error("Function not implemented.");
        } } onClose={function (): void {
          throw new Error("Function not implemented.");
        } } event={event.title} /> */}
  </div>
  )
}

export default EventContainer;


