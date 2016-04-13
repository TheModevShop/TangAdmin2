import React from 'react';
import {Route} from 'react-router';
import Reports from './AppOwnerReports';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

export default (
  <Route>
    <Route pageName="reports" path="/app-owner-report" component={Reports} onEnter={onEnter}/>
  </Route>
);