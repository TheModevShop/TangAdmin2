import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';

class InstructorInfo extends React.Component {
  render() {
    const profile = _.get(this.props, 'InstructorProfile.profile') || {};
    return (
        <Col xs={12}>
          {
            profile.name ?
              <div>
                <div className="image" style={profile.image ? {backgroundImage: `url(${profile.image})`} : {backgroundImage: "url('/src/images/profile.png')"}}></div>
                <div>
                  <span className="name">{profile.name.first} {profile.name.last}</span>
                  <span className="email">{profile.email}</span>
                </div>
              </div>
            : null
          }
        </Col>
    );
  }
}

export default branch(InstructorInfo, {
  cursors: {
    InstructorProfile: ['views', 'InstructorProfile']
  },
  facets: {
    InstructorProfile: 'InstructorProfile'
  }
});