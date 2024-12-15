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
import parseAndReformatDateTime from "@/utils/formatDateTimeForm";

interface AddDiscountModalProps {
  refetchEvents: () => void;
  eventId: number;
  eventTitle: string;
}

const DiscountFormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be at least 0"),
  available: Yup.number()
    .required("Available is required")
    .min(1, "At least 1 should be available"),
  code: Yup.string().required("Code is required"),
  expiredAt: Yup.date().required("Expiry date is required").nullable(),
  isPercentage: Yup.boolean(),
});

const AddDiscountModal: FC<AddDiscountModalProps> = ({
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
      title: string;
      description: string;
      amount: number;
      isPercentage: boolean;
      available: number;
      code: string;
      expiredAt: string;
    },
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/event_discount`,
        
        {
          ...values,
          expiredAt: parseAndReformatDateTime(values.expiredAt),
          eventId,
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
        label="Add Discount"
        onClick={handleOpenModal}
        icon={faPlus}
        className="bg-true-blue text-white"
      />

      <Modal show={isModalOpen} onClose={handleCloseModal} size="lg">
        <Modal.Header>Create Discount for {eventTitle}</Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: "",
              description: "",
              amount: 0,
              isPercentage: false,
              available: 0,
              code: "",
              expiredAt: "",
            }}
            validationSchema={DiscountFormSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium">
                    Title
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium">
                    Amount
                  </label>
                  <Field
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Enter discount amount"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="isPercentage" className="flex items-center gap-2">
                    <Field type="checkbox" id="isPercentage" name="isPercentage" />
                    <span className="text-sm font-medium">Is Percentage</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="available" className="block text-sm font-medium">
                    Available
                  </label>
                  <Field
                    type="number"
                    id="available"
                    name="available"
                    placeholder="Enter number available"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="available"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="code" className="block text-sm font-medium">
                    Code
                  </label>
                  <Field
                    type="text"
                    id="code"
                    name="code"
                    placeholder="Enter discount code"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="expiredAt" className="block text-sm font-medium">
                    Expiry Date
                  </label>
                  <Field
                    type="datetime-local"
                    id="expiredAt"
                    name="expiredAt"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="expiredAt"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Button type="button" color="gray" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button type="submit" color="blue" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Discount"}
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

export default AddDiscountModal;