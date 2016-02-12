import React from 'react';
import {branch} from 'baobab-react/higher-order';
import Router, { Link, RouteHandler } from "react-router";
import _ from 'lodash';

import AppOwnerLinks from './components/AppOwnerLinks';
import GymOwnerLinks from './components/GymOwnerLinks';

import './side-bar.less';

class SideBar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const role = _.get(this.props, 'user.role', null);
    return (
      <div className="nav-bar">

        {
          role === 'gym-owner' ? // Will have to change to gym owner
          <GymOwnerLinks /> : role === 'app-owner' ?
          <AppOwnerLinks /> : null
        }
      </div>
    );
  }
}

SideBar.contextTypes = {
  history: React.PropTypes.object
};

export default branch(SideBar, {
  cursors: {
    user: ['user']
  }
});