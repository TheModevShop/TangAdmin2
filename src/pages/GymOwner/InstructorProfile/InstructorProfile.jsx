import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import InstructorInfo from './components/InstructorInfo';
import InstructorForm from './components/InstructorForm';
import {setActiveInstructor} from 'actions/InstructorActions';
import _ from 'lodash';
import './instructor-profile.less';

class InstructorProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  componentWillMount() {
    setActiveInstructor();
  }
  render() {
    const profile = _.get(this.props, 'instructorProfile.instructorProfile') || {};
    return (
        profile.name ?
        <Grid fluid className="instructor-profile">
          <Row>
            <div className="col-xs-12">
              <div className="row">
                <Col xs={12}>
                  <h1>Edit Instructor</h1>
                </Col>
              </div>
              <Row className="info-container">
                <InstructorInfo profile={profile} />
              </Row>
              <Row className="form-container">
                <InstructorForm profile={profile} />
              </Row>
            </div>
          </Row>
        </Grid> : null
    );
  }

}

export default branch(InstructorProfile, {
  facets: {
    instructorProfile: 'InstructorProfile'
  }
});
