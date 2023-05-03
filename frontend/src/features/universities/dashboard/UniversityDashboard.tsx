import React from 'react';
import { Grid } from 'semantic-ui-react';
import UniversityList from './UniversityList';
import UniversityDetails from '../details/UniversityDetails';
import UniversityForm from '../form/UniversityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';





export default observer(function UniversityDashboard(){
  const {universityStore}= useStore();
  const {selectedUniversity, editMode} = universityStore;
  return (
    <Grid>
        <Grid.Column width='10'>
         <UniversityList
        />
        </Grid.Column>
        <Grid.Column width='5'>
         {selectedUniversity && !editMode &&
          <UniversityDetails 
         
         />}
           {editMode &&
          <UniversityForm
           /> }
        </Grid.Column>
        </Grid>
  )
})
