import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import StudentInfo from './components/StudentInfo';
import StudentForm from './components/StudentForm';
import {setActiveStudent} from 'actions/StudentActions';
import RspMsg from './../../../components/Application/components/Forms/message';
import _ from 'lodash';
import './student-profile.less';

class StudentProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const profile = _.get(this.props, 'studentProfile.studentProfile') || {};
    const roles = _.get(this.props, 'roles.roles') || {};
    return (
        profile.name ?
        <Grid fluid className="student-profile">
          <Row>
            <div className="col-xs-12">
              <div className="row">
                <Col xs={12}>
                  <h1>Edit Student</h1>
                </Col>
              </div>
              <Row className="info-container">
                <StudentInfo profile={profile} />
              </Row>
              <Row className="form-container">
                <StudentForm profile={profile} roles={roles}/>
              </Row>
            </div>
          </Row>
          {
            this.props.studentProfileView.response ?
              <RspMsg response={this.props.studentProfileView.response} /> 
            : null
          }
        </Grid> : null
    );
  }

}

export default branch(StudentProfile, {
  facets: {
    studentProfile: 'StudentProfile',
    roles: 'Roles'
  },
  cursors: {
    studentProfileView: ['views', 'StudentProfile']
  }
});
