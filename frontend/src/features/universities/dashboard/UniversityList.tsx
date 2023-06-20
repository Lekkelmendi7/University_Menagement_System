import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function UniversityList() {
    const { universityStore } = useStore();
    const { deleteUniversity, universitiesByDate, loading } = universityStore;

    const [target, setTarget] = useState('');

    function handleUniversityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteUniversity(id);
    }

    return (
        <>
        <div style={{  fontSize: '30px',padding: '25px'}}>University</div> 
        <Segment>
            <Item.Group divided>
                {universitiesByDate.map(university => (
                    <Item key={university.id}>
                        <Item.Content>
                            <Item.Header as='a'>{university.name}</Item.Header>
                            <Item.Meta>Date Opened: {format(university.date!, 'dd MMM yyyy h:mm aa')}</Item.Meta>
                            <Item.Description>
                                <div>University Email: {university.email}</div>
                                <div>Univiersity Phone Number: {university.phoneNumber}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/universities/${university.id}`} floated='right' content='View' color='blue' />
                                <Button
                                    name={university.id}
                                    loading={loading && target === university.id}
                                    onClick={(e) => handleUniversityDelete(e, university.id)}
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