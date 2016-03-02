import React from 'react';
import GymOwners from './GymOwners';
import {Route} from 'react-router';
import GymOwnerProfile from './../GymOwnerProfile';

// function getComponents(location, cb) {
//   require.ensure([], (require) => {
//     cb(null, require('./GymsProfile'));
//   });
// }

export default (
  <Route>
    <Route pageName="gym-owners" path="/gym-owners" component={GymOwners} />
    <Route pageName="gym-owner-profile" path="/gym-owners/:id" component={GymOwnerProfile} />
  </Route>
);