import React from 'react';
import {Row, Col, Button, Input} from 'react-bootstrap';


class InstructorForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      role: this.props.profile.role || null
    }
  }

  handleChange(e) {
    this.setState({role: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.role);
  }

  render() {
    const profile = this.props.profile;
    return (
        <form onSubmit={this.onSubmit.bind(this)} className="col-xs-12">
          <Row>
            <Col xs={12}>
              <Input type="radio" name="role" onClick={this.handleChange.bind(this)} defaultChecked={this.state.role === 'gym-owner' ? true : false} value="gym-owner" label="Gym Owner"  />
            </Col> 
          </Row>
          <Row>
            <Col xs={12}>
              <Input type="radio" name="role" onClick={this.handleChange.bind(this)} defaultChecked={this.state.role === 'student' ? true : false} value="student" label="Student"  />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Input type="radio" name="role" onClick={this.handleChange.bind(this)} defaultChecked={this.state.role === 'instructor' ? true : false} value="instructor" label="Instructor"  />
            </Col> 
          </Row>
          <Row>
            <Col xs={12}>
              <Button type="submit" value="Submit">Submit</Button>
            </Col>
          </Row>
        </form>
    );
  }

}

export default InstructorForm;
