import React from 'react';
import Gyms from './Gyms';
import GymProfile from 'pages/GymProfile';
import {Route} from 'react-router';

// function getComponents(location, cb) {
//   require.ensure([], (require) => {
//     cb(null, require('./GymsProfile'));
//   });
// }

export default (
  <Route>
    <Route pageName="gyms" path="/gyms" component={Gyms} />
  </Route>
);