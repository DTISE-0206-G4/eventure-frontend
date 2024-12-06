import { Field, Form, ErrorMessage } from "formik";
import { ChangeProfileRequest } from "@/types/profile";

const ProfileDetailsForm = ({
  profile,
  handleSubmit,
  errors,
  touched,
}: any) => {
  return (
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
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )}
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
            {errors.description && touched.description && (
              <div className="text-red-500">{errors.description}</div>
            )}
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
  );
};

export default ProfileDetailsForm;
