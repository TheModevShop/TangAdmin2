import React from 'react';
import {Route} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./AddGym'));
  });
}

export default (
  <Route>
    <Route pageName="add-gym" path="/add-gym" getComponents={getComponents} />
  </Route>
);