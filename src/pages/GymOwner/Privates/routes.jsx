import React from 'react';
import {Route} from 'react-router';
import Privates from './Privates';
import PrivatesProfile from './../PrivatesProfile';

// function getComponents(location, cb) {
//   require.ensure([], (require) => {
//     cb(null, require('./Classes'));
//   });


export default (
  <Route>
    <Route pageName="privates" path="/privates" component={Privates} />
    <Route pageName="privates profile" path="/privates/:id" component={PrivatesProfile} />
  </Route>
);