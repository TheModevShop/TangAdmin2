import React from 'react';
import {Route} from 'react-router';
import Privates from './Privates';
import ClassProfile from './../ClassProfile';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

// function getComponents(location, cb) {
//   require.ensure([], (require) => {
//     cb(null, require('./Classes'));
//   });


export default (
  <Route>
    <Route pageName="privates" path="/privates" component={Privates} onEnter={onEnter}/>
    <Route pageName="privates profile" path="/class-profile/:id" component={ClassProfile} onEnter={onEnter}/>
  </Route>
);