import React from 'react';
import {Route} from 'react-router';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./AddClass'));
  });
}

export default (
  <Route>
    <Route pageName="add-class" path="/add-class" getComponents={getComponents} onEnter={onEnter} />
    <Route pageName="add-class" path="/add-class/:id" getComponents={getComponents} onEnter={onEnter} />
  </Route>
);