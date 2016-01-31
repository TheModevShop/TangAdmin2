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
            <Link activeClassName="active" to="/dashboard">Dashboard</Link> 
          </li>
          <li> 
            <Link activeClassName="active" to="/instructors">Instructors</Link>
          </li> 
          <li> 
            <Link activeClassName="active" to="/students">Students</Link>
          </li> 
          <li> 
            <Link activeClassName="active" to="/privates">Privates</Link>
          </li> 
          <li> 
            <Link activeClassName="active" to="/classes">Classes</Link>
          </li>
          <li> 
            <Link activeClassName="active" to="/add-class">Add Class</Link>
          </li>
        </ul>
    );
  }
}

GymOwnerLinks.contextTypes = {
  history: React.PropTypes.object
};

export default GymOwnerLinks