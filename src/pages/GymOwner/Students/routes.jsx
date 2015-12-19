import React from 'react';
import {Route} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Students'));
  });
}

export default (
  <Route>
    <Route pageName="students" path="/students" getComponents={getComponents} />
  </Route>
);