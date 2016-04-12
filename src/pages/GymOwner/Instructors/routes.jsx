import React from 'react';
import {Route} from 'react-router';
import InstructorProfile from './../InstructorProfile';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

function getComponents(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Instructors'));
  });
}

export default (
  <Route>
    <Route pageName="instructors" path="/Instructors" getComponents={getComponents} onEnter={onEnter}/>
    <Route pageName="instructors" path="/Instructors/:id" component={InstructorProfile} onEnter={onEnter}/>
  </Route>
);