import React from 'react';
import { Grid } from 'semantic-ui-react';
import { University } from '../../../app/models/university';
import UniversityList from './UniversityList';
import UniversityDetails from '../details/UniversityDetails';
import UniversityForm from '../form/UniversityForm';


interface Props{
    universities: University[]; 
    selectedUniversity: University | undefined;
    selectUniversity: (id: string) => void;
    cancelSelectUniversity:() => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (university: University) => void;
    deleteUniversity: (id: string)=>void;
    submitting: boolean;
}

export default function UniversityDashboard({universities, selectedUniversity, selectUniversity, 
  cancelSelectUniversity, editMode, openForm, closeForm, createOrEdit, deleteUniversity, submitting}: Props){
  return (
    <Grid>
        <Grid.Column width='10'>
         <UniversityList 
         universities={universities}
         selectUniversity={selectUniversity}
         deleteUniversity={deleteUniversity}
         submitting={submitting}
        />
        </Grid.Column>
        <Grid.Column width='5'>
         {selectedUniversity && !editMode &&
          <UniversityDetails university={selectedUniversity} 
           cancelSelectUniversity={cancelSelectUniversity}
           openForm={openForm}
           />}
           {editMode &&
          <UniversityForm submitting={submitting}
            closeForm={closeForm} university={selectedUniversity} createOrEdit={createOrEdit}/> }
        </Grid.Column>
        </Grid>
  )
}
