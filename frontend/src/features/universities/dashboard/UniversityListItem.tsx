import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemDescription } from 'semantic-ui-react';
import { University } from '../../../app/models/university';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';


interface Props{
    university: University
}



export default function UniversityListItem({university}: Props){
    const {universityStore}= useStore();
    const {deleteUniversity, loading}=universityStore;
    const [target, setTarget]=useState('');

    function handleDeleteUniversity(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteUniversity(id);
    }
    return(
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
    )
}