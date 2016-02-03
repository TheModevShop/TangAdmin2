import React from 'react';
import {Row, Col, Button, Input} from 'react-bootstrap';
import {setAsInstructor} from 'actions/StudentActions';


class StudentForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      role: this.props.profile.gyms[0].role._id || null,
      userId: this.props.profile._id
    }
  }

  handleChange(e) {
    this.setState({role: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    
    setAsInstructor(this.state.userId, this.state.role);
  }

  render() {
    const profile = this.props.profile;
    const roles = this.props.roles;
    const rolesList = _.map(roles, (role) => {
      return (
        <Row key={role._id}>
          <Col xs={12}>
            { role.name === 'user' ?
              <Input type="radio" name="role" onClick={this.handleChange.bind(this)} defaultChecked={this.state.role === role._id ? true : false} value={role._id} label="Student"  /> :
            role.name === 'instructor' ?
              <Input type="radio" name="role" onClick={this.handleChange.bind(this)} defaultChecked={this.state.role === role._id ? true : false} value={role._id} label="Instructor"  /> :
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
        </form>
    );
  }

}

export default StudentForm;
