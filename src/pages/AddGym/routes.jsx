import React from 'react';
import {Route} from 'react-router';
import AddGym from './AddGym';


export default (
  <Route>
    <Route pageName="add-gym" path="/add-gym" component={AddGym} />
    <Route pageName="add-gym-profile" path="/add-gym/:id" component={AddGym} />
    <Route pageName="edit-gym-profile" path="/edit-gym/:id" component={AddGym} />
  </Route>
);