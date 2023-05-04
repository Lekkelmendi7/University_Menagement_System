import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
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
  }, [loadUniversities])





  if(universityStore.loadingInitial) return <LoadingComponent content='Loading App...'/>
  return (
    <Grid>
        <Grid.Column width='10'>
         <UniversityList/>
        </Grid.Column>
        <Grid.Column width='5'>
         <h2>University filters</h2>
        </Grid.Column>
        </Grid>
  )
})
