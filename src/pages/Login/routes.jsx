import React from 'react';
import tree from 'state/StateTree';
import {Route, Redirect} from 'react-router';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./login'));
  });
}

function onEnter(nextState, replaceState, callback) {
  const session = tree.get(['authentication', 'sessionData']);
  if (session) {
    replaceState(null, '/dashboard');
  }
  callback();
};

export default (
  <Route>
    <Route pageName="login" path="/" getComponents={getComponents} onEnter={onEnter}/>
    <Route pageName="login" path="/login" getComponents={getComponents} onEnter={onEnter} />
  </Route>
);