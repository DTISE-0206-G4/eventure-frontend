"use client";
import { ProfileResponse } from "@/types/profile";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import * as Yup from "yup";
interface referralFormProps {
  referralCode: string;
}
interface ReferralCodeSectionProps {
  profile: ProfileResponse;
}
const ReferralCodeSection = ({ profile }: ReferralCodeSectionProps) => {
  const { data: session } = useSession();
  const [openModalReferral, setOpenModalReferral] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const ChangeReferralSchema = Yup.object().shape({
    referralCode: Yup.string()
      .required("Referral code is required")
      .matches(/^\S*$/, "Referral code cannot contain spaces")
      .min(8, "Referral code must be at least 8 characters")
      .max(50, "Referral code must be 50 characters or less"),
  });
  const handleChangeReferral = async (
    values: referralFormProps,
    formikHelpers: FormikHelpers<referralFormProps>
  ) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/change_referral_code`,
        {
          referralCode: values.referralCode,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (data.success) {
        alert(data.message);
        setOpenModalReferral(false);
        profile.referralCode = values.referralCode;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        formikHelpers.setErrors({ referralCode: error.response?.data.message });
      } else {
        formikHelpers.setErrors({
          referralCode: "An unexpected error occurred",
        });
      }
    }
  };
  const checkAvailability = async (referralCode: string) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/check_availability`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
          params: {
            referralCode: referralCode,
          },
        }
      );
      if (data.data === true) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };
  return (
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
            <button
              onClick={() => {
                setOpenModalReferral(true);
              }}
              className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap"
            >
              Change referral code
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={openModalReferral}
        onClose={() => setOpenModalReferral(false)}
      >
        <Formik
          initialValues={{
            referralCode: profile?.referralCode,
          }}
          validationSchema={ChangeReferralSchema}
          onSubmit={handleChangeReferral}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Modal.Header>Change Referral Code</Modal.Header>
              <Modal.Body>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 justify-center items-center text-center">
                    <div className="w-full">
                      <label
                        className="block text-slate-gray text-sm font-bold mb-2"
                        htmlFor="referralCode"
                      >
                        Referral Code
                      </label>
                      <Field
                        name="referralCode"
                        type="text"
                        placeholder="Your referral code"
                        className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full"
                        required
                      />
                      {errors.referralCode && touched.referralCode && (
                        <div className="text-red-500">
                          {errors.referralCode}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        checkAvailability(values.referralCode);
                      }}
                      className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold hover:cursor-pointer"
                    >
                      Check Availability
                    </div>
                    {isAvailable ? (
                      <div className="text-american-green">Available</div>
                    ) : (
                      <div className="text-red-500">Not Available</div>
                    )}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="flex justify-between bg-ghost-white">
                <Button
                  color="light"
                  className="bg-white rounded-lg border border-platinum focus:ring-platinum"
                  onClick={() => setOpenModalReferral(false)}
                >
                  Decline
                </Button>
                <Button
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
    </div>
  );
};

export default ReferralCodeSection;
