import React from 'react';
import Gyms from './Gyms';
import GymsProfile from './GymsProfile';
import {Route} from 'react-router';

// function getComponents(location, cb) {
//   require.ensure([], (require) => {
//     cb(null, require('./GymsProfile'));
//   });
// }

export default (
  <Route>
    <Route pageName="gyms" path="/gyms" component={Gyms} />
    <Route pageName="gyms" path="/gyms/profile" component={GymsProfile} />
  </Route>
);