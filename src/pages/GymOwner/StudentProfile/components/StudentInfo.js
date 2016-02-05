import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

class Student extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <Col xs={12}>
                <img />
                <div>
                  <span className="name">{profile.name.first} {profile.name.last}</span>
                  <span className="email">{profile.email}</span>
                </div>
              </Col>
    );
  }

}

export default Student;
