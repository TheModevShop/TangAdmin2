import React from 'react';
import GymOwners from './GymOwners';
import {Route} from 'react-router';
import GymOwnerProfile from './../GymOwnerProfile';
import authOnEnter from 'utility/authOnEnter';

const onEnter = authOnEnter('login');


export default (
  <Route>
    <Route pageName="gym-owners" path="/gym-owners" component={GymOwners} onEnter={onEnter} />
    <Route pageName="gym-owner-profile" path="/gym-owners/:id" component={GymOwnerProfile} onEnter={onEnter} />
  </Route>
);