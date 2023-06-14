import React, { useEffect } from 'react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Card, Image } from 'semantic-ui-react';
import { Faculty } from '../../../app/models/faculty'
export default observer(function FacultyDetails() {

    const { facultyStore } = useStore();
    const { selectedFaculty: faculty, loadFaculty, loadingInitial } = facultyStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadFaculty(id)
    }, [id, loadFaculty])

    if (loadingInitial || !faculty) return <LoadingComponent />

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{faculty.name}</Card.Header>
                <Card.Description>{faculty.email}</Card.Description>
                <Card.Description>{faculty.phoneNumber}</Card.Description>
                <Card.Description>{faculty.city}</Card.Description>
                <Card.Description>{faculty.postalCode}</Card.Description>
                <Card.Description>{faculty.street}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manageFaculty/${faculty.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/faculties' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )

})

