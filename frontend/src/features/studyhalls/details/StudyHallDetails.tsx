import React, { useEffect } from 'react'
import { useStore } from '../../../app/stores/store';
import { useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default observer(function StudyHallDetails() {
    const{studyHallStore}= useStore();
    const {selectedStudyHall: studyhall, loadStudyHall, loadingInitial}= studyHallStore;

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadStudyHall(id)
    }, [id, loadStudyHall])

    if (loadingInitial || !studyhall) return <LoadingComponent />

    
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{studyhall.name}</Card.Header>
                <Card.Description>{studyhall.capacity}</Card.Description>
                <Card.Description>{studyhall.surface}</Card.Description>
                <Card.Description>{studyhall.facultyId}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manageStudyHall/${studyhall.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/studyhalls' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )


})