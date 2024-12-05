'use client'
import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Textarea, Button } from 'flowbite-react';
import $ from 'jquery';
import 'selectize/dist/css/selectize.default.css';
import 'selectize';

const categoriesList = [
  { id: 1, title: 'Category 1' },
  { id: 2, title: 'Category 2' },
  { id: 3, title: 'Category 3' },
  // Add more categories as needed
];

const AddEventPage: React.FC = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    startTime: Yup.date().required('Start time is required').nullable(),
    endTime: Yup.date()
      .required('End time is required')
      .nullable()
      .test('is-greater', 'End time must be after start time', function (value) {
        const { startTime } = this.parent;
        return value && startTime ? value > startTime : true;
      }),
    location: Yup.string().required('Location is required'),
    categories: Yup.array()
      .of(Yup.number().required('Category is required'))
      .min(1, 'At least one category is required'),
  });

  const handleSubmit = (values: any) => {
    console.log('Form data', values);
    // Here you can handle the form submission, e.g., send data to an API
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Add Event</h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
          startTime: '',
          endTime: '',
          location: '',
          categories: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <Field
                as={Input}
                type="text"
                id="title"
                name="title"
                className="mt-1"
              />
              <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Field
                as={Textarea}
                id="description"
                name="description"
                className="mt-1"
                rows={4}
              />
              <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
              <Field
                as={Input}
                type="datetime-local"
                id="startTime"
                name="startTime"
                className="mt-1"
              />
              <ErrorMessage name="startTime" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
              <Field
                as={Input}
                type="datetime-local"
                id="endTime"
                name="endTime"
                className="mt-1"
              />
              <ErrorMessage name="endTime" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <Field
                as={Input}
                type="text"
                id="location"
                name="location"
                className="mt-1"
              />
              <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Categories</label>
              <select
                id="select-categories"
                multiple
                placeholder="Pick a category..."
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                ref={(el) => {
                  if (el) {
                    $(el).selectize({
                      maxItems: null,
                      valueField: 'id',
                      labelField: 'title',
                      searchField: 'title',
                      options: categoriesList,
                      create: false,
                      onChange: (value) => {
                        const selectedValues = value.split(',').map(Number);
                        setFieldValue('categories', selectedValues);
                      },
                    });
                  }
                }}
              >
                {categoriesList.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <ErrorMessage name="categories" component="div" className="text-red-600 text-sm" />
            </div>

            <Button type="submit" className="w-full">
              Create Event
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEventPage;



// 'use client'
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Input, Textarea, Button } from 'flowbite-react';

// const categoriesList = [
//   { id: 1, name: 'Category 1' },
//   { id: 2, name: 'Category 2' },
//   { id: 3, name: 'Category 3' },
//   // Add more categories as needed
// ];

// const AddEventPage: React.FC = () => {
//   // Validation schema using Yup
//   const validationSchema = Yup.object().shape({
//     title: Yup.string().required('Title is required'),
//     description: Yup.string().required('Description is required'),
//     startTime: Yup.date().required('Start time is required').nullable(),
//     endTime: Yup.date()
//       .required('End time is required')
//       .nullable()
//       .test('is-greater', 'End time must be after start time', function (value) {
//         const { startTime } = this.parent;
//         return value && startTime ? value > startTime : true;
//       }),
//     location: Yup.string().required('Location is required'),
//     categories: Yup.array()
//       .of(Yup.number().required('Category is required'))
//       .min(1, 'At least one category is required'),
//   });

//   const handleSubmit = (values: any) => {
//     console.log('Form data', values);
//     // Here you can handle the form submission, e.g., send data to an API
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-5">Add Event</h1>
//       <Formik
//         initialValues={{
//           title: '',
//           description: '',
//           startTime: '',
//           endTime: '',
//           location: '',
//           categories: [],
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ setFieldValue, values }) => (
//           <Form className="space-y-4">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//               <Field
//                 as={Input}
//                 type="text"
//                 id="title"
//                 name="title"
//                 className="mt-1"
//               />
//               <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//               <Field
//                 as={Textarea}
//                 id="description"
//                 name="description"
//                 className="mt-1"
//                 rows={4}
//               />
//               <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
//               <Field
//                 as={Input}
//                 type="datetime-local"
//                 id="startTime"
//                 name="startTime"
//                 className="mt-1"
//               />
//               <ErrorMessage name="startTime" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
//               <Field
//                 as={Input}
//                 type="datetime-local"
//                 id="endTime"
//                 name="endTime"
//                 className="mt-1"
//               />
//               <ErrorMessage name="endTime" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
//               <Field
//                 as={Input}
//                 type="text"
//                 id="location"
//                 name="location"
//                 className="mt-1"
//               />
//               <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Categories</label>
//               {categoriesList.map(category => (
//                 <div key={category.id} className="flex items-center mb-2">
//                   <Field
//                     type="checkbox"
//                     name="categories"
//                     value={category.id}
//                     className="mr-2"
//                     onChange={() => {
//                       const currentCategories = values.categories;
//                       if (currentCategories.includes(category.id)) {
//                         setFieldValue("categories", currentCategories.filter(id => id !== category.id));
//                       } else {
//                         setFieldValue("categories", [...currentCategories, category.id]);
//                       }
//                     }}
//                   />
//                   <label className="text-sm">{category.name}</label>
//                 </div>
//               ))}
//               <ErrorMessage name="categories" component="div" className="text-red-600 text-sm" />
//             </div>

//             <Button type="submit" className="w-full">
//               Create Event
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AddEventPage;


// 'use client'
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Input, Textarea, Select, Button } from 'flowbite-react';

