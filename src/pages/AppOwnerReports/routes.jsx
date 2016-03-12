import React from 'react';
import {Route} from 'react-router';
import Reports from './Reports';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

export default (
  <Route>
    <Route pageName="reports" path="/reports" component={Reports} onEnter={onEnter}/>
  </Route>
);