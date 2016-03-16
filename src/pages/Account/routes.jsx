import React from 'react';
import {Route} from 'react-router';
import Account from './Account';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

export default (
  <Route>
    <Route pageName="account" path="/account" component={Account} onEnter={onEnter}/>
  </Route>
);