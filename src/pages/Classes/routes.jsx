import React from 'react';
import {Route} from 'react-router';

function getComponents(cb) {
  require.ensure([], (require) => {
    cb(null, require('./Classes'));
  });
}

export default (
  <Route>
    <Route pageName="classes" path="/classes" getComponents={getComponents} />
  </Route>
);