import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default observer(function StudyHallList()  {
    const {studyHallStore} = useStore();
    const { deleteStudyHall, studyhalls, loading } = studyHallStore;

    const [target, setTarget]= useState('');

    function handleStudyHallDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteStudyHall(id);
    }

    
    return (
        <>
            <div style={{ fontSize: '30px', padding: '25px' }}>Study Halls</div>
            <Segment>
                <Item.Group divided>
                    {studyhalls.map((studyhall) => (
                        <Item key={studyhall.id}>
                            <Item.Content>
                                <Item.Header as='a'>{studyhall.name}</Item.Header>
                                <Item.Description>
                                    <div>Capacity: {studyhall.capacity} seats</div>
                                    <div>Surface: {studyhall.surface} m2</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button as={Link} to={`/studyhalls/${studyhall.id}`} floated='right' content='View' color='blue' />
                                    <Button
                                        name={studyhall.id}
                                        loading={loading && target === studyhall.id}
                                        onClick={(e) => handleStudyHallDelete(e, studyhall.id)}
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