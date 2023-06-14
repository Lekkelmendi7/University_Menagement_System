import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import FacultyList from './FacultyList';


export default observer(function FacultyDashboard() {
  const { facultyStore } = useStore();
  const { loadFaculties, facultyRegistry } = facultyStore;

  useEffect(() => {
    if (facultyRegistry.size <= 1) loadFaculties();
  }, [loadFaculties, facultyRegistry.size])

  if (facultyStore.loadingInitial) return <LoadingComponent content='Loading Faculties...' />
  return (
    <Grid>
      <Grid.Column width='10'>
        <Button style={{ marginLeft: 900, width: 120, height: 40 }}
          as={NavLink}
          to="/createFaculty"
          positive
          content="Add Faculty"
        />
        <FacultyList />
      </Grid.Column>
    </Grid>
  )

})


