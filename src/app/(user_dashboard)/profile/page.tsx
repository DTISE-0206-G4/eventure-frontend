"use client";
import useProfile from "@/hooks/useProfile";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import { ChangePasswordRequest } from "@/types/profile";
interface ChangeProfileRequest {
  name: string;
  description: string;
}

const ProfilePage = () => {
  const { data: session } = useSession();
  const { error, isLoading, profile } = useProfile(
    session?.accessToken as string
  );
  const [openModalPassword, setOpenModalPassword] = useState(false);

  // Validation Schema
  const ProfileSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Name must be 50 characters or less")
      .required("Name is required"),
    description: Yup.string().max(
      200,
      "Description must be 200 characters or less"
    ),
  });

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Old password is required")
      .max(50, "Password must be 50 characters or less"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "New password must be at least 8 characters")
      .max(50, "New password must be 50 characters or less")
      .notOneOf(
        [Yup.ref("oldPassword")],
        "New password cannot be the same as the old password"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSubmit = async (values: ChangeProfileRequest) => {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
      {
        ...values,
        profileImage: null, // The payload
      },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    if (!data.success) {
      alert(data.message);
    } else {
      alert("Profile saved!");
    }
  };

  const handleChangePassword = async (
    values: ChangePasswordRequest,
    formikHelpers: FormikHelpers<ChangePasswordRequest>
  ) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change_password`,
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(data.message);
      formikHelpers.resetForm();
      setOpenModalPassword(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        formikHelpers.setErrors({ oldPassword: error.response?.data.message });
      } else {
        formikHelpers.setErrors({
          oldPassword: "An unexpected error occurred",
        });
      }
    }
  };

  return (
    <>
      <div className="font-semibold text-xl">Profile Settings</div>
      <div className="mt-5 flex flex-col gap-2">
        <div className="text-lg font-medium text-slate-gray">Profile Image</div>
        <div className="flex gap-5">
          <Image
            className="rounded-md"
            src="/images/default-profile.jpg"
            width={150}
            height={150}
            alt="User Profile"
          />
          <div className="flex flex-col justify-center gap-5">
            <button className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold">
              Change image
            </button>
            <button className="bg-white rounded-lg px-5 py-2 border border-platinum text-red-500 font-semibold">
              Delete image
            </button>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{
          name: profile?.name || "",
          description: profile?.description || "",
        }}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
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
                  {errors.name && touched.name ? (
                    <div className="text-red-500">{errors.name}</div>
                  ) : null}
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
                  {errors.description && touched.description ? (
                    <div className="text-red-500">
                      {errors.description.toString()}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="bg-true-blue text-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap"
                >
                  Save changes
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-5 flex flex-col gap-2">
        <div className="text-lg font-medium text-slate-gray">
          Password Setting
        </div>
        <div className="flex gap-5 justify-start">
          <div className="w-full">
            <div className="flex gap-5 w-full">
              {/* <button className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap">
                Change password
              </button> */}
              <button
                className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap"
                onClick={() => setOpenModalPassword(true)}
              >
                Change password
              </button>
              <Modal
                show={openModalPassword}
                onClose={() => setOpenModalPassword(false)}
              >
                <Formik
                  initialValues={{
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  validationSchema={ChangePasswordSchema}
                  onSubmit={handleChangePassword}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Modal.Header>Change Password</Modal.Header>
                      <Modal.Body>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-2 justify-center items-center text-center">
                            <div>
                              <label
                                className="block text-slate-gray text-sm font-bold mb-2"
                                htmlFor="oldPassword"
                              >
                                Old Password
                              </label>
                              <Field
                                name="oldPassword"
                                type="password"
                                placeholder="*****"
                                className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                required
                              />
                              {errors.oldPassword && touched.oldPassword ? (
                                <div className="text-red-500">
                                  {errors.oldPassword}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label
                                className="block text-slate-gray text-sm font-bold mb-2"
                                htmlFor="newPassword"
                              >
                                New Password
                              </label>
                              <Field
                                name="newPassword"
                                type="password"
                                placeholder="*****"
                                className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                required
                              />
                              {errors.newPassword && touched.newPassword ? (
                                <div className="text-red-500">
                                  {errors.newPassword}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label
                                className="block text-slate-gray text-sm font-bold mb-2"
                                htmlFor="confirmPassword"
                              >
                                Old Password
                              </label>
                              <Field
                                name="confirmPassword"
                                type="password"
                                placeholder="*****"
                                className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                required
                              />
                              {errors.confirmPassword &&
                              touched.confirmPassword ? (
                                <div className="text-red-500">
                                  {errors.confirmPassword}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer className="flex justify-between bg-ghost-white">
                        <button
                          className="bg-white rounded-lg py-2 px-5 border border-platinum"
                          onClick={() => setOpenModalPassword(false)}
                        >
                          Decline
                        </button>
                        <button
                          className="bg-true-blue rounded-lg py-2 px-5 text-white"
                          type="submit"
                        >
                          Accept
                        </button>
                      </Modal.Footer>
                    </Form>
                  )}
                </Formik>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      {session?.user.roles[0] === "ATTENDEE" && (
        <div className="mt-5 flex flex-col gap-2">
          <div className="text-lg font-medium text-slate-gray">
            Referral Code Setting
          </div>
          <div className="flex gap-5 justify-start">
            <div className="w-full">
              <label
                className="block text-slate-gray text-sm font-bold mb-2"
                htmlFor="referralCode"
              >
                Referral Code
              </label>
              <div className="flex gap-5 w-full">
                <input
                  className="shadow appearance-none border border-platinum rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-azureish-white"
                  name="referralCode"
                  type="text"
                  placeholder="Referral Code"
                  value={profile?.referralCode}
                  disabled
                />
                <button className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap">
                  Change referral code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfilePage;
