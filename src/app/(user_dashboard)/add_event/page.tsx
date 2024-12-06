'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextInput, Textarea, Button, Select } from 'flowbite-react';


const AddEventPage: React.FC = () => {

  const [provinces, setProvinces] = useState([]);
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);

  
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
  };

  useEffect(() => {
    if (isDropdownClicked) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
        .then(response => response.json())
        .then(data => {
          setProvinces(data);
          setIsDropdownClicked(false);
        });
    }
  }, [isDropdownClicked]);


  return (
    <div className="lg:w-full mt-10 border-2 border-red-500">
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
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <Field
                as={TextInput}
                type="text"
                id="title"
                name="title"
                className="mt-1 w-full"
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

            <div className='flex gap-5 justify-between'>
              <div className='w-full'>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                <Field
                  as={TextInput}
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  className="mt-1 w-full"
                />
                <ErrorMessage name="startTime" component="div" className="text-red-600 text-sm" />
              </div>

              <div className='w-full'>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                <Field
                  as={TextInput}
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  className="mt-1 w-full"
                />
                <ErrorMessage name="endTime" component="div" className="text-red-600 text-sm" />
              </div>
            </div>

            

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <Field
                as={TextInput}
                type="text"
                id="location"
                name="location"
                className="mt-1"
              />
              <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <Field
                as={Select}
                id="location"
                name="location"
                className="mt-1 w-full"
                onClick={() => setIsDropdownClicked(true)}
              >
                <option value="">Select a province</option>
                {provinces.map((province: { id: number, name: string }) => (
                  <option key={province.id} value={province.name}>{province.name}</option>
                ))}
              </Field>
              <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />
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

{/* <div>
              <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categories</label>
              <Field
                as={Select}
                id="categories"
                name="categories"
                className="mt-1"
                multiple
                onChange={(event) => {
                  const values = Array.from(event.target.selectedOptions, option => Number(option.value));
                  setFieldValue("categories", values);
                }}
              >
                <option value="">Select categories...</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
                {/* Add more categories as needed 
              </Field>
              <ErrorMessage name="categories" component="div" className="text-red-600 text-sm" />
            </div> */}