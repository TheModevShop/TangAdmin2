import React from 'react';
import Gyms from './Gyms';
import GymProfile from 'pages/GymProfile';
import {Route} from 'react-router';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

export default (
  <Route>
    <Route pageName="gyms" path="/gyms" component={Gyms} onEnter={onEnter} />
  </Route>
);