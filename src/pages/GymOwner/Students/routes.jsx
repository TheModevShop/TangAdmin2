import React from 'react';
import {Route} from 'react-router';
import StudentProfile from './../StudentProfile';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Students'));
  });
}

export default (
  <Route>
    <Route pageName="students" path="/students" getComponents={getComponents} onEnter={onEnter}/>
    <Route pageName="student-profile" path="/students/:id" component={StudentProfile} onEnter={onEnter}/>
  </Route>
);