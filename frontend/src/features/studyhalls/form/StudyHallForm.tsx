
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { useStore } from '../../../app/stores/store';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StudyHall } from '../../../app/models/studyhalls';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';


export default observer(function StudyHallForm() {
    const { studyHallStore } = useStore();
    const { selectedStudyHall, createStudyHall, updateStudyHall,
        loading, loadingInitial, loadStudyHall } = studyHallStore;

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [studyhall, setStudyHall] = useState<StudyHall>({
        id: '',
        name: '',
        capacity: null,
        surface: null,
        facultyId: ''
    });


    const validationSchema = Yup.object({
        name: Yup.string().required('The study hall is required to fill'),
        capacity: Yup.string().required('The study hall capacity is required to fill'),
        surface: Yup.string().required('The study hall surface is required to fill'),
        facultyId: Yup.string().required('ID of Faculty is required to fill')
    })

    useEffect(() => {
        if (id) loadStudyHall(id).then(studyhall => setStudyHall(studyhall!));
    }, [id, loadStudyHall])


    function handleFormSubmit(studyhall: StudyHall) {
        if (studyhall.id.length === 0) {
            let newStudyHall = {
                ...studyhall,
                id: uuid()
            };
            createStudyHall(newStudyHall).then(() => navigate(`/studyhalls/${newStudyHall.id}`))
        } else {
            updateStudyHall(studyhall).then(() => navigate(`/studyhalls/${studyhall.id}`))
        }
    }


    return (
        <Segment clearing>
            <Header content='Study Hall Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={studyhall}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput name='capacity' placeholder='Capacity' />
                        <MyTextInput name='surface' placeholder='Surface' />
                        <MyTextInput name='facultyId' placeholder='ID Faculty' />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                            floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/studyhalls' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )

})