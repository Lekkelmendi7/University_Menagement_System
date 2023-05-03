import React from 'react'
import { Button, Card,  Image } from 'semantic-ui-react'
import { University } from '../../../app/models/university'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default function CardExampleCard () {

  const {universityStore}= useStore();
  const {selectedUniversity: university, cancelSelectedUniversity, openForm}= universityStore;

  if(!university) return<LoadingComponent />;

    return(
  <Card>
    <Image src= {`/assets/universityImages/${university.name}.png`} />
    <Card.Content>
      <Card.Header>{university.name}</Card.Header>
      <Card.Meta>
        <span>{university.date}</span>
      </Card.Meta>
      <Card.Description>
        {university.email}
        </Card.Description>
        <Card.Description>
        {university.phoneNumber}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group width='2'>
        <Button onClick={() => openForm(university.id)} basic color='blue' content='Edit'/>
        <Button onClick={cancelSelectedUniversity} basic color='grey' content='Cancel'/>
      </Button.Group>
    </Card.Content>
  </Card>
    )
}
