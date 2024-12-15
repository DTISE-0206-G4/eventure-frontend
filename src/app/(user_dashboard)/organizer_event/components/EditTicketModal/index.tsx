import { FC } from "react";
import { Modal, Button } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { useSession } from "next-auth/react";
import { Ticket } from "@/types/event";

interface EditTicketModalProps {
  // eventId: number;
  eventTitle: string;
  refetchEvents: () => void;
  ticket: Ticket
  onClose: () => void;
}

const TicketFormSchema = Yup.object().shape({
  name: Yup.string().required("Ticket name is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Type 0 if it is free"),
  availableSeat: Yup.number()
    .required("Available seats are required")
    .min(1, "There must be at least one seat"),
});

const EditTicketModal: FC<EditTicketModalProps> = ({ eventTitle, refetchEvents, ticket, onClose }) => {
  const { showToast } = useToast();
  const { data: session } = useSession();

  const handleSubmit = async (values: { name: string; price: number; availableSeat: number; }) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ticket/${ticket.id}`, 
        {
          "name": values.name,
          "price": values.price,
          "availableSeat": values.availableSeat,
          "isReleased": false,
          "isClosed": false
        },
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
        onClose(); 
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    }
  };

  return (
    <Modal show={true} onClose={onClose} size="lg"> {/* Always show modal when opened */}
      <Modal.Header>Edit Ticket for {eventTitle}</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: ticket.name,
            price: ticket.price,
            availableSeat: ticket.availableSeat,
          }}
          validationSchema={TicketFormSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Ticket Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter ticket name (e.g., Regular, VIP)"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium">Price</label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter ticket price"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="availableSeat" className="block text-sm font-medium">Available Seats</label>
                <Field
                  type="number"
                  id="availableSeat"
                  name="availableSeat"
                  placeholder="Enter number of available seats"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="availableSeat" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mt-4 flex justify-between gap-2">
                <Button type="button" color="gray" onClick={onClose}>Cancel</Button>
                <Button type="submit" color="blue" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Ticket"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditTicketModal;



