import React from 'react';
import {branch} from 'baobab-react/higher-order';
import Router, { Link, RouteHandler } from "react-router";
import './side-bar.less';

class SideBar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const user = _.get(this.props, 'user.details.name');
    return (
      <div className="nav-bar">
        <div className="current-user">
          <div className="img"></div>
          <div className="name">{user.first} {user.last}</div>
        </div>
        <ul>
          <li> 
            <Link to="dashboard">Dashboard</Link> 
          </li>
          <li> 
            <Link to="gyms">Gyms</Link>
          </li> 
          <li> 
            <Link to="add-gym">Add Gym</Link>
          </li> 
        </ul>
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