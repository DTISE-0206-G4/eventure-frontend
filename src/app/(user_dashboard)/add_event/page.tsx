'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextInput, Textarea, Button, Select, Checkbox, Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import parseAndReformatDateTime from '@/utils/formatDateTimeForm';

interface FormValues {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
}


const AddEventPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false); 
  const router = useRouter();

  const { data: session } = useSession();

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
    location: Yup.string().required('Address is required'), 
  });
const handleSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
  try {
      const parsedValues = {
          ...values,
          startTime: parseAndReformatDateTime(values.startTime, '+07:00'),
          endTime: parseAndReformatDateTime(values.endTime, '+07:00'),
          // startTime: parseAndReformatDateTime(values.startTime),
          // endTime: parseAndReformatDateTime(values.endTime),
          categories: [],
      };

      console.log('Parsed Form data submitted: ', JSON.stringify(parsedValues, null, 2));

      const { status, data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/event`,
          parsedValues,
          {
              headers: {
                  Authorization: `Bearer ${session?.accessToken}`,
                  'Content-Type': 'application/json',
              },
          },
          
      );

      if (status === 200) {
          setModalOpen(true);
          formikHelpers.resetForm();
          router.push('/organizer_event');
      } else {
          console.error('Failed to create event', status);
      }
  } catch (error) {
      console.error('Error submitting form', error);
  }
};

  return (
    <div className="mt-10 w-1/4">
      <h1 className="text-2xl font-bold mb-5">Add Event</h1>
      
      <Formik
        initialValues={{
          title: '',
          description: '',
          startTime: '',
          endTime: '',
          location: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-4">
              <div>
                  <div className='title-container'>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="title"
                    >
                    Title
                    </label>
                    <Field
                      as={TextInput}
                      name="title"
                      type="text"
                      id="title"
                      placeholder="Your event title"
                      className="mt-1"
                      required
                    />
                    <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
                  </div>

                  <div className="description-container">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <Field 
                      as={Textarea}
                      name="description"
                      id="description"
                      placeholder="Your event description"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className='time-container'>
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                      <Field
                          as={TextInput}
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
                        as={TextInput}
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        className="mt-1"
                      />
                      <ErrorMessage name="endTime" component="div" className="text-red-600 text-sm" />
                    </div>
                  </div>

                  <div className="location-container">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                      <Field
                        as={Textarea}
                        id="location"
                        name="location"
                        className="mt-1"
                        rows={4} 
                      />
                      <ErrorMessage name="location" component="div" className="text-red-600 text-sm" />
                    </div>
                  </div>
              </div>
                
              <Button type="submit">
                Create Event
               </Button>
          </Form>
        )}
      </Formik>


    
      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Modal.Header>Event Created Successfully!</Modal.Header>
        <Modal.Body>
          <p>Your event has been successfully created.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddEventPage;