import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import StudentInfo from './components/StudentInfo';
import {setActiveStudent} from 'actions/StudentActions';
import _ from 'lodash';
import './student-profile.less';

class StudentProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  componentWillMount() {
    setActiveStudent();
  }
  render() {
    const profile = _.get(this.props, 'studentProfile.studentProfile') || {};
    return (
        profile.address ?
        <div className="student-profile">
           <Grid fluid>
            <Row>
              <div className="panel panel-info col-xs-12 col-sm-10 col-sm-offset-1">
                <div className="row panel-heading">
                  <Col xs={12}>
                    <h1>{profile.name}</h1>
                  </Col>
                </div>
                <Row className="info-container">
                  <StudentInfo profile={profile} />
                </Row>
              </div>
            </Row>
          </Grid>
        </div> : null
    );
  }

}

export default branch(StudentProfile, {
  facets: {
    studentProfile: 'StudentProfile'
  }
});
