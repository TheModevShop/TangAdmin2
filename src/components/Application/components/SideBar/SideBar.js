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
    const name = _.get(this.props, 'user.details.name', null);
    const user = _.get(this.props, 'user.details', {});
    const gym = _.get(this.props, 'user.myGym.gymDetails.name', null);
    const nameFormatted = name ? name.first +' '+name.last : null;
    const role = _.get(this.props, 'user.role', null);
    return (
      <div className="nav-bar">
        <div className="current-user">
          <div className="img" style={{backgroundImage: "url('http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg')"}}></div>
          <div className="title-group">
            <div className="name">{nameFormatted}</div>
            <div className="gym">{gym}</div>
          </div>
        </div>

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