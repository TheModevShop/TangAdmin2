import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import InstructorInfo from './components/InstructorInfo';
import InstructorForm from './components/InstructorForm';
import InstructorDescription from './components/InstructorDescription';
import UserPrivatesTable from 'components/UserSessionTables/UserPrivatesTable';
import UserClassesTable from 'components/UserSessionTables/UserClassesTable';
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
    console.log(this.props)
    return (
        <Grid fluid className={this.state.activeTab + " instructor-profile"}>
          <Row>
            <div className="col-xs-12">
              <div className="row">
                <Col xs={12}>
                  <h1>Edit Instructor</h1>
                </Col>
              </div>
              <Row className="info-container">
                <InstructorInfo />
              </Row>
               <div className="row tabs">
                <Col xs={12}>
                  <div onClick={this.setTab.bind(this, 'description')} className="tab tab-1 description-tab">Description</div>
                  <div onClick={this.setTab.bind(this, 'status')} className="tab tab-2 status-tab">Status</div>
                </Col>
              </div>
              <Row className="form-container">
                {
                    this.state.activeTab === 'description' ?
                        <InstructorDescription /> : 
                    this.state.activeTab === 'status' ?
                        <InstructorForm />
                    : null
                }
              </Row>
              <RspMsg delay={5000} response={this.props.InstructorProfile.response ? this.props.InstructorProfile.response : null} />
            </div>
          </Row>
        </Grid>
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
  cursors: {
    InstructorProfile: ['views', 'InstructorProfile']
  },
  facets: {
    InstructorClasses: 'InstructorClasses',
    InstructorPrivates: 'InstructorPrivates'
  }
});


// <div onClick={this.setTab.bind(this, 'privates')} className="tab tab-2 privates-tab">Privates</div>
// <div onClick={this.setTab.bind(this, 'classes')} className="tab tab-3 classes-tab">Classes</div>
// this.state.activeTab === 'privates' ?
// <UserPrivatesTable table="instructor" privates={_.get(this.props, 'InstructorPrivates.privates')}/> :
// this.state.activeTab === 'classes' ?
// <UserClassesTable table="instructor-classes" classes={_.get(this.props, 'InstructorClasses.classes')} /> :
