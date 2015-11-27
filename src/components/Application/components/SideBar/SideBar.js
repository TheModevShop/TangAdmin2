import React from 'react';
import history from 'appHistory';
import Router, { Link, RouteHandler } from "react-router";
import classNames from "classnames";
import './side-bar.less';

class Header extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <div className="nav-bar">
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

Header.contextTypes = {
  history: React.PropTypes.object
};

export default Header;