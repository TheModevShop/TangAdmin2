import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Button, Input} from 'react-bootstrap';
import {setAsInstructor} from 'actions/StudentActions';
import RspMsg from './../../../../components/Application/components/Forms/message';


class StudentForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }

  handleChange(e) {
    this.setState({role: e.target.value})
  }

  onSubmit(id, role, e) {
    e.preventDefault();
    setAsInstructor(id, role);
  }

  render() {
    const profile = _.get(this.props, 'StudentProfile.profile') || {};
    const userRole = profile.gyms[0].role._id;
    const userId = profile._id;
    const roles = _.get(this.props, 'Roles.roles') || {};
    const rolesList = _.map(roles, (role) => {
      return (
        <Row key={role._id}>
          <Col xs={12}>
            { role.name === 'user' ?
              <Input type="radio" name="role" onClick={this.handleChange.bind(this)} defaultChecked={userRole === role._id ? true : false} value={role._id} label="Student"  /> :
            role.name === 'instructor' ?
              <Input type="radio" name="role" onClick={this.handleChange.bind(this)} defaultChecked={userRole === role._id ? true : false} value={role._id} label="Instructor"  /> :
            null
            }
          </Col>
        </Row>
      );
    });

    return (
        <form onSubmit={this.onSubmit.bind(this)} className="col-xs-12">
          {rolesList}
          <Row>
            <Col xs={12}>
              <Button type="submit" value="Submit">Submit</Button>
            </Col>
          </Row>
          <RspMsg delay={5000} responnse={this.props.response ? this.props.response : null} />
        </form>
    );
  }
}

export default branch(StudentForm, {
  cursors: {
    StudentProfile: ['views', 'StudentProfile']
  },
  facets: {
    Roles: 'Roles',
    StudentProfile: 'StudentProfile'
  }
});