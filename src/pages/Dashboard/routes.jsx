import React from 'react';
import {Route
} from 'react-router';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Dashboard'));
  });
}

export default (
  <Route>
    <Route pageName="dashboard" path="/dashboard" getComponents={getComponents} onEnter={onEnter} />
  </Route>
);