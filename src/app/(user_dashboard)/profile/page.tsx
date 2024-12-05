"use client";
import useProfile from "@/hooks/useProfile";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface ChangeProfileRequest {
  name: string;
  description: string;
}

const ProfilePage = () => {
  const { data: session } = useSession();
  const { error, isLoading, profile } = useProfile(
    session?.accessToken as string
  );

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
              <button className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap">
                Change password
              </button>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};
export default ProfilePage;
