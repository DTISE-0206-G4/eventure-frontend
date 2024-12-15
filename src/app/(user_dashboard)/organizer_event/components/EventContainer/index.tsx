"use client";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
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
import EditDiscountModal from "../EditDiscountModal";

interface IEventContainer {
  event: Event;
  handleClick: (eventId: number) => void;
  refetchEvents: () => void;
}

const EventContainer: FC<IEventContainer> = ({ event, refetchEvents }) => {
  // EDIT TICKET
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<null | Ticket>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // DELETE TICKET
  const [isDeleteTicketModalOpen, setIsDeleteTicketModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<null | number>(null);

  // RELEASE TICKET
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
  const [ticketToRelease, setTicketToRelease] = useState<null | Ticket>(null);
  // const [releasedTickets, setReleasedTickets] = useState<Set<number>>(new Set());

  // CLOSE TICKET
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [ticketToClose, setTicketToClose] = useState<null | Ticket>(null);
  // const [closedTickets, setClosedTickets] = useState<Set<number>>(new Set());

  //===========================
  // EDIT DISCOUNT
  // const [isDiscountModalOpen, setDiscountIsModalOpen] = useState<boolean>(false);
  const [selectedDiscount, setSelectedDiscount] =
    useState<EventDiscountResponse | null>(null);
  const [isEditDiscountModalOpen, setIsEditDiscountModalOpen] = useState(false);

  // RELEASE DISCOUNT
  const [isReleaseDiscountModalOpen, setIsReleaseDiscountModalOpen] =
    useState(false);
  const [discountToRelease, setDiscountToRelease] =
    useState<null | EventDiscountResponse>(null);
  // const [releasedDiscount, setReleasedDiscount] = useState<Set<number>>(new Set());

  // DELETE DISCOUNT
  const [isDeleteDiscountModalOpen, setIsDeleteDiscountModalOpen] =
    useState(false);
  const [discountToDelete, setDiscountToDelete] = useState<null | number>(null);

  // CLOSE DISCOUNT
  const [isCloseDiscountModalOpen, setIsCloseDiscountModalOpen] =
    useState(false);
  const [discountToClose, setDiscountToClose] =
    useState<null | EventDiscountResponse>(null);
  // const [closedDiscount, setClosedDiscount] = useState<Set<number>>(new Set());

  const { data: session } = useSession();
  const { showToast } = useToast();

  // EDIT TICKET
  const handleEditTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTicket(null);
    setIsEditModalOpen(false);
  };

  // DELETE TICKET
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
  const showDeleteModal = (): void => {
    setIsModalOpen(true);
  };

  // RELEASE TICKET
  const showReleaseModal = (ticket: Ticket): void => {
    setTicketToRelease(ticket);
    setIsReleaseModalOpen(true);
  };
  const hideReleaseModal = (): void => {
    setIsReleaseModalOpen(false);
    setTicketToRelease(null);
  };

  // CLOSE TICKET
  const showCloseModal = (ticket: Ticket): void => {
    setTicketToClose(ticket);
    setIsCloseModalOpen(true);
  };
  const hideCloseModal = (): void => {
    setIsCloseModalOpen(false);
    setTicketToClose(null);
  };

  // =================================
  // EDIT DISCOUNT
  // const handleEditDiscount = (discount: EventDiscountResponse) => {
  //   setSelectedDiscount(discount);
  //   setIsEditDiscountModalOpen(true);
  // };

  const closeEditDiscountModal = () => {
    setSelectedDiscount(null);
    setIsEditDiscountModalOpen(false);
  };

  // RELEASE DISCOUNT
  const showReleaseDiscountModal = (discount: EventDiscountResponse): void => {
    setDiscountToRelease(discount);
    setIsReleaseDiscountModalOpen(true);
  };
  const hideReleaseDiscountModal = (): void => {
    setIsReleaseDiscountModalOpen(false);
    setDiscountToRelease(null);
  };

  // DELETE DISCOUNT
  const showDeleteDiscountModal = (discountId: number): void => {
    setDiscountToDelete(discountId);
    setIsDeleteDiscountModalOpen(true);
  };
  const hideDeleteDiscountModal = (): void => {
    setIsDeleteDiscountModalOpen(false);
    setDiscountToDelete(null);
  };

  // CLOSE DISCOUNT
  const showCloseDiscountModal = (discount: EventDiscountResponse): void => {
    setDiscountToClose(discount);
    setIsCloseDiscountModalOpen(true);
  };
  const hideCloseDiscountModal = (): void => {
    setIsCloseDiscountModalOpen(false);
    setDiscountToClose(null);
  };

  // =================================
  // HANDLING CUY

  const handleEditDiscount = (discount: EventDiscountResponse) => {
    setSelectedDiscount(discount);
    setIsEditDiscountModalOpen(true);
  };

  // const handleAddDiscountClick = () => {
  //   setIsDiscountModalOpen(true); // Open the modal
  // };

  // const handleCloseDiscountModal = () => {
  //   setIsDiscountModalOpen(false); // Close the modal
  // };

  // HANDLING RELEASE
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
        // setReleasedTickets((prev) => new Set(prev).add(ticketId));
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
  const handleReleaseDiscount = async (discountId: number): Promise<void> => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/event_discount/${discountId}/release`,
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
        // setReleasedTickets((prev) => new Set(prev).add(discountId));
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
      hideReleaseDiscountModal();
    }
  };

  // HANDLING DELETE
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
  const handleDeleteDiscount = async (discountId: number): Promise<void> => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/event_discount/${discountId}`,
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
      hideDeleteDiscountModal();
    }
  };

  const handleCloseTicket = async (ticketId: number): Promise<void> => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ticket/${ticketId}/close`,
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
        // setClosedTickets((prev) => new Set(prev).add(ticketId));
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
      hideCloseModal();
    }
  };
  const handleCloseDiscount = async (discountId: number): Promise<void> => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/event_discount/${discountId}/close`,
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
        // setClosedTickets((prev) => new Set(prev).add(discountId));
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
      hideCloseDiscountModal();
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
          src={event.imageUrl ? event.imageUrl : "/images/carousel-1.svg"}
          width={50}
          height={100}
          alt="Event Image"
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="font-semibold mb-3 lg:mb-0">{event.title}</div>

            <div className="flex flex-wrap justify-end gap-2">
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
      {/* Place for ticket */}
      <h2 className="font-semibold mb-3 lg:mb-0">Tickets</h2>
      {event.tickets.length === 0 ? (
        <div className="text-sm text-slate-gray text-center">
          No tickets available.
        </div>
      ) : (
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
              onClose={() => showCloseModal(ticket)}
              onDelete={() => showDeleteTicketModal(ticket.id)}
              isReleased={ticket.isReleased}
              isClosed={ticket.isClosed}
            />
          ))}
        </div>
      )}

      {/* Edit Ticket Modal */}
      {isEditModalOpen && selectedTicket && (
        <EditTicketModal
          // eventId={event.id}
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
        <Modal.Footer className="flex justify-between">
          <Button color="gray" onClick={hideDeleteTicketModal}>
            Cancel
          </Button>

          <Button
            color="blue"
            onClick={() => handleDeleteTicket(ticketToDelete!)}
          >
            Delete Ticket
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Close Confirmation Modal for Ticket */}
      <Modal show={isReleaseModalOpen} onClose={hideReleaseModal}>
        <Modal.Header>Confirm Release Ticket</Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to release this ticket? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button color="gray" onClick={hideReleaseModal}>
            Cancel
          </Button>

          <Button
            color="blue"
            onClick={() => handleReleaseTicket(ticketToRelease!.id)}
          >
            Release Ticket
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Close Confirmation Modal for Ticket */}
      <Modal show={isCloseModalOpen} onClose={hideCloseModal}>
        <Modal.Header>Confirm Close Ticket</Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to close this ticket? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button color="gray" onClick={hideCloseModal}>
            Cancel
          </Button>

          <Button
            color="blue"
            onClick={() => handleCloseTicket(ticketToClose!.id)}
          >
            Close Ticket
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <h2 className="font-semibold mb-3 lg:mb-0">Discount</h2>
        {event.eventDiscounts.length === 0 ? (
          <div className="text-sm text-slate-gray text-center">
            No discounts available.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {event.eventDiscounts.map((discount) => (
              <DiscountCard
                key={discount.id}
                title={discount.title}
                description={discount.description}
                amount={discount.amount}
                isPercentage={discount.isPercentage}
                used={discount.used}
                available={discount.available}
                code={discount.code}
                expiredAt={discount.expiredAt}
                isReleased={discount.isReleased}
                isClosed={discount.isClosed}
                onEdit={() => handleEditDiscount(discount)}
                onRelease={() => showReleaseDiscountModal(discount)}
                onClose={() => showCloseDiscountModal(discount)}
                onDelete={() => showDeleteDiscountModal(discount.id)}
              />
            ))}
            {isEditDiscountModalOpen && selectedDiscount && (
              <EditDiscountModal
                eventId={event.id}
                eventTitle={event.title}
                refetchEvents={refetchEvents}
                discount={selectedDiscount as EventDiscountResponse}
                onClose={closeEditDiscountModal}
              />
            )}
          </div>
        )}

        {/* Release Confirmation Modal for Ticket */}
        <Modal
          show={isReleaseDiscountModalOpen}
          onClose={hideReleaseDiscountModal}
        >
          <Modal.Header>Confirm Release Discount</Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to release this discount? This action cannot
              be undone.
            </p>
          </Modal.Body>
          <Modal.Footer className="flex justify-between">
            <Button color="gray" onClick={hideReleaseDiscountModal}>
              Cancel
            </Button>

            <Button
              color="blue"
              onClick={() => handleReleaseDiscount(discountToRelease!.id)}
            >
              Release Discount
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal for Discount */}
        <Modal
          show={isDeleteDiscountModalOpen}
          onClose={hideDeleteDiscountModal}
        >
          <Modal.Header>Confirm Delete Discount</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this discount?</p>
          </Modal.Body>
          <Modal.Footer className="flex justify-between">
            <Button color="gray" onClick={hideDeleteDiscountModal}>
              Cancel
            </Button>

            <Button
              color="blue"
              onClick={() => handleDeleteDiscount(discountToDelete!)}
            >
              Delete Discount
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Close Confirmation Modal for Ticket */}
        <Modal show={isCloseDiscountModalOpen} onClose={hideCloseDiscountModal}>
          <Modal.Header>Confirm Close Discount</Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to close this discount? This action cannot
              be undone.
            </p>
          </Modal.Body>
          <Modal.Footer className="flex justify-between">
            <Button color="gray" onClick={hideCloseDiscountModal}>
              Cancel
            </Button>

            <Button
              color="blue"
              onClick={() => handleCloseDiscount(discountToClose!.id)}
            >
              Close Discount
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default EventContainer;
