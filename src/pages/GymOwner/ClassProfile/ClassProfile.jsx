import React from 'react';
import {branch} from 'baobab-react/higher-order';
import Spinner from 'components/Spinner';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import ClassInfo from './components/ClassInfo';
import ClassStudentsTable from './components/ClassStudentsTable';
import ClassTransactionsTable from './components/ClassTransactionsTable';
import CustomModal from 'components/Application/components/Modal/Modal';
import {setActiveClass, completeClass} from 'actions/ClassActions';
import RspMsg from 'components/Application/components/Forms/message';
import {cancelClassApi} from 'api/classesApi';
import {clearClassTransactions} from 'actions/TransactionsActions';
import history from 'appHistory';
import moment from 'moment';
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

  async completeClass() {
    let id = this.props.classProfile.classProfile._id;
    this.setState({loading: true});
    this.refs.modal.close();
    const complete = await completeClass(id);
    if (!complete) {
      this.setState({loading: false});
      alert('Error completing, please try again')
    } else {
      this.setState({complete: true, loading: false});
    }
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

  renderMessage(profile) {
    var msg;
    if (profile) {
      if (moment().isAfter(profile.dateAndTime) && !profile.complete) {
        msg = 'This session is out of date and has not been completed or cancelled.'; 
      } else if(profile.complete && !_.get(profile, 'sessionTransactions.passing')) {
        msg = 'This session has one or more failing or missing transactions.'; 
      }
      if (msg) {
        return (
          <RspMsg persist={true} response={{message: msg}} />
        );
      }
      return false;
    }
  }
  
  render() {
    const profile = _.get(this.props, 'classProfile.classProfile') || {};
    const message = this.renderMessage(profile);
    return (
      this.state.loading ?
      <Spinner />  :
      profile.name ?
        <Grid fluid className={this.state.activeTab + " class-profile"}>
          <Row>
            <div className="col-xs-12">
              <div className="row header">
                <Col xs={12} sm={5}>
                  <h1>{profile.name}</h1>
                </Col>
                <Col xs={12} sm={7} className="header-btns">
                  {
                    !profile.private && !profile.complete ?
                    <Button className="cancel-btn" onClick={this.activateModal.bind(this, 'cancel', this.cancelClass.bind(this))}>Cancel Class</Button> : null
                  }
                  {
                    !profile.private && moment().isAfter(profile.dateAndTime) && !profile.complete && profile.enrolled.length ?
                    <Button className="complete-btn" onClick={this.activateModal.bind(this, 'complete', this.completeClass.bind(this))}>Complete Class</Button> : null
                  }
                </Col>
              </div>
              <div className="row tabs">
                <Col xs={12}>
                  <div onClick={this.setTab.bind(this, 'details')} className="tab tab-1 details-tab">Details</div>
                  <div onClick={this.setTab.bind(this, 'table')} className="tab tab-2 table-tab">Enrolled Students</div>
                  <div onClick={this.setTab.bind(this, 'trans-table')} className="tab tab-3 trans-table-tab">Transactions Table</div>
                </Col>
              </div>
              <Row className="form-container">
                {
                  message ? 
                  message : null
                }
                {
                    this.state.activeTab === 'details' ?
                        <ClassInfo disable={message} /> : 
                    this.state.activeTab === 'table' ?
                        <ClassStudentsTable /> :
                    this.state.activeTab === 'trans-table' ?
                        <ClassTransactionsTable />
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

  componentWillUnmount() {
    clearClassTransactions();
  }
}

export default branch(ClassProfile, {
  facets: {
    classProfile: 'ClassProfile'
  }
});