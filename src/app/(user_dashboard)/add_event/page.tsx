'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextInput, Textarea, Button, Select, Checkbox, Modal } from 'flowbite-react';


interface FormValues {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  address: string;
  categories: never[];
  province: string;
  regency: string;
}

interface Province {
  id: number;
  name: string;
}

interface Regency {
  id: number;
  name: string;
}

const AddEventPage: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [categories] = useState([
    { id: 1, name: 'Online' },
    { id: 2, name: 'Offline' },
    { id: 3, name: 'Concert' },
    { id: 4, name: 'MeetNGreet' },
    { id: 5, name: 'Seminar' },
    { id: 6, name: 'Exhibition' },
    { id: 7, name: 'Sport' },
  ]);

  const [modalOpen, setModalOpen] = useState(false); 

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
    address: Yup.string().required('Address is required'), 
    categories: Yup.array()
      .of(Yup.number().required('Category is required'))
      .min(1, 'At least one category is required'),
    province: Yup.string().required('Province is required'),
    regency: Yup.string().required('Regency is required'),
  });

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>, setFieldValue: (field: string, value: any) => void) => {
    const provinceId = event.target.value; 
    setSelectedProvince(provinceId);
    setRegencies([]); 

    
    setFieldValue('province', provinceId); 

    if (provinceId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
        .then(response => response.json())
        .then(data => {
          setRegencies(data); 
        });
    }
  };



  
  // const handleSubmit = async (values: FormValues,formikHelpers: FormikHelpers<FormValues>) => {
  //    try {
  //     console.log('Form data submitted: ', JSON.stringify(values, null, 2)); 
  //     setModalOpen(true); 
  //    } catch (error) {
  //     console.log("hehe")
  //   }
  // };
  const handleSubmit = async (values: FormValues) => {
    try {
      const selectedProvinceName = provinces.find(p => p.id === Number(values.province))?.name;
      const selectedRegencyName = regencies.find(r => r.id === Number(values.regency))?.name;

    
      const submittedData = {
        ...values,
        province: selectedProvinceName, 
        regency: selectedRegencyName, 
      };

      console.log('Form data submitted: ', JSON.stringify(submittedData, null, 2)); // Log modified data
      setModalOpen(true); 
    } catch (error) {
      console.error('Error submitting form', error); 
    };
  }

  useEffect(() => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      .then(response => response.json())
      .then(data => {
        setProvinces(data); 
      });
  }, []); 

  return (
    <div className="mt-10 w-1/4">
      <h1 className="text-2xl font-bold mb-5">Add Event</h1>
      
      <Formik
        initialValues={{
          title: '',
          description: '',
          startTime: '',
          endTime: '',
          address: '',
          categories: [],
          province: '',
          regency: '',
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
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <div>
                      <Field 
                        as={Select}
                        id="province"
                        name="province"
                        className="mt-1"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleProvinceChange(e, setFieldValue)}
                      >
                        <option value="">Select a province</option>
                          {provinces.map((province: { id: number, name: string }) => (
                            <option key={province.id} value={province.id}>{province.name}</option>
                          ))}                        
                      </Field>
                      <ErrorMessage name="province" component="div" className="text-red-600 text-sm" />
                    </div>


                    <div>
                      <label htmlFor="regency" className="block text-sm font-medium text-gray-700">Regency</label>
                      <Field
                        as={Select}
                        id="regency"
                        name="regency"
                        className="mt-1"
                      >
                        <option value="">Select a regency</option>
                        {regencies.map((regency: { id: number, name: string }) => (
                          <option key={regency.id} value={regency.id}>{regency.name}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="regency" component="div" className="text-red-600 text-sm" />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                      <Field
                        as={Textarea}
                        id="address"
                        name="address"
                        className="mt-1"
                        rows={4} 
                      />
                      <ErrorMessage name="address" component="div" className="text-red-600 text-sm" />
                    </div>
                  </div>

                  <div className='categories-container'>
                    <label className="block text-sm font-medium text-gray-700">Categories</label>
                    <div className="space-y-2 mt-2">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center">
                          <Field
                            type="checkbox"
                            id={`category-${category.id}`}
                            name="categories"
                            value={category.id}
                            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                              const { checked } = target;
                              const newCategories = checked
                                ? [...values.categories, Number(category.id)]
                                : values.categories.filter(id => id !== Number(category.id));
                              setFieldValue('categories', newCategories);
                              console.log('Selected categories:', newCategories);
                            }}
                            as={Checkbox}
                          />
                          <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <ErrorMessage name="categories" component="div" className="text-red-600 text-sm" />
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