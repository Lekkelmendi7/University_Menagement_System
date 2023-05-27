import React, { useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import UniversityList from './UniversityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { NavLink } from 'react-router-dom';
import UniversityStore from '../../../app/stores/universityStore';





export default observer(function UniversityDashboard(){
  const {universityStore}= useStore();
  const {loadUniversities, universityRegistry}= universityStore;



  useEffect(() => {
    if(universityRegistry.size <=1 ) loadUniversities();
  }, [loadUniversities, universityRegistry.size])





  if(universityStore.loadingInitial) return <LoadingComponent content='Loading Universities...'/>
  return (
    <Grid>
    <Grid.Column width='10'>
    <Button  style={{marginLeft:1200}} 
        as={NavLink}
        to="/addUniversity"
        positive
        content="Add University"
    />
    <UniversityList/>
    </Grid.Column>
</Grid>
  )
})
