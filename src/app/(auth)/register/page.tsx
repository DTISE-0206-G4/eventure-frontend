"use client";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
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
  const handleSubmit = async (
    values: RegisterFormProps,
    formikHelpers: FormikHelpers<RegisterFormProps>
  ) => {
    const { status, data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      values
    );
    if (status !== 200) {
      console.error("Failed to register");
      return;
    }
    // localStorage.setItem("token", JSON.stringify(data.data.accessToken));
    console.log(values);
    formikHelpers.resetForm();
    alert("Register success");
    router.push("/login");
  };
  return (
    <div className="container mx-auto flex flex-col justify-center items-center ">
      Login Form
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
          <Form className="flex flex-col gap-5 w-full">
            <label htmlFor="email" className="">
              Email
            </label>

            <Field
              id="email"
              name="email"
              placeholder="Email"
              className="w-full  p-2 rounded-lg border-2 "
            />
            {errors.email && touched.email ? (
              <div className="text-red-500">{errors.email}</div>
            ) : null}
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              className="w-full p-2 rounded-lg border-2 "
            />
            {errors.password && touched.password ? (
              <div className="text-red-500">{errors.password}</div>
            ) : null}

            <label htmlFor="password">Confirm Password</label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              className="w-full p-2 rounded-lg border-2 "
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="text-red-500">{errors.confirmPassword}</div>
            ) : null}

            <label htmlFor="password">User Name</label>
            <Field
              id="name"
              name="name"
              placeholder="User Name"
              type="text"
              className="w-full p-2 rounded-lg border-2 "
            />
            {errors.name && touched.name ? (
              <div className="text-red-500">{errors.name}</div>
            ) : null}

            <label htmlFor="role">Role</label>
            <Field as="select" name="role">
              <option value="ATTENDEE">ATTENDEE</option>
              <option value="ORGANIZER">ORGANIZER</option>
            </Field>
            {errors.role && touched.role ? (
              <div className="text-red-500">{errors.role}</div>
            ) : null}

            <label htmlFor="referralCode">Referral Code</label>
            <Field
              id="referralCode"
              name="referralCode"
              placeholder="Referral Code"
              type="text"
              className="w-full p-2 rounded-lg border-2 "
            />
            {errors.referralCode && touched.referralCode ? (
              <div className="text-red-500">{errors.referralCode}</div>
            ) : null}

            <button
              className="bg-slate-500  rounded-lg px-8 py-3 max-w-[150px] text-light-cyan font-medium"
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
