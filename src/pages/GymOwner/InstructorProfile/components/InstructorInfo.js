import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

class InstructorInfo extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
        <Col xs={12}>
          <div className="image" style={{backgroundImage: `url(${profile.image})`}}></div>
          <div>
            <span className="name">{profile.name.first} {profile.name.last}</span>
            <span className="email">{profile.email}</span>
            <p>{profile.description}</p>
          </div>
        </Col>
    );
  }

}

export default InstructorInfo;
