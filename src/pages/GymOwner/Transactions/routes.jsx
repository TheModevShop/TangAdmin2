import React from 'react';
import {Route} from 'react-router';
import TransactionProfile from './../TransactionProfile';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Transactions'));
  });
}

export default (
  <Route>
    <Route pageName="transactions" path="/transactions" getComponents={getComponents} onEnter={onEnter}/>
    <Route pageName="transaction-profile" path="/transactions/:id" component={TransactionProfile} onEnter={onEnter}/>
  </Route>
);