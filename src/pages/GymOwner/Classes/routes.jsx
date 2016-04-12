import React from 'react';
import {Route} from 'react-router';
import Classes from './Classes';
import ClassProfile from './../ClassProfile';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

export default (
  <Route>
    <Route pageName="classes" path="/classes" component={Classes} onEnter={onEnter} />
    <Route pageName="classes" path="/class-profile/:id" component={ClassProfile} onEnter={onEnter} />
  </Route>
);