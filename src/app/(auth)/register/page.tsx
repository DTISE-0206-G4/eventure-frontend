"use client";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as Yup from "yup";

interface RegisterFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: string;
  referralCode: string;
}

const ContactSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  referralCode: Yup.string(),
});
const RegisterPage: FC = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const handleSubmit = async (
    values: RegisterFormProps,
    formikHelpers: FormikHelpers<RegisterFormProps>
  ) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        values
      );
      if (data.success) {
        showToast(data.message, "success");
        formikHelpers.resetForm();
        router.push("/login");
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
    <div className="container mx-auto flex flex-col justify-center items-center min-h-[calc(100vh-150px)]">
      <div className="w-full max-w-md mt-10">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            role: "ATTENDEE",
            referralCode: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-5 w-full bg-white p-10 rounded-md border border-platinum">
              <div className="text-lg font-semibold text-center">
                Create new account
              </div>

              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <Field
                id="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 rounded-sm border border-platinum"
              />
              {errors.email && touched.email ? (
                <div className="text-red-500">{errors.email}</div>
              ) : null}
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <Field
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                className="w-full p-2 rounded-sm border border-platinum"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}

              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold"
              >
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                className="w-full p-2 rounded-sm border border-platinum"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="text-red-500">{errors.confirmPassword}</div>
              ) : null}

              <label htmlFor="name" className="text-sm font-semibold">
                User Name
              </label>
              <Field
                id="name"
                name="name"
                placeholder="User Name"
                type="text"
                className="w-full p-2 rounded-sm border border-platinum"
              />
              {errors.name && touched.name ? (
                <div className="text-red-500">{errors.name}</div>
              ) : null}

              <label htmlFor="role" className="text-sm font-semibold">
                Role
              </label>
              <Field
                as="select"
                name="role"
                className="w-full p-2 rounded-sm border border-platinum"
              >
                <option value="ATTENDEE">ATTENDEE</option>
                <option value="ORGANIZER">ORGANIZER</option>
              </Field>
              {errors.role && touched.role ? (
                <div className="text-red-500">{errors.role}</div>
              ) : null}

              <label htmlFor="referralCode" className="text-sm font-semibold">
                Referral Code
              </label>
              <Field
                id="referralCode"
                name="referralCode"
                placeholder="Referral Code"
                type="text"
                className="w-full p-2 rounded-sm border border-platinum"
              />
              {errors.referralCode && touched.referralCode ? (
                <div className="text-red-500">{errors.referralCode}</div>
              ) : null}

              <button
                className="bg-true-blue rounded-sm px-8 py-2 w-full text-white font-medium"
                type="submit"
              >
                Create new account
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="my-2">
        Already have account?{" "}
        <Link href="/login" className="text-true-blue">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
