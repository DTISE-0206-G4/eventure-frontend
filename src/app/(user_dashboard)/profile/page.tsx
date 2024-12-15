"use client";

import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { Formik } from "formik";
import ProfileImageSection from "./components/ProfileImageSection";
import ProfileDetailsForm from "./components/ProfileDetailsForm";
import ChangePasswordModal from "./components/ChangePasswordModal";
import ReferralCodeSection from "./components/ReferralCodeSection";
import useProfile from "@/hooks/useProfile";
import axios from "axios";
import { ProfileResponse } from "@/types/profile";
import { Session } from "next-auth";
import { useToast } from "@/providers/ToastProvider";
import CustomSpinner from "@/common/CustomSpinner";

interface SubmitProps {
  name: string;
  description: string;
}

const ProfilePage: FC = () => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const { error, isLoading, profile, refetch } = useProfile(
    session?.accessToken as string
  );
  const [openModalPassword, setOpenModalPassword] = useState(false);

  const handleSubmit = async (values: SubmitProps) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        values,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
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
    }
  };

  // Loading and error handling
  if (isLoading) return <CustomSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="font-semibold text-xl">Profile Settings</div>
      <ProfileImageSection
        profile={profile as ProfileResponse}
        refetch={refetch}
      />
      <Formik
        initialValues={{
          name: profile?.name || "",
          description: profile?.description || "",
        }}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <ProfileDetailsForm
            {...formikProps}
            profile={profile as ProfileResponse}
          />
        )}
      </Formik>
      <div className="mt-5 flex flex-col gap-2 justify-start items-start">
        <div className="text-lg font-medium text-slate-gray">
          Password Setting
        </div>
        <button
          className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold"
          onClick={() => setOpenModalPassword(true)}
        >
          Change Password
        </button>
      </div>
      <ChangePasswordModal
        openModalPassword={openModalPassword}
        setOpenModalPassword={setOpenModalPassword}
        session={session as Session}
      />
      {session?.user.roles[0] === "ATTENDEE" && (
        <ReferralCodeSection profile={profile as ProfileResponse} />
      )}
    </>
  );
};

export default ProfilePage;
