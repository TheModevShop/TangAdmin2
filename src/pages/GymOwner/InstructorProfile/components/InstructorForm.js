import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Button, Input} from 'react-bootstrap';
import {makeGymOwner} from 'actions/InstructorActions';


class InstructorForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  handleChange(e) {
    this.setState({role: e.target.value})
  }

  onSubmit(id, role, e) {
    e.preventDefault();
    makeGymOwner(id, role);
  }

  render() {
    const profile = _.get(this.props, 'InstructorProfile.profile') || {};
    const myGymId = _.get(this.props, 'user.gymDetails._id');
    const userRole = _.get(_.find(profile.gyms, {gym: myGymId}), 'role._id');
    const userId = profile._id;
    const roles = _.get(this.props, 'Roles.roles') || {};
    const rolesList = _.map(roles, (role) => {
      return (
        <Row key={role._id}>
          <Col xs={12}>
            { role.name === 'user' ?
              <Input type="radio" name="role" onClick={this.handleChange.bind(this)} defaultChecked={userRole === role._id ? true : false} value={role._id} label="Student"  /> :
            role.name === 'instructor' ?
              <Input type="radio" name="role" onClick={this.handleChange.bind(this)} defaultChecked={userRole === role._id  ? true : false} value={role._id} label="Instructor"  /> :
            null
            }
          </Col>
        </Row>
      );
    });

    return (
        <form onSubmit={this.onSubmit.bind(this, userId, this.state.role)} className="col-xs-12">
          {rolesList}
          <Row>
            <Col xs={12}>
              <Button type="submit" value="Submit">Submit</Button>
            </Col>
          </Row>
        </form>
    );
  }

}

export default branch(InstructorForm, {
  cursors: {
    InstructorProfile: ['views', 'InstructorProfile'],
    user: ['user', 'myGym']
  },
  facets: {
    Roles: 'Roles',
    InstructorProfile: 'InstructorProfile'
  }
});