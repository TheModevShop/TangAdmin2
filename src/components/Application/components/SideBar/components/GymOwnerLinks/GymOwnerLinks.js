import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from "react-router";

class GymOwnerLinks extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const id = _.get(this.props, 'user.myGym.gymDetails._id', null);
    return (
        <ul>
          <li> 
            <Link activeClassName="active" to="/dashboard">Dashboard</Link> 
          </li>
          <li> 
            <Link activeClassName="active" to={`/edit-gym/${id}`}>Edit Gym</Link> 
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
            <Link activeClassName="active" to="/transactions">Transactions</Link>
          </li>
          <li> 
            <Link activeClassName="active" to="/gym-owner-reports">Reports</Link>
          </li>
        </ul>
    );
  }
}

GymOwnerLinks.contextTypes = {
  history: React.PropTypes.object
};

export default branch(GymOwnerLinks, {
  cursors: {
    user: ['user']
  }
});

// <li> 
// <Link activeClassName="active" to="/gym-owners">Gym Owners</Link>
// </li>