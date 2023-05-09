import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import UniversityListItem from './UniversityListItem';

export default observer(function UniversityList(){
  
    const {universityStore}= useStore();
    const {universitiesByDate}=universityStore;

    return(
      
        <Segment>
            <Item.Group divided>
                {universitiesByDate.map(university => (
                    <UniversityListItem key={university.id} university={university} />
                ))}
                
            </Item.Group>
        </Segment>
    )
})