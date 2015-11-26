import React from 'react';
import {Route
} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Dashboard'));
  });
}

export default (
  <Route>
    <Route pageName="dashboard" path="/dashboard" getComponents={getComponents} />
  </Route>
);