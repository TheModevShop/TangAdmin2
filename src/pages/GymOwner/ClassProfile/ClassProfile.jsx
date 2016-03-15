import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import ClassInfo from './components/ClassInfo';
import ClassStudentsTable from './components/ClassStudentsTable';
import CustomModal from './../../../components/Application/components/Modal/Modal';
import {setActiveClass} from 'actions/ClassActions';
import {cancelClassApi} from 'api/classesApi';
import history from 'appHistory';
import _ from 'lodash';
import './class-profile.less';

class ClassProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: 'details'
    }
  }

  cancelClass() {
    let id = this.props.classProfile.classProfile._id;
    cancelClassApi(id);
    this.refs.modal.close();
    history.pushState(null, '/classes');
  }

  activateModal(action, fn) {
    this.refs.modal.open(action, fn);
  }

  setTab(tab) {
    this.setState({activeTab: tab});
  }

  componentWillMount() {
    setActiveClass();
  }
  
  render() {
    const profile = _.get(this.props, 'classProfile.classProfile') || {};
    return (
      profile.name ?
        <Grid fluid className={this.state.activeTab + " instructor-profile"}>
          <Row>
            <div className="col-xs-12">
              <div className="row header">
                <Col xs={12} sm={8}>
                  <h1>{profile.name}</h1>
                </Col>
                <Col xs={12} sm={4} className="header-btns">
                  <Button className="cancel-btn" onClick={this.activateModal.bind(this, 'cancel', this.cancelClass.bind(this))}>Cancel Class</Button>               
                </Col>
              </div>
              <div className="row tabs">
                <Col xs={12}>
                  <div onClick={this.setTab.bind(this, 'details')} className="tab tab-1 details-tab">Details</div>
                  <div onClick={this.setTab.bind(this, 'table')} className="tab tab-2 table-tab">Enrolled Students</div>
                </Col>
              </div>
              <Row className="form-container">
                {
                    this.state.activeTab === 'details' ?
                        <ClassInfo /> : 
                    this.state.activeTab === 'table' ?
                        <ClassStudentsTable />
                    : null
                }
              </Row>
            </div>
          </Row>
          <CustomModal ref="modal"/>
        </Grid>
      : null
    );
  }
}

export default branch(ClassProfile, {
  facets: {
    classProfile: 'ClassProfile'
  }
});