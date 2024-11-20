"use client";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as Yup from "yup";

interface LoginFormProps {
  email: string;
  password: string;
}

const ContactSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
});
const LoginPage: FC = () => {
  const router = useRouter();
  const handleSubmit = async (
    values: LoginFormProps,
    formikHelpers: FormikHelpers<LoginFormProps>
  ) => {
    const { status, data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      values
    );
    if (status !== 200) {
      console.error("Failed to login");
      return;
    }
    localStorage.setItem("token", data.data.accessToken);
    console.log(values);
    formikHelpers.resetForm();
    alert("Login success");
    router.push("/");
  };
  return (
    <div className="container mx-auto flex flex-col justify-center items-center ">
      Login Form
      <Formik
        initialValues={{
          email: "",
          password: "",
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

export default LoginPage;
