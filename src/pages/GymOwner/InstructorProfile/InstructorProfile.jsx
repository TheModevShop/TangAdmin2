import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import InstructorInfo from './components/InstructorInfo';
import InstructorForm from './components/InstructorForm';
import RspMsg from './../../../components/Application/components/Forms/message';
import {setActiveInstructor, clearResponse} from 'actions/InstructorActions';
import _ from 'lodash';
import './instructor-profile.less';

class InstructorProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: 'description'
    }
  }
  
  render() {
    const profile = _.get(this.props, 'instructorProfile.instructorProfile') || {};
    const roles = _.get(this.props, 'roles.roles') || {};
    return (
        profile.name ?
        <Grid fluid className={this.state.activeTab + " instructor-profile"}>
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
               <div className="row tabs">
                <Col xs={12}>
                  <div onClick={this.setTab.bind(this, 'description')} className="tab tab-1 description-tab">Description</div>
                  <div onClick={this.setTab.bind(this, 'privates')} className="tab tab-2 privates-tab">Privates</div>
                  <div onClick={this.setTab.bind(this, 'status')} className="tab tab-3 status-tab">Status</div>
                </Col>
              </div>
              <Row className="form-container">
                {
                    this.state.activeTab === 'description' ?
                        <div>{profile.description}</div> : 
                    this.state.activeTab === 'privates' ?
                        <div>todo</div> :
                    this.state.activeTab === 'status' ?
                        <InstructorForm profile={profile} roles={roles}/>
                    : null
                }
              </Row>
            </div>
          </Row>
          <RspMsg delay={5000} response={this.props.instructorProfileView.response ? this.props.instructorProfileView.response : null} />
        </Grid> : null
    );
  }

  setTab(tab) {
    this.setState({activeTab: tab});
  }

  componentWillMount() {
    setActiveInstructor();
  }

  componentDidMount() {
    clearResponse();
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
