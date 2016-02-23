import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import StudentInfo from './components/StudentInfo';
import StudentForm from './components/StudentForm';
import {setActiveStudent, clearResponse} from 'actions/StudentActions';
import RspMsg from './../../../components/Application/components/Forms/message';
import _ from 'lodash';
import './student-profile.less';

class StudentProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: 'description'
    }
  }

  componentWillMount() {
    setActiveStudent();
  }

  render() {
    const profile = _.get(this.props, 'studentProfile.studentProfile') || {};
    const roles = _.get(this.props, 'roles.roles') || {};
    return (
        profile.name ?
        <Grid fluid className={this.state.activeTab + " student-profile"}>
          <Row>
            <div className="col-xs-12">
              <Row className="info-container">
                <StudentInfo profile={profile} />
              </Row>
              <div className="row tabs">
                <Col xs={12}>
                  <div onClick={this.setTab.bind(this, 'description')} className="tab tab-1 description-tab">Description</div>
                  <div onClick={this.setTab.bind(this, 'privates')} className="tab tab-2 privates-tab">Privates</div>
                  <div onClick={this.setTab.bind(this, 'classes')} className="tab tab-3 classes-tab">Classes</div>
                  <div onClick={this.setTab.bind(this, 'status')} className="tab tab-3 status-tab">Status</div>
                </Col>
              </div>
              <Row className="form-container">
                {
                    this.state.activeTab === 'description' ?
                        <div>{profile.description}</div> : 
                    this.state.activeTab === 'privates' ?
                        <div>todo</div> :
                    this.state.activeTab === 'classes' ?
                        <div>todo</div> :
                    this.state.activeTab === 'status' ?
                        <StudentForm profile={profile} roles={roles}/>
                    : null
                }
               
              </Row>
            </div>
          </Row>
          <RspMsg delay={5000} response={this.props.studentProfileView.response ? this.props.studentProfileView.response : null} />
        </Grid> : null
    );
  }

  setTab(tab) {
    this.setState({activeTab: tab});
  }

  componentDidMount() {
    clearResponse();
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
