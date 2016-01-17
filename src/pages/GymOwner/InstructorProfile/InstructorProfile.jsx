import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import InstructorInfo from './components/InstructorInfo';
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
        profile.address ?
        <div className="instructor-profile">
           <Grid fluid>
            <Row>
              <div className="panel panel-info col-xs-12 col-sm-10 col-sm-offset-1">
                <div className="row panel-heading">
                  <Col xs={12}>
                    <h1>{profile.name}</h1>
                  </Col>
                </div>
                <Row className="info-container">
                  <InstructorInfo profile={profile} />
                </Row>
              </div>
            </Row>
          </Grid>
        </div> : null
    );
  }

}

export default branch(InstructorProfile, {
  facets: {
    instructorProfile: 'InstructorProfile'
  }
});
