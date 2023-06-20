import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, FormField, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from 'uuid';
import { Formik, Form, ErrorMessage } from "formik";
import { Faculty } from '../../../app/models/faculty';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MySelectInput from '../../../app/common/form/MySelectedInput';
import { cityOptions } from '../../../app/common/options/cityOptions';
import { zipCodeOptions } from '../../../app/common/options/zipCodeOptions';



export default observer(function FacultyForm() {
    const { facultyStore } = useStore();
    const { selectedFaculty, createFaculty, updateFaculty,
        loading, loadingInitial, loadFaculty } = facultyStore;

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [faculty, setFaculty] = useState<Faculty>({
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        postalCode: null,
        street: '',
        universityId: '',
    });


    const validationSchema = Yup.object({
        name: Yup.string().required('The university name is required to fill'),
        email: Yup.string().required('The university email is required to fill'),
        phoneNumber: Yup.string().required('Phone number is required to fill'),
        city: Yup.string().required('City is required to fill'),
        postalCode: Yup.string().required('Postal code is required to fill'),
        street: Yup.string().required('Street is required to fill'),
        universityId: Yup.string().required('University ID is required to fill'),
    })

    useEffect(() => {
        if (id) loadFaculty(id).then(faculty => setFaculty(faculty!));
    }, [id, loadFaculty])


    function handleFormSubmit(faculty: Faculty) {
            if (faculty.id.length === 0) {
                let newFaculty = {
                ...faculty,
                id: uuid()
            };
            createFaculty(newFaculty).then(() => navigate(`/faculties/${newFaculty.id}`))
        } else {
            updateFaculty(faculty).then(() => navigate(`/faculties/${faculty.id}`))
        }
    }

    // if(loadingInitial) return <LoadingComponent  content='Loading faculty...'/>
    return (
        <Segment clearing>
            <Header content='Faculty Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={faculty}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput name='email' placeholder='Email' />
                        <MyTextInput name='phoneNumber' placeholder='Phone Number' />
                        <MySelectInput options={cityOptions} name='city' placeholder='City' />
                        <MySelectInput options={zipCodeOptions} name='postalCode' placeholder='Postal Code' />
                        <MyTextInput name='street' placeholder='Street' />
                        <MyTextInput name='universityId' placeholder='University ID' />

                        <Button
                            loading={loading}
                            disabled={isSubmitting || !dirty || !isValid}
                            floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/faculties' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )

})

