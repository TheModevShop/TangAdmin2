import React from 'react';
import {Link} from "react-router";

class GymOwnerLinks extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
        <ul>
          <li> 
            <Link to="/dashboard">Dashboard</Link> 
          </li>
          <li> 
            <Link to="/gyms">Instructors</Link>
          </li> 
          <li> 
            <Link to="/add-gym">Privates</Link>
          </li> 
          <li> 
            <Link to="/add-gym">Classes</Link>
          </li> 
        </ul>
    );
  }
}

GymOwnerLinks.contextTypes = {
  history: React.PropTypes.object
};

export default GymOwnerLinks