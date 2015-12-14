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
      require('pages/Classes/routes'),
      require('pages/Coaches/routes'),
      require('pages/Transactions/routes'),
      require('pages/Gyms/routes'),
      require('pages/AddGym/routes')
    ]);
  });
}

function onEnter(nextState, replaceState, callback) {
  callback();
}

export default (
  <Route>
    <Route getComponent={getComponent} getChildRoutes={getChildRoutes} onEnter={onEnter} />
  </Route>
);