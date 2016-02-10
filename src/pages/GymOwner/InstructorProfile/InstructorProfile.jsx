import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import InstructorInfo from './components/InstructorInfo';
import InstructorForm from './components/InstructorForm';
import RspMsg from './../../../components/Application/components/Forms/message';
import {setActiveInstructor} from 'actions/InstructorActions';
import _ from 'lodash';
import './instructor-profile.less';

class InstructorProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    const profile = _.get(this.props, 'instructorProfile.instructorProfile') || {};
    const roles = _.get(this.props, 'roles.roles') || {};
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
                <InstructorForm profile={profile} roles={roles}/>
              </Row>
            </div>
          </Row>
          {
            this.props.instructorProfileView.response ?
              <RspMsg response={this.props.instructorProfileView.response} /> 
            : null
          }
        </Grid> : null
    );
  }

}

export default branch(InstructorProfile, {
  facets: {
    instructorProfile: 'InstructorProfile',
    roles: 'Roles'
  },
  cursors: {
    instructorProfileView: ['views', 'InstructorProfile']
  }
});
