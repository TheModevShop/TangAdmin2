import React from 'react';
import {Route} from 'react-router';
import StudentProfile from './../StudentProfile';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Students'));
  });
}

export default (
  <Route>
    <Route pageName="students" path="/students" getComponents={getComponents} />
    <Route pageName="student-profile" path="/students/:id" component={StudentProfile} />
  </Route>
);