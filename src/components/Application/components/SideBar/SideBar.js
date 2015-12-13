import React from 'react';
import {branch} from 'baobab-react/higher-order';
import Router, { Link, RouteHandler } from "react-router";

import AppOwnerLinks from './components/AppOwnerLinks';
import GymOwnerLinks from './components/GymOwnerLinks';

import './side-bar.less';

class SideBar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const name = _.get(this.props, 'user.details.name', {});
    const user = _.get(this.props, 'user.details', {});
    const gym = _.get(this.props, 'user.myGym.gymDetails.name', {});
    return (
      <div className="nav-bar">
        <div className="current-user">
          <div className="img"></div>
          <div className="name">{name.first} {name.last}</div>
          <div className="gym">{gym}</div>
        </div>
        {
          user.roles ?
          <GymOwnerLinks /> :
          <AppOwnerLinks />
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