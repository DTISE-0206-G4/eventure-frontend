"use client";
import useReview from "@/hooks/useReview";
import { useToast } from "@/providers/ToastProvider";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { Field, Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

interface ReviewModalProps {
  eventId: number;
  accessToken: string;
  eventTitle: string;
}
interface ReviewFormValues {
  stars: number;
  description: string;
}
const ReviewSchema = Yup.object().shape({
  stars: Yup.number()
    .required("Star rating is required")
    .min(1, "Please select a rating between 1 and 5")
    .max(5, "Please select a rating between 1 and 5"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
});

const ReviewModal: FC<ReviewModalProps> = ({
  eventId,
  accessToken,
  eventTitle,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { refetch, error, review } = useReview(accessToken, eventId);
  const [isReviewed, setIsReviewed] = useState(false);
  const { showToast } = useToast();
  const handleSubmitReview = async (
    values: ReviewFormValues,
  
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/review`,
        {
          ...values,
          eventId: eventId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        showToast(data.message, "success");
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
      setOpenModal(false);
      refetch();
    }
  };

  useEffect(() => {
    if (!error && review) {
      setIsReviewed(true);
    }
  }, [review]);

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        color="blue"
        className="bg-true-blue"
      >
        {isReviewed ? "Reviewed" : "Add Review"}
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Formik
          initialValues={{
            stars: review?.stars || 0,
            description: review?.description || "",
          }}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmitReview}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <Modal.Header>Review {eventTitle}</Modal.Header>
              <Modal.Body>
                <div className="flex flex-col gap-4">
                  {/* Star Rating */}
                  <div className="flex flex-col items-center">
                    <label
                      className="block text-slate-gray text-sm font-bold mb-2"
                      htmlFor="stars"
                    >
                      Stars
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star} className="cursor-pointer">
                          <Field
                            disabled={isReviewed}
                            type="radio"
                            name="stars"
                            value={star.toString()}
                            className="hidden"
                            onClick={() => setFieldValue("stars", star)}
                          />
                          <FontAwesomeIcon
                            className={`w-[25px] h-[25px] shrink-0 ${
                              values.stars >= star
                                ? "text-yellow-300"
                                : "text-slate-400"
                            }`}
                            icon={faStar}
                          />
                        </label>
                      ))}
                    </div>
                    {errors.stars && touched.stars && (
                      <div className="text-red-500">{errors.stars}</div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      className="block text-slate-gray text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <Field
                      disabled={isReviewed}
                      value={values.description}
                      as="textarea"
                      name="description"
                      placeholder="Your description"
                      className="shadow appearance-none border border-platinum rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    />
                    {errors.description && touched.description && (
                      <div className="text-red-500">{errors.description}</div>
                    )}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="flex justify-between bg-ghost-white">
                <Button
                  color="light"
                  className="bg-white rounded-lg border border-platinum focus:ring-platinum"
                  onClick={() => setOpenModal(false)}
                >
                  Decline
                </Button>
                <Button
                  disabled={isReviewed}
                  color="blue"
                  className="bg-true-blue rounded-lg text-white"
                  type="submit"
                >
                  Accept
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ReviewModal;