// const AddEventPage: React.FC = () => {
//   // Validation schema using Yup
//   const validationSchema = Yup.object().shape({
//     title: Yup.string().required('Title is required'),
//     description: Yup.string().required('Description is required'),
//     startTime: Yup.date().required('Start time is required').nullable(),
//     endTime: Yup.date()
//       .required('End time is required')
//       .nullable()
//       .test('is-greater', 'End time must be after start time', function (value) {
//         const { startTime } = this.parent;
//         return value && startTime ? value > startTime : true;
//       }),
//     location: Yup.string().required('Location is required'),
//     categories: Yup.array()
//       .of(Yup.number().required('Category is required'))
//       .min(1, 'At least one category is required'),
//   });

//   const handleSubmit = (values: any) => {
//     console.log('Form data', values);
//     // Here you can handle the form submission, e.g., send data to an API
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-5">Add Event</h1>
//       <Formik
//         initialValues={{
//           title: '',
//           description: '',
//           startTime: '',
//           endTime: '',
//           location: '',
//           categories: [],
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ setFieldValue }) => (
//           <Form className="space-y-4">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//               <Field
//                 as={Input}
//                 type="text"
//                 id="title"
//                 name="title"
//                 className="mt-1"
//               />
//               <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//               <Field
//                 as={Textarea}
//                 id="description"
//                 name="description"
//                 className="mt-1"
//                 rows={4}
//               />
//               <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
//               <Field
//                 as={Input}
//                 type="datetime-local"
//                 id="startTime"
//                 name="startTime"
//                 className="mt-1"
//               />
//               <ErrorMessage name="startTime" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
//               <Field
//                 as={Input}
//                 type="datetime-local"
//                 id="endTime"
//                 name="endTime"
//                 className="mt-1"
//               />
//               <ErrorMessage name="endTime" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
//               <Field
//                 as={Input}
//                 type="text"
//                 id="location"
//                 name="location"
//                 className="mt-1"
//               />
//               <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />
//             </div>

//             <div>
//               <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categories</label>
//               <Field
//                 as={Select}
//                 id="categories"
//                 name="categories"
//                 className="mt-1"
//                 multiple
//                 onChange={(event) => {
//                   const values = Array.from(event.target.selectedOptions, option => Number(option.value));
//                   setFieldValue("categories", values);
//                 }}
//               >
//                 <option value="">Select categories...</option>
//                 <option value="1">Category 1</option>
//                 <option value="2">Category 2</option>
//                 <option value="3">Category 3</option>
//                 {/* Add more categories as needed */}
//               </Field>
//               <ErrorMessage name="categories" component="div" className="text-red-600 text-sm" />
//             </div>

//             <Button type="submit" className="w-full">
//               Create Event
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AddEventPage;
