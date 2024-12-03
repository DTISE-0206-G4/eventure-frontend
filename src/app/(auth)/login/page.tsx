"use client";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
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
    <div className="container mx-auto flex flex-col justify-center items-center min-h-[calc(100vh-150px)]">
      <div className="w-full max-w-md">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-5 w-full bg-white p-10 rounded-md border border-platinum">
              <div className="text-2xl font-semibold text-center">
                Login to your account
              </div>
              <label htmlFor="email" className="text-sm font-semibold">
                Email address
              </label>
              <Field
                id="email"
                name="email"
                placeholder="your@email.com"
                className="w-full  p-2 rounded-sm border border-platinum"
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
                placeholder="Your password"
                type="password"
                className="w-full p-2 rounded-sm border border-platinum"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}

              <button
                className="bg-true-blue rounded-sm px-8 py-2 w-full text-white font-medium"
                type="submit"
              >
                Sign in
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="my-2">
        Don't have account yet?{" "}
        <Link href="/register" className="text-true-blue">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
