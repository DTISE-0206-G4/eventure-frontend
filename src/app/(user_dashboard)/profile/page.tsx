"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Formik } from "formik";
import ProfileImageSection from "./ProfileImageSection";
import ProfileDetailsForm from "./ProfileDetailsForm";
import ChangePasswordModal from "./ChangePasswordModal";
import ReferralCodeSection from "./ReferralCodeSection";
import useProfile from "@/hooks/useProfile";
import axios from "axios";

const ProfilePage = () => {
  const { data: session } = useSession();
  const { error, isLoading, profile } = useProfile(
    session?.accessToken as string
  );
  const [openModalPassword, setOpenModalPassword] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSubmit = async (values: any) => {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
      values,
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
      <ProfileImageSection />
      <Formik
        initialValues={{
          name: profile?.name || "",
          description: profile?.description || "",
        }}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <ProfileDetailsForm {...formikProps} profile={profile} />
        )}
      </Formik>
      <div className="mt-5 flex gap-5 justify-start">
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
        session={session}
      />
      {session?.user.roles[0] === "ATTENDEE" && (
        <ReferralCodeSection profile={profile} />
      )}
    </>
  );
};

export default ProfilePage;
