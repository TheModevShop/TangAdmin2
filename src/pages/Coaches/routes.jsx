import React from 'react';
import {Route} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Coaches'));
  });
}

export default (
  <Route>
    <Route pageName="coaches" path="/coaches" getComponents={getComponents} />
  </Route>
);