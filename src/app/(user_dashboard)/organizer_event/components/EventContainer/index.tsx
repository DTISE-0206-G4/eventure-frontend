"use client";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faPlus,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import ActionButton from "@/app/(user_dashboard)/organizer_event/components/ActionButton";
import { Event, Ticket } from "@/types/event";
import { EventDiscountResponse } from "@/types/eventDiscountType";
import formatDate from "@/utils/formatDate";
import { Modal, Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import Link from "next/link";
import AddTicketModal from "../AddTicketModal";
import TicketCard from "../TicketCard";
import EditTicketModal from "../EditTicketModal";
import AddDiscountModal from "../AddDiscountModal";
import DiscountCard from "../DiscountCard";

interface IEventContainer {
  event: Event;
  // discount: EventDiscountResponse;
  handleClick: (eventId: number) => void;
  refetchEvents: () => void;
}

const EventContainer: FC<IEventContainer> = ({ event, refetchEvents }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<null | Ticket>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteTicketModalOpen, setIsDeleteTicketModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<null | number>(null);

  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [ticketToRelease, setTicketToRelease] = useState<null | Ticket>(null);
  const [releasedTickets, setReleasedTickets] = useState<Set<number>>(
    new Set()
  );

  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false); // State for the discount modal

  const { data: session } = useSession();
  const { showToast } = useToast();

  const handleEditTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTicket(null);
    setIsEditModalOpen(false);
  };

  const showDeleteModal = (): void => {
    setIsModalOpen(true);
  };

  const hideDeleteModal = (): void => {
    setIsModalOpen(false);
  };

  const showDeleteTicketModal = (ticketId: number): void => {
    setTicketToDelete(ticketId);
    setIsDeleteTicketModalOpen(true);
  };

  const hideDeleteTicketModal = (): void => {
    setIsDeleteTicketModalOpen(false);
    setTicketToDelete(null);
  };

  const showReleaseModal = (ticket: Ticket): void => {
    setTicketToRelease(ticket);
    setIsReleaseModalOpen(true);
  };

  const hideReleaseModal = (): void => {
    setIsReleaseModalOpen(false);
    setTicketToRelease(null);
  };

  const handleAddDiscountClick = () => {
    setIsDiscountModalOpen(true); // Open the modal
  };

  const handleCloseDiscountModal = () => {
    setIsDiscountModalOpen(false); // Close the modal
  };

  const handleDeleteEvent = async (event: Event): Promise<void> => {
    if (!event.id) return;

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
  };

  // New function to handle ticket deletion
  const handleDeleteTicket = async (ticketId: number): Promise<void> => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ticket/${ticketId}`,
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
      hideDeleteTicketModal();
    }
  };

  // Function to handle ticket release
  const handleReleaseTicket = async (ticketId: number): Promise<void> => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ticket/${ticketId}/release`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        showToast(data.message, "success");
        setReleasedTickets((prev) => new Set(prev).add(ticketId));
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
      hideReleaseModal();
    }
  };

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

              <AddDiscountModal
                eventId={event.id}
                eventTitle={event.title}
                refetchEvents={refetchEvents}
              />

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
                label="Transaction"
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
                <div className="text-sm text-slate-gray">{event.location}</div>
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
                <div
                  key={index}
                  className="text-slate-gray rounded-full px-2 border border-slate-gray"
                >
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
      {/* Please for ticket */}
      <h4>Tickets</h4>
      <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {event.tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            title={ticket.name}
            available={ticket.availableSeat}
            sold={ticket.soldSeat}
            price={`IDR ${ticket.price}`}
            onEdit={() => handleEditTicket(ticket)}
            onRelease={() => showReleaseModal(ticket)}
            onClose={() => console.log(`Close ${ticket.name}`)}
            onDelete={() => showDeleteTicketModal(ticket.id)}
            isReleased={ticket.isReleased}
          />
        ))}
      </div>

      {/* Edit Ticket Modal */}
      {isEditModalOpen && selectedTicket && (
        <EditTicketModal
          eventId={event.id}
          eventTitle={event.title}
          refetchEvents={refetchEvents}
          ticket={selectedTicket}
          onClose={closeEditModal}
        />
      )}

      {/* Delete Confirmation Modal for Ticket */}
      <Modal show={isDeleteTicketModalOpen} onClose={hideDeleteTicketModal}>
        <Modal.Header>Confirm Delete Ticket</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this ticket?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="failure"
            onClick={() => handleDeleteTicket(ticketToDelete!)}
          >
            Delete Ticket
          </Button>
          <Button color="gray" onClick={hideDeleteTicketModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Release Confirmation Modal for Ticket */}
      <Modal show={isReleaseModalOpen} onClose={hideReleaseModal}>
        <Modal.Header>Confirm Release Ticket</Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to release this ticket? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="failure"
            onClick={() => handleReleaseTicket(ticketToRelease!.id)}
          >
            Release Ticket
          </Button>
          <Button color="gray" onClick={hideReleaseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <h4>Discount</h4>
        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* {event.tickets.map((ticket) => (
            <DiscountCard
              key={ticket.id}
              title={ticket.name}
              available={ticket.availableSeat}
              // sold={ticket.soldSeat}
              // price={`IDR ${ticket.price}`}
              onEdit={() => handleEditTicket(ticket)}
              onRelease={() => showReleaseModal(ticket)}
              onClose={() => console.log(`Close ${ticket.name}`)}
              onDelete={() => showDeleteTicketModal(ticket.id)}
              isReleased={ticket.isReleased}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default EventContainer;
