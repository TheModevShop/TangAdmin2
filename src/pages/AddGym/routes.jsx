import React from 'react';
import {Route} from 'react-router';
import AddGym from './AddGym';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');

export default (
  <Route>
    <Route pageName="add-gym" path="/add-gym" component={AddGym} onEnter={onEnter}/>
    <Route pageName="add-gym-profile" path="/add-gym/:id" component={AddGym} onEnter={onEnter}/>
    <Route pageName="edit-gym-profile" path="/edit-gym/:id" component={AddGym} onEnter={onEnter}/>
    <Route pageName="view-gym-profile" path="/view-gym/:id" component={AddGym} onEnter={onEnter}/>
  </Route>
);