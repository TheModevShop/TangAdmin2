import React from 'react';
import Formsy from 'formsy-react';
import {branch} from 'baobab-react/higher-order';
import {addGym} from 'actions/GymActions';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import OverviewComponent from './components/overview';
import HoursComponent from './components/hours';
import PhotosComponent from './components/photos';
import './add-gym.less';



class AddGym extends React.Component {
  constructor(...args) {
    super(...args);
    this.setTab = this.setTab.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      activeTab: 'overview',
      canSubmit: false,
      files: []
    }
  }

  render() {
    return (
      <Grid fluid>
        <div className="tabs">
          <div onClick={this.setTab.bind(this, 'overview')} className="tab-1">Overview</div>
          <div onClick={this.setTab.bind(this, 'hours')} className="tab-2">hours</div>
          <div onClick={this.setTab.bind(this, 'photos')} className="tab-3">photos</div>
        </div>
        <Formsy.Form onValidSubmit={this.getGeoPoint} onValid={this.enableButton} onInvalid={this.disableButton} className="col-xs-12">
          <Row>
            <Col xs={12}>
              {
                this.state.activeTab === 'overview' ?
                <OverviewComponent /> : 
                this.state.activeTab === 'hours' ?
                <HoursComponent /> :
                this.state.activeTab === 'photos' ?
                <PhotosComponent /> : null
              }
              <Button bsStyle="primary" type="submit" value="Submit" bsSize="large" disabled={!this.state.canSubmit}>Submit</Button>
            </Col>
          </Row>
        </Formsy.Form>
      </Grid>
    );
  }

  async setTab(tab) {
    this.setState({activeTab: tab});
  }

  async getGeoPoint(data) {
    try {
      const location = await getGymGeoPoints(data.address.street + ' ' +  data.address.city + ', ' +  data.address.state + ' ' +  data.address.zipcode);
      data.Location = [location.lng, location.lat];
      this.submitGym(data);
    } catch (err) {
      console.log(err)
    }
  }

  submitGym(data) {
    data.privateSessionPrice = Number(data.privateSessionPrice);
    data.cancellationPolicy.percent = Number(data.cancellationPolicy.percent);
    data.cancellationPolicy.time = Number(data.cancellationPolicy.time);
    const gymData = JSON.stringify(data);
    console.log(gymData);
    addGym(gymData);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }
 
}

export default branch(AddGym, {
  cursors: {
    addGym: ['views', 'AddGym']
  }
});
