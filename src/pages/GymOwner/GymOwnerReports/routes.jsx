import React from 'react';
import {Route} from 'react-router';
import GymOwnerReports from './GymOwnerReports';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

export default (
  <Route>
    <Route pageName="gymOwnerGymOwnerReports" path="/gym-owner-reports" component={GymOwnerReports} onEnter={onEnter}/>
  </Route>
);