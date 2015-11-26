import React from 'react';
import {Route} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./GymProfile'));
  });
}

export default (
  <Route>
    <Route pageName="gym-profile" path="/gym-profile" getComponents={getComponents} />
  </Route>
);