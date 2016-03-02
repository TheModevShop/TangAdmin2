import React from 'react';
import GymOwners from './GymOwners';
import {Route} from 'react-router';

// function getComponents(location, cb) {
//   require.ensure([], (require) => {
//     cb(null, require('./GymsProfile'));
//   });
// }

export default (
  <Route>
    <Route pageName="gym-owners" path="/gym-owners" component={GymOwners} />
  </Route>
);