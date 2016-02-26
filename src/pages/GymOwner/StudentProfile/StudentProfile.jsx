import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import StudentInfo from './components/StudentInfo';
import StudentDescription from './components/StudentDescription';
import StudentForm from './components/StudentForm';
import StudentPrivatesTable from './components/StudentPrivatesTable';
import StudentClassesTable from './components/StudentClassesTable';
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

  render() {
    return (
        <Grid fluid className={this.state.activeTab + " student-profile"}>
          <Row>
            <div className="col-xs-12">
              <Row className="info-container">
                <StudentInfo />
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
                      <StudentDescription /> : 
                  this.state.activeTab === 'privates' ?
                      <StudentPrivatesTable /> :
                  this.state.activeTab === 'classes' ?
                      <StudentClassesTable  /> :
                  this.state.activeTab === 'status' ?
                      <StudentForm />
                  : null
              }
              </Row>
            </div>
          </Row>
        </Grid>
    );
  }

  setTab(tab) {
    this.setState({activeTab: tab});
  }

  componentWillMount() {
    setActiveStudent();
  }

  componentDidMount() {
    clearResponse();
  }

}

export default branch(StudentProfile, {
  cursors: {
    studentProfileView: ['views', 'StudentProfile']
  }
});
