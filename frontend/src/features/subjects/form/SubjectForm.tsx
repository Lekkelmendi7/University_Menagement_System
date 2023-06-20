import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useNavigate, useParams } from "react-router";
import { Subject } from "../../../app/models/subject";
import { useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import MySelectedInput from "../../../app/common/form/MySelectedInput";
import { subjectCategoryOptions } from "../../../app/common/options/subjectCategoryOptions";
import { ectsOptions } from "../../../app/common/options/ectsOptions";

export default observer(function SubjectForm() {
    const { subjectStore } = useStore();
    const { selectedSubject, createSubject, updateSubject,
        loading, loadingInitial, loadSubject } = subjectStore;

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [subject, setSubject] = useState<Subject>({
        id: '',
        name: '',
        category: '',
        ects: null,
    });


    const validationSchema = Yup.object({
        name: Yup.string().required('The subject name is required to fill'),
        category: Yup.string().required('The subject category is required to fill'),
        ects: Yup.string().required('The subject credits is required to fill'),
    })

    useEffect(() => {
        if (id) loadSubject(id).then(subject => setSubject(subject!));
    }, [id, loadSubject])


    function handleFormSubmit(subject: Subject) {
        if (subject.id.length === 0) {
            let newSubject = {
                ...subject,
                id: uuid()
            };
            createSubject(newSubject).then(() => navigate(`/subjects/${newSubject.id}`))
        } else {
            updateSubject(subject).then(() => navigate(`/subjects/${subject.id}`))
        }
    }


    return (
        <Segment clearing>
            <Header content='Subject Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={subject}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MySelectedInput options={subjectCategoryOptions} name='category' placeholder='Category' />
                        <MySelectedInput options={ectsOptions} name='ects' placeholder='ECTS' />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                            floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/subjects' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )

})