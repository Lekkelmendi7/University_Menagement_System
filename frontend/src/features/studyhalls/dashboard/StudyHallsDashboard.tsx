import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import StudyHallList from './StudyHallList';



export default observer( function StudyHallsDashboard() {
    const{studyHallStore} = useStore();
    const{loadStudyHalls, studyHallRegistry} = studyHallStore;
    
    useEffect(() => {
        if (studyHallRegistry.size <= 1 ) loadStudyHalls();
    }, [loadStudyHalls, studyHallRegistry.size])

    if (studyHallStore.loadingInitial) return <LoadingComponent content='Loading Study Halls...' />
    return(
        <Grid>
            <Grid.Column width='10'>
                <Button
                style={{ marginLeft: 900, width: 180, height: 40 }}
                as={NavLink}
                to="/createStudyHall"
                positive
                content="Add Study Hall"
                />
            <StudyHallList />
            </Grid.Column>
        </Grid>
    )
})