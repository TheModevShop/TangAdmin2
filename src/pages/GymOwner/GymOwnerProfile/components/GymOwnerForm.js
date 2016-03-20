import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Button, Input} from 'react-bootstrap';
import {editGymOwnerRole} from 'actions/GymOwnerActions';


class GymOwnerForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  handleChange(role, e) {
    this.setState({role: role})
  }

  onSubmit(id, role, e) {
    e.preventDefault();   
    const isMe = _.get(this.props, 'me.details._id') === id;
    const canRemoveGymOwnerRole = _.get(this.props, 'gymOwners.gymOwners.length', false)
    if (isMe && role.name !== 'gym-owner') {
      alert('You cannot demote your own role.')
    } else if (role.name !== 'gym-owner' && !canRemoveGymOwnerRole) {
      alert('You are the last user with admin access, you cannot demote your role')
    } else {
      editGymOwnerRole(id, role._id);
    }
  }

  render() {
    const profile = _.get(this.props, 'GymOwnerProfile.profile') || {};
    const myGymId = _.get(this.props, 'user.gymDetails._id');

    const userRole = _.get(_.find(profile.gyms, {gym: myGymId}), 'role._id');
    const userId = profile._id;
    const roles = _.get(this.props, 'Roles.roles') || {};
    const rolesList = _.map(roles, (role) => {
      return (
        <Row key={role._id}>
          <Col xs={12}>
            { 
              role.name === 'gym-owner' ?
              <Input type="radio" name="role" onClick={this.handleChange.bind(this, role)} defaultChecked={userRole === role._id  ? true : false} value={role._id} label="Gym Owner"  /> :
              null
            }
          </Col>
        </Row>
      );
    });

    return (
        userId ?
        <form onSubmit={this.onSubmit.bind(this, userId, this.state.role)} className="col-xs-12">
          {rolesList}
        </form> : null
    );
  }

}

export default branch(GymOwnerForm, {
  cursors: {
    user: ['user', 'myGym'],
    me: ['user']
  },

  facets: {
    Roles: 'Roles',
    GymOwnerProfile: 'GymOwnerProfile',
    gymOwners: 'GymOwners'
  }
});



// <Row>
//   <Col xs={12}>
//     <Button disabled={!this.state.role} type="submit" value="Submit">Submit</Button>
//   </Col>
// </Row>