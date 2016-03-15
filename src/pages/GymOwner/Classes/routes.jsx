import React from 'react';
import {Route} from 'react-router';
import Classes from './Classes';
import ClassProfile from './../ClassProfile';

// function getComponents(location, cb) {
//   require.ensure([], (require) => {
//     cb(null, require('./Classes'));
//   });


export default (
  <Route>
    <Route pageName="classes" path="/classes" component={Classes} />
    <Route pageName="classes" path="/class-profile/:id" component={ClassProfile} />
  </Route>
);