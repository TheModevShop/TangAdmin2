import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import PrivateClassInfo from './components/PrivateClassInfo';
import history from 'appHistory';
import CustomModal from './../../../components/Application/components/Modal/Modal';
import {setActiveClass} from 'actions/ClassActions';
import {cancelClassApi} from 'api/classesApi';
import {Link} from 'react-router';
import _ from 'lodash';
import './privates-profile.less';

class ClassProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  componentWillMount() {
    setActiveClass();
  }
  cancelClass() {
    let id = this.props.classProfile.classProfile._id;
    cancelClassApi(id);
    this.refs.modal.close();
    history.pushState(null, '/privates');
  }
  activateModal(action, fn) {
    this.refs.modal.open(action, fn);
  }
  render() {
    const profile = _.get(this.props, 'classProfile.classProfile') || {};
    return (
        profile.name ?
           <Grid fluid className="class-profile">
            <Row>
              <div className=" col-xs-12 col-sm-10 col-sm-offset-1">
                <div className="row heading">
                  <Col xs={12} sm={6}>
                    <h1>{profile.name}</h1>
                  </Col>
                  <Col xs={12} sm={6} className="header-btns">
                    <Button className="cancel-btn" onClick={this.activateModal.bind(this, 'cancel', this.cancelClass.bind(this))}>Cancel Class</Button>  
                    <Link className="btn" to={`/add-class/${profile._id}`}>Edit Class</Link>                
                  </Col>
                </div>
                <Row className="info-container">
                  <PrivateClassInfo profile={profile} />
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
