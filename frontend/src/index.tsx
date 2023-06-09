import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './app/layout/styles.css';
import reportWebVitals from './reportWebVitals';
import {store, StoreContext } from './app/stores/store';
import { Router, RouterProvider } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { router } from './app/Routes/router';

ReactDOM.render(
  <StoreContext.Provider value={store}>
      <RouterProvider  router={router}/>
  </StoreContext.Provider>,
  document.getElementById('root')
);


reportWebVitals();