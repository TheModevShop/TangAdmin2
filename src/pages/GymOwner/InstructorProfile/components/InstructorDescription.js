import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {branch} from 'baobab-react/higher-order';
import _ from 'lodash';

class InstructorDescription extends React.Component {
  render() {
    const profile = _.get(this.props, 'InstructorProfile.profile') || null;
    return (
        <Col xs={12}>
          { profile ?
            <div>
              {
                profile.bio ? 
                  <p>{profile.bio}</p>
                :
                  <p>{profile.name.first} has not provided a description.</p>
              }
            </div>
          : null
          }
          
        </Col>
    );
  }
}

export default branch(InstructorDescription, {
  cursors: {
    InstructorProfile: ['views', 'InstructorProfile']
  },
  facets: {
    InstructorProfile: 'InstructorProfile'
  }
});