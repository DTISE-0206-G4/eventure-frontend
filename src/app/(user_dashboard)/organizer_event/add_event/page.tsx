"use client";
import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import parseAndReformatDateTime from "@/utils/formatDateTimeForm";
import useCategories from "@/hooks/useCategories";
import { useToast } from "@/providers/ToastProvider";
import ConfirmationModal from "@/common/ConfirmationModal";
import CustomSpinner from "@/common/CustomSpinner";
import ImageUploader from "./components/ImageUploader";

interface FormValues {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  categories: number[];
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  startTime: Yup.date().required("Start time is required").nullable(),
  endTime: Yup.date()
    .required("End time is required")
    .nullable()
    .test("is-greater", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      return value && startTime ? value > startTime : true;
    }),
  location: Yup.string().required("Address is required"),
});

const AddEventPage: React.FC = () => {
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] =
    useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();

  const { data: session } = useSession();

  const { categories, isLoading: isLoadingCategories } = useCategories();

  const { showToast } = useToast();

  const handleSubmitAddEvent = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      const parsedValues = {
        ...values,
        startTime: parseAndReformatDateTime(values.startTime),
        endTime: parseAndReformatDateTime(values.endTime),
        imageUrl: imageUrl ?? "",
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/event`,
        parsedValues,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        showToast(data.message, "success");
        formikHelpers.resetForm();
        router.push("/organizer_event");
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
      <div className="font-semibold text-xl">Add Event</div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          startTime: "",
          endTime: "",
          location: "",
          categories: [] as number[],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitAddEvent}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form className="space-y-4 mt-5">
            <div>
              <label
                className="block text-slate-gray text-sm font-bold mb-2"
                htmlFor="email"
              >
                Title
              </label>
              <Field
                name="title"
                type="text"
                placeholder="Your event title"
                className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                required
              />
              {errors.title && touched.title && (
                <div className="text-red-500">{errors.title}</div>
              )}
            </div>
            <div>
              <label
                className="block text-slate-gray text-sm font-bold mb-2"
                htmlFor="description"
              >
                Event Image
              </label>
              <ImageUploader setImageUrl={setImageUrl} />
            </div>
            <div>
              <label
                className="block text-slate-gray text-sm font-bold mb-2"
                htmlFor="description"
              >
                Event Description
              </label>
              <Field
                as="textarea"
                name="description"
                placeholder="Your description"
                className="shadow appearance-none border border-platinum rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                rows={4}
                required
              />
              {errors.description && touched.description && (
                <div className="text-red-500">{errors.description}</div>
              )}
            </div>

            <div>
              <div className="block text-slate-gray text-sm font-bold mb-2">
                Select Categories
              </div>
              {isLoadingCategories && <CustomSpinner />}
              <div className="flex flex-col items-start">
                {categories?.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <Field
                      type="checkbox"
                      name="categories"
                      value={category.id.toString()}
                      className="h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
              {errors.categories && touched.categories && (
                <div className="error">{errors.categories}</div>
              )}
            </div>

            <div>
              <label
                className="block text-slate-gray text-sm font-bold mb-2"
                htmlFor="startTime"
              >
                Start Time
              </label>

              <Field
                type="datetime-local"
                id="startTime"
                name="startTime"
                className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              {errors.startTime && touched.startTime && (
                <div className="text-red-500">{errors.startTime}</div>
              )}
            </div>

            <div>
              <label
                className="block text-slate-gray text-sm font-bold mb-2"
                htmlFor="endTime"
              >
                End Time
              </label>

              <Field
                type="datetime-local"
                id="endTime"
                name="endTime"
                className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              {errors.endTime && touched.endTime && (
                <div className="text-red-500">{errors.endTime}</div>
              )}
            </div>

            <div>
              <label
                className="block text-slate-gray text-sm font-bold mb-2"
                htmlFor="location"
              >
                Address
              </label>
              <Field
                as="textarea"
                name="location"
                placeholder="Your event address"
                className="shadow appearance-none border border-platinum rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                rows={4}
                required
              />
              {errors.location && touched.location && (
                <div className="text-red-500">{errors.location}</div>
              )}
            </div>
            <div className="flex justify-start">
              <div
                onClick={() => setIsModalConfirmationOpen(true)}
                className="bg-true-blue text-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap hover:cursor-pointer"
              >
                Create Event
              </div>
            </div>

            <ConfirmationModal
              isOpen={isModalConfirmationOpen}
              onClose={() => {
                setIsModalConfirmationOpen(false);
              }}
              onConfirm={() => {
                handleSubmit();
                setIsModalConfirmationOpen(false);
              }}
              title="Add Event Confirmation"
              message="Are you sure you want to add new event?"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddEventPage;
