import React from 'react';
import {Route} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Transactions'));
  });
}

export default (
  <Route>
    <Route pageName="transactions" path="/transactions" getComponents={getComponents}/>
  </Route>
);