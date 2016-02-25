import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';

class StudentInfo extends React.Component {
  render() {
    const profile = _.get(this.props, 'StudentProfile.profile') || {};
    return (
      <Col xs={12}>
        {
          profile.name ?
            <div>
              <div className="image" style={{backgroundImage: `url(${profile.image})`}}></div>
              <div>
                <span className="name">{profile.name.first} {profile.name.last}</span>
                <span className="email">{profile.email}</span>
                <p>{profile.description}</p>
              </div>
            </div>
          : null
        }
      </Col>
    );
  }
}

export default branch(StudentInfo, {
  cursors: {
    StudentProfile: ['views', 'StudentProfile']
  },
  facets: {
    StudentProfile: 'StudentProfile'
  }
});