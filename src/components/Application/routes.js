import React from 'react';
import {Route} from 'react-router';
import {checkSession} from 'actions/authenticationActions';

function getComponent(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Application'));
  });
}

function getChildRoutes(state, cb) {
  require.ensure([], (require) => {
    cb(null, [
      require('pages/Login/routes'),
      require('pages/Dashboard/routes'),
      require('pages/Gyms/routes'),
      require('pages/AddGym/routes'),
      require('pages/AppOwnerReports/routes'),

      require('pages/GymOwner/GymOwners/routes'),
      require('pages/GymOwner/GymOwnerReports/routes'),
      require('pages/GymOwner/Classes/routes'),
      require('pages/GymOwner/Instructors/routes'),
      require('pages/GymOwner/Transactions/routes'),
      require('pages/GymOwner/Students/routes'),
      require('pages/GymOwner/AddClass/routes'),
      require('pages/GymOwner/Privates/routes')
    ]);
  });
}

async function onEnter(nextState, replaceState, callback) {
  callback();
}

export default (
  <Route>
    <Route getComponent={getComponent} getChildRoutes={getChildRoutes} onEnter={onEnter} />
  </Route>
);