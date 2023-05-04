import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemDescription, Segment } from 'semantic-ui-react';
import { University } from '../../../app/models/university';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

export default observer(function UniversityList(){
  
    const {universityStore}= useStore();
    const {deleteUniversity, universitiesByDate, loading}=universityStore;
    const [target, setTarget]=useState('');

    function handleDeleteUniversity(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteUniversity(id);
    }

    return(
      
        <Segment>
            <Item.Group divided>
                {universitiesByDate.map(university => (
                    <Item key ={university.id}>
                        <Item.Content>
                            <Item.Header as ='a'>{university.name}</Item.Header>
                            <Item.Meta>{university.date}</Item.Meta>
                            <ItemDescription>
                                <div>{university.email}</div>
                                <div>{university.phoneNumber}</div>
                            </ItemDescription>
                            <Item.Extra>
                                <Button as={Link} to={`/universities/${university.id}`} 
                                floated='right' 
                                content='View' 
                                color='blue'
                                />
                                <Button 
                                loading={loading && target === university.id}
                                name={university.id}
                                floated='right' 
                                content='Delete' 
                                color='red'
                                onClick={(e) => handleDeleteUniversity(e, university.id)} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
                
            </Item.Group>
        </Segment>
    )
})