import React, { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import UniversityList from '../../universities/dashboard/UniversityList';
import { observer } from 'mobx-react-lite';
import SubjectList from './SubjectList';




export default observer(function SubjectDashboard() {
  const { subjectStore } = useStore();
  const { loadSubjects, subjectRegistry } = subjectStore;



  useEffect(() => {
    if (subjectRegistry.size <= 1) loadSubjects();
  }, [loadSubjects, subjectRegistry.size])





  if (subjectStore.loadingInitial) return <LoadingComponent content='Loading Subjects...' />
  return (
    <Grid>
      <Grid.Column width='10'>
        <Button style={{ marginLeft: 900, width: 180, height: 40}}
          as={NavLink}
          to="/createSubject"
          positive
          content="Add Subject"
        />
        <SubjectList />
      </Grid.Column>
    </Grid>
  )
})
