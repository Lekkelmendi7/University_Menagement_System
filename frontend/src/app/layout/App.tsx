import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import {University} from '../models/university';
import NavBar from './Navbar';
import UniversityDashboard from '../../features/universities/dashboard/UniversityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import {v4 as uuid} from 'uuid';


function App() {

  const [universities, setUniversities]= useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity]= useState<University | undefined>(undefined);
  const [editMode, setEditMode]=useState(false);
  const [loading, setLoading]=useState(true);
  const [submitting, setSubmitting]= useState(false);

  useEffect(() => {
    agent.Universities.list().then(response=>{
      let universities: University[]= [];
      response.forEach(university =>{
        university.date = university.date.split('T')[0];
        universities.push(university);
      })
    setUniversities(universities);
    setLoading(false);
    })
  }, []) 

  function handleSelectUniversity(Id: string){
      setSelectedUniversity(universities.find(x=> x.id === Id ));
  }

  function handleCancelSelectUniversity(){
    setSelectedUniversity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectUniversity(id) : handleCancelSelectUniversity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditUniversity(university: University){
    setSubmitting(true);
    if(university.id){
      agent.Universities.update(university).then(() => {
        setUniversities([...universities.filter(x => x.id !== university.id), university])
        setSelectedUniversity(university);
        setEditMode(false);
        setSubmitting(false);
      })
    } else{
      university.id= uuid();
      agent.Universities.create(university).then(() => {
        setUniversities([...universities, university]);
        setSelectedUniversity(university);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleUniversityDelete(id: string){
    setSubmitting(true);
    agent.Universities.delete(id).then(() =>{
    setUniversities([...universities.filter(x => x.id !== id)]);
    setSubmitting(false);
    })
  }

  if(loading) return <LoadingComponent content='Loading App...'/>

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
      <UniversityDashboard 
      universities={universities}
      selectedUniversity={selectedUniversity}
      selectUniversity={handleSelectUniversity}
      cancelSelectUniversity={handleCancelSelectUniversity}
      editMode={editMode}
      openForm={handleFormOpen}
      closeForm={handleFormClose}
      createOrEdit={handleCreateOrEditUniversity}
      deleteUniversity={handleUniversityDelete}
      submitting={submitting}
      />
      </Container>
</>
  );
}

export default App;
