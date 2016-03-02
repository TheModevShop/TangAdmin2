import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import GymOwnerInfo from './components/GymOwnerInfo';
import GymOwnerForm from './components/GymOwnerForm';
import RspMsg from './../../../components/Application/components/Forms/message';
import {setActiveGymOwner, clearResponse} from 'actions/GymOwnerActions';
import _ from 'lodash';
import './gym-owner-profile.less';

class GymOwnerProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {}
  }
  
  render() {
    return (
        <Grid fluid className="gym-owner-profile">
          <Row>
            <div className="col-xs-12">
              <div className="row">
                <Col xs={12}>
                  <h1>Edit Gym owner</h1>
                </Col>
              </div>
              <Row className="info-container">
                <GymOwnerInfo />
              </Row>
              <Row className="form-container">
                <GymOwnerForm />
              </Row>
              <RspMsg delay={5000} response={this.props.GymOwnerProfile.response ? this.props.GymOwnerProfile.response : null} />
            </div>
          </Row>
        </Grid>
    );
  }

  setTab(tab) {
    this.setState({activeTab: tab});
  }

  componentWillMount() {
    setActiveGymOwner();
  }

  componentDidMount() {
    clearResponse();
  }

}

export default branch(GymOwnerProfile, {
  cursors: {
    GymOwnerProfile: ['views', 'GymOwnerProfile']
  }
});
