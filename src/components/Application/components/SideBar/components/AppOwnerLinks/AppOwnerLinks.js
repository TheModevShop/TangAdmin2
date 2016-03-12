import React from 'react';
import {Link} from "react-router";

class AppOwnerLinks extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
        <ul>
          <li> 
            <Link activeClassName="active" to="/dashboard">Dashboard</Link> 
          </li>
          <li> 
            <Link activeClassName="active" to="/gyms">Gyms</Link>
          </li> 
          <li> 
            <Link activeClassName="active" to="/add-gym">Add Gym</Link>
          </li>
          <li> 
            <Link activeClassName="active" to="/app-owner-report">Reports</Link>
          </li>
        </ul>
    );
  }
}

AppOwnerLinks.contextTypes = {
  history: React.PropTypes.object
};

export default AppOwnerLinks