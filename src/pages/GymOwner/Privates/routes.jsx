import React from 'react';
import {Route} from 'react-router';
import Privates from './Privates';
import PrivatesProfile from './../PrivatesProfile';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

// function getComponents(location, cb) {
//   require.ensure([], (require) => {
//     cb(null, require('./Classes'));
//   });


export default (
  <Route>
    <Route pageName="privates" path="/privates" component={Privates} onEnter={onEnter}/>
    <Route pageName="privates profile" path="/privates/:id" component={PrivatesProfile} onEnter={onEnter}/>
  </Route>
);