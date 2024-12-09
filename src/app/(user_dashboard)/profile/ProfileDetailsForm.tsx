"use client";
import { Field, Form, FormikErrors, FormikTouched } from "formik";
import ConfirmationModal from "@/common/ConfirmationModal";
import { useState } from "react";
import { ProfileResponse } from "@/types/profile";

interface SubmitProps {
  name: string;
  description: string;
}

interface ProfileDetailsFormProps {
  profile: ProfileResponse;
  handleSubmit: () => void;
  errors: FormikErrors<SubmitProps>; // Specify the generic type
  touched: FormikTouched<SubmitProps>;
}

const ProfileDetailsForm = ({
  profile,
  handleSubmit,
  errors,
  touched,
}: ProfileDetailsFormProps) => {
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] =
    useState<boolean>(false);
  const handleConfirm = (): void => {
    handleSubmit();
    setIsModalConfirmationOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalConfirmationOpen(false);
  };
  return (
    <Form>
      <div className="mt-5 flex flex-col gap-2">
        <div className="text-lg font-medium text-slate-gray">
          Profile Details
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div>
            <label
              className="block text-slate-gray text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Field
              name="email"
              type="text"
              placeholder="Your email"
              className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-azureish-white"
              value={profile?.email}
              disabled
            />
          </div>
          <div>
            <label
              className="block text-slate-gray text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Field
              name="name"
              type="text"
              placeholder="Your name"
              className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              required
            />
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )}
          </div>
          <div>
            <label
              className="block text-slate-gray text-sm font-bold mb-2"
              htmlFor="description"
            >
              Profile Description
            </label>
            <Field
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
        <div className="flex">
          <div
            onClick={() => setIsModalConfirmationOpen(true)}
            className="bg-true-blue text-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap hover:cursor-pointer"
          >
            Save changes
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalConfirmationOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title="Changes Confirmation"
        message="Are you sure you want to change your profile?"
      />
    </Form>
  );
};

export default ProfileDetailsForm;
