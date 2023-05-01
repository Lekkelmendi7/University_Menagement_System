import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemDescription, Segment } from 'semantic-ui-react';
import { University } from '../../../app/models/university';


interface Props{
    universities:  University[];
    selectUniversity: (id: string) => void;
    deleteUniversity: (id: string) => void;
    submitting: boolean;
}

export default function UniversityList({universities, selectUniversity, deleteUniversity, submitting}: Props){
  
    const [target, setTarget]=useState('');

    function handleDeleteUniversity(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteUniversity(id);
    }


    return(
      
        <Segment>
            <Item.Group divided>
                {universities.map(university => (
                    <Item key ={university.id}>
                        <Item.Content>
                            <Item.Header as ='a'>{university.name}</Item.Header>
                            <Item.Meta>{university.date}</Item.Meta>
                            <ItemDescription>
                                <div>{university.email}</div>
                                <div>{university.phoneNumber}</div>
                            </ItemDescription>
                            <Item.Extra>
                                <Button onClick={() => selectUniversity(university.id)} floated='right' content='View' color='blue'/>
                                <Button 
                                name={university.id}
                                loading={submitting && target === university.id}
                                onClick={(e) => handleDeleteUniversity(e, university.id)} 
                                floated='right' 
                                content='Delete' 
                                color='red'/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
                
            </Item.Group>
        </Segment>
    )
}