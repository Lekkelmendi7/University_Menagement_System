import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './Navbar';
import UniversityDashboard from '../../features/universities/dashboard/UniversityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import NotFound from '../../features/errors/NotFound';
import TestErrors from '../../features/errors/TestErrors';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import UniversityDetails from '../../features/universities/details/UniversityDetails';
import UniversityForm from '../../features/universities/form/UniversityForm';



const App = () => {
  const location = useLocation();
  const { commonStore, userStore } = useStore();


  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading App...' />



    return (
      <>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage /> : (
        <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
        <Outlet />
        </Container>
        </>
      )}
  
    </>
    );
  }

export default observer(App);
