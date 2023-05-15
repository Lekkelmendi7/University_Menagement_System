import React, { useEffect, useState} from 'react';
import { Link, Navigate, useNavigate, useParams} from "react-router-dom";
import { Button,  FormField,  Header,  Label,  Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import {v4 as uuid} from 'uuid';
import { Formik, Form, ErrorMessage } from "formik";
import { University } from '../../../app/models/university';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyDateInput from '../../../app/common/form/MyDateInput';



export default observer (function UniversityForm() {
    const {universityStore}= useStore();
    const {selectedUniversity,createUniversity, updateUniversity, 
        loading, loadingInitial, loadUniversity}= universityStore;
        
    const {id}=useParams<{id: string}>();
    const navigate = useNavigate();

    const[university, setUniversity]= useState<University>({
        id:'',
        name:'',
        date: null,
        email:'',
        phoneNumber:''
    });


    const validationSchema = Yup.object({
        name: Yup.string().required('The university name is required to fill'),
        date: Yup.string().required('The university date  is required to fill'),
        email: Yup.string().required('The university email is required to fill'),
        phoneNumber: Yup.string().required('Phone number is required to fill'),
    })

    useEffect(() => {
        if (id) loadUniversity(id).then(university => setUniversity(university!));
    }, [id, loadUniversity])


    function handleFormSubmit(university: University) {
        if(university.id.length === 0){
            let newUniversity = {
                ...university,
                id: uuid()
            };
            createUniversity(newUniversity).then(() => navigate(`/universities/${university.id}`))
        }else{
            updateUniversity(university).then(() => navigate(`/universities/${university.id}`))
        }
    }

   // if(loadingInitial) return <LoadingComponent  content='Loading university...'/>
    return(
        <Segment clearing>
            <Header content ='University Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={university}
            onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                     <MyTextInput  name='name' placeholder='Name'/>
                     <MyDateInput 
                     placeholderText='Date'
                     name='date' 
                     showTimeSelect
                     timeCaption='time'
                     dateFormat='MMMM d, yyyy'
                     />
                     <MyTextInput  name='email' placeholder='Email'/>
                     <MyTextInput  name='phoneNumber' placeholder='Phone Number' />
                     <Button component={Link} to={`/manage/${university.id}`}
                    disabled={isSubmitting || !dirty || !isValid}
                     floated='right' positive type='submit' content='Submit'/>
                     <Button as={Link} to='/universities' floated='right' type='button' content='Cancel'/>
                 </Form>
                )}
            </Formik>
        </Segment>
    )

})
