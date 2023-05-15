import React, { useEffect } from 'react'
import { Button, Card,  Image } from 'semantic-ui-react'
import { University } from '../../../app/models/university'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { format } from "date-fns";

export default observer(function UniversityDetails () {

  const {universityStore}= useStore();
  const {selectedUniversity: university, loadUniversity, loadingInitial}= universityStore;
  const {id} = useParams();

  useEffect(() => {
    if (id) loadUniversity(id);
   }, [id, loadUniversity])

  if(loadingInitial || !university) return<LoadingComponent />;

    return(
      <Card fluid>
      <Image src={`/assets/categoryImages/${university.name}.png/`} />
        <Card.Content>
          <Card.Header>{university.name}</Card.Header>
          <Card.Meta>
            <span>{format(university.date!, 'dd MMM yyyy')}</span>
          </Card.Meta>
          <Card.Description>{university.phoneNumber}</Card.Description>
          </Card.Content>
            <Card.Content extra>
              <Button.Group widths='2'>
              <Button as={Link} to={`/manage/${university.id}`} basic color='blue' content='Edit'/>
              <Button as={Link} to='/universities' basic color ='grey' content='Cancel'/>
              </Button.Group>
            </Card.Content>
    </Card>
    )
}) 
