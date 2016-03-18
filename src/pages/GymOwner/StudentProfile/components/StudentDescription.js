import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';

class StudentDescription extends React.Component {
  render() {
    const profile = _.get(this.props, 'StudentProfile.profile') || null;
    return (
        <Col xs={12}>
          { profile ?
            <p>
              {
                profile.bio ? 
                  <p>{profile.bio}</p>
                :
                  <p>{profile.name.first} has not provided a description.</p>
              }
            </p>
          : null
          }
          
        </Col>
    );
  }
}

export default branch(StudentDescription, {
  cursors: {
    StudentProfile: ['views', 'StudentProfile']
  },
  facets: {
    StudentProfile: 'StudentProfile'
  }
});