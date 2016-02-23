import React from 'react';
import {Route} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./AddClass'));
  });
}

export default (
  <Route>
    <Route pageName="add-class" path="/add-class" getComponents={getComponents} />
    <Route pageName="add-class" path="/add-class/:id" getComponents={getComponents} />
  </Route>
);