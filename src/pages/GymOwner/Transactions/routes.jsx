import React from 'react';
import {Route} from 'react-router';
import TransactionProfile from './../TransactionProfile';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Transactions'));
  });
}

export default (
  <Route>
    <Route pageName="transactions" path="/transactions" getComponents={getComponents}/>
    <Route pageName="transaction-profile" path="/transactions/:id" component={TransactionProfile} />
  </Route>
);