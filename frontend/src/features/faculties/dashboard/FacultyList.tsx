import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer(function FacultyList() {
    const { facultyStore } = useStore();
    const { deleteFaculty, faculties, loading } = facultyStore;

    const [target, setTarget] = useState('');

    function handleFacultyDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteFaculty(id);
    }

    return (
        <>
        <div style={{  fontSize: '30px',padding: '25px'}}>Faculties</div> 
        <Segment>
            <Item.Group divided>
                {faculties.map((faculty) => (
                    <Item key={faculty.id}>
                        <Item.Content>
                            <Item.Header as='a'>{faculty.name}</Item.Header>
                            <Item.Description>
                                <div>Faculty email: {faculty.email}</div>
                                <div>Faculty hone number: {faculty.phoneNumber}</div>
                                <div>City: {faculty.city}</div>
                                <div>Postal Code: {faculty.postalCode}</div>
                                <div>Street: {faculty.street}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/faculties/${faculty.id}`} floated='right' content='View' color='blue' />
                                <Button
                                    name={faculty.id}
                                    loading={loading && target === faculty.id}
                                    onClick={(e) => handleFacultyDelete(e, faculty.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
        </>
    )
})

