import React from 'react';
import tree from 'state/StateTree';
import {Route, Redirect} from 'react-router';
import ForgotPassword from './ForgotPassword';

export default (
  <Route>
    <Route pageName="forgot-password" path="/forgot-password" component={ForgotPassword} />
  </Route>
);