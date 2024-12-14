'use client'
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faPlus, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import ActionButton from "@/app/(user_dashboard)/organizer_event/ActionButton";
import { Event, Category } from "@/types/event";
import useEventsListOrg from '@/hooks/useEventListOrg'
import formatDate from "@/utils/formatDate";
import { Modal, Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import Link from "next/link";

interface IEventToDelete {
  id: number;
  name: string;
}

interface IEventToRelease {
  id: number;
  name: string;
}

interface IEventContainer {
  event: Event;
  handleClick: (eventId: number) => void;
  refetchEvents: () => void;
}

const EventContainer: FC<IEventContainer> = ({ event, handleClick, refetchEvents }) => {
  

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  
  
  const { data: session } = useSession();
  const { showToast } = useToast();


  const showDeleteModal = (eventId: number): void => {
    setEventToDelete(eventId);
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
        className="flex gap-5 items-center" 
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
        <div className="flex justify-between">
          <div className="font-semibold">{event.title}</div>

          <div className="flex gap-2">
            <ActionButton
              label="Add Ticket"
              onClick={() => console.log("Add Ticket")}
              // event={event}
              icon={faPlus}
              className="bg-american-green text-white"
            />

            <Link href={`/organizer_event/edit_event/${event.id}`}>
              <ActionButton
                label="Edit"
                // onClick={(e) => e.preventDefault()}
                className="bg-true-blue text-white"
              />
            </Link>

            <ActionButton
              label="Delete"
            
              onClick={() => showDeleteModal(event.id)}
              
              className="border-[1px] border-red-500 hover:bg-red-600 text-red-500 hover:text-white"
            />

            <ActionButton
              label="Reviews"
              onClick={() => console.log("View Reviews")}
              // event={event}
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

        <div className="flex justify-between items-center">
          <div className="flex gap-5">

            <div className="flex gap-2 items-center">
              <FontAwesomeIcon
                className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                icon={faLocationDot}
              />
              <div className="text-sm text-slate-gray">
                {event.location}
              </div>
            </div>

            <div className="flex gap-2 items-center">
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
  </div>
  )
}

export default EventContainer;


