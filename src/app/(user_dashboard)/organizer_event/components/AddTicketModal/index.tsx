import { FC } from "react";
import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { useSession } from "next-auth/react";
import ActionButton from "@/app/(user_dashboard)/organizer_event/components/ActionButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface AddTicketModalProps {
  refetchEvents: () => void;
  eventId: number;
  eventTitle: string;
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

const AddTicketModal: FC<AddTicketModalProps> = ({ 
  eventId, 
  eventTitle, 
  refetchEvents,
 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();
  const { data: session } = useSession();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (
    values: { 
      name: string; 
      price: number; 
      availableSeat: number; 
    }, 
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ticket`,
        {
          eventId,
          name: values.name,
          price: values.price,
          availableSeat: values.availableSeat,
          isReleased: false,
          isClosed: false,
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
        resetForm();
        handleCloseModal();
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
    }
  };
  

  return (
    <>
      <ActionButton
        label="Add Ticket"
        onClick={handleOpenModal}
        icon={faPlus}
        className="bg-american-green text-white"
      />

      <Modal show={isModalOpen} onClose={handleCloseModal} size="lg">
        <Modal.Header>Create Ticket for {eventTitle}</Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
              price: 0,
              availableSeat: 0,
            }}
            validationSchema={TicketFormSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Ticket Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter ticket name (e.g., Regular, VIP)"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price
                  </label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter ticket price"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="availableSeat" className="block text-sm font-medium">
                    Available Seats
                  </label>
                  <Field
                    type="number"
                    id="availableSeat"
                    name="availableSeat"
                    placeholder="Enter number of available seats"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="availableSeat"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Button type="button" color="gray" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button type="submit" color="blue" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Ticket"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTicketModal;