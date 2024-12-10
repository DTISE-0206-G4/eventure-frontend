import { Formik, Field, Form, FormikHelpers } from "formik";
import { Button, Modal } from "flowbite-react";
import * as Yup from "yup";
import axios from "axios";
import { ChangePasswordRequest } from "@/types/profile";
import { Session } from "next-auth";

interface ChangePasswordModalProps {
  openModalPassword: boolean;
  setOpenModalPassword: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session;
}

const ChangePasswordModal = ({
  openModalPassword,
  setOpenModalPassword,
  session,
}: ChangePasswordModalProps) => {
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

  const handleChangePassword = async (
    values: ChangePasswordRequest,
    formikHelpers: FormikHelpers<ChangePasswordRequest>
  ) => {
    try {
      const { data } = await axios.post(
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
    <Modal show={openModalPassword} onClose={() => setOpenModalPassword(false)}>
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
                    {errors.oldPassword && touched.oldPassword && (
                      <div className="text-red-500">{errors.oldPassword}</div>
                    )}
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
                    {errors.newPassword && touched.newPassword && (
                      <div className="text-red-500">{errors.newPassword}</div>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-slate-gray text-sm font-bold mb-2"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="*****"
                      className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      required
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-red-500">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between bg-ghost-white"></div>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-between bg-ghost-white">
              <Button
                color="light"
                className="bg-white rounded-lg border border-platinum focus:ring-platinum"
                onClick={() => setOpenModalPassword(false)}
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
  );
};

export default ChangePasswordModal;
