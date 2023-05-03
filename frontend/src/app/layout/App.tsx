import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import UniversityDashboard from '../../features/universities/dashboard/UniversityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

  const {universityStore} = useStore();



  useEffect(() => {
    universityStore.loadUniversities()}, [universityStore]) 





  if(universityStore.loadingInitial) return <LoadingComponent content='Loading App...'/>

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
      <UniversityDashboard 
      />
      </Container>
</>
  );
}

export default observer (App);
