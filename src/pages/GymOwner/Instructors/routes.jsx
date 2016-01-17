import React from 'react';
import {Route} from 'react-router';
import InstructorProfile from './../InstructorProfile';

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Instructors'));
  });
}

export default (
  <Route>
    <Route pageName="instructors" path="/Instructors" getComponents={getComponents} />
    <Route pageName="instructors" path="/instructors/:id" component={InstructorProfile} />
  </Route>
);