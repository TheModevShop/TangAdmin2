import React from 'react';
import Formsy from 'formsy-react';
import {branch} from 'baobab-react/higher-order';
import {addGym} from 'actions/GymActions';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import RspMsg from './../../components/Application/components/Forms/message';
import OverviewComponent from './components/overview';
import HoursComponent from './components/hours';
import PhotosComponent from './components/photos';
import './add-gym.less';

const dataObj = {name: null, description: null, address: {street: null, city: null, state: null, zipcode: null}, contact:{email: null, phone: null, website: null}, privateSessionPrice: null, cancellationPolicy: {percent: null, time: null}, hours: {mon_open: null, mon_close: null, tue_open: null, tue_close: null, wed_open: null, wed_close: null, thu_open: null, thu_close: null, fri_open: null, fir_close: null, sat_open: null, sat_close: null, sun_open: null, sun_close: null}};

class AddGym extends React.Component {
  constructor(...args) {
    super(...args);
    this.setTab = this.setTab.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.formData = this.gymData ? this.gymData : dataObj;
    this.state = {
      activeTab: 'overview',
      canSubmit: false
    }
  }

  render() {
    return (
      <Grid fluid className={this.state.activeTab}>
        <div className="row tabs">
          <Col xs={12}>
            <div onClick={this.setTab.bind(this, 'overview')} className="tab tab-1 overview-tab">Overview</div>
            <div onClick={this.setTab.bind(this, 'hours')} className="tab tab-2 hours-tab">Hours of Operation</div>
            <div onClick={this.setTab.bind(this, 'photos')} className="tab tab-3 photos-tab">Photos</div>
          </Col>
        </div>
        <Formsy.Form onValidSubmit={this.getGeoPoint.bind(this)} onValid={this.enableButton} onInvalid={this.disableButton} className="row">
            <Col xs={12}>
              {
                this.state.activeTab === 'overview' ?
                <OverviewComponent data={this.formData}/> : 
                this.state.activeTab === 'hours' ?
                <HoursComponent data={this.formData}/> :
                this.state.activeTab === 'photos' ?
                <PhotosComponent data={this.formData}/> : null
              }
              <Button type="submit" value="Submit" disabled={!this.state.canSubmit}>Submit</Button>
            </Col>
        </Formsy.Form>
        {
          this.props.addGym.response ?
            <RspMsg response={this.props.addGym.response} /> 
          : null
        }
      </Grid>
    );
  }

  async setTab(tab) {
    this.setState({activeTab: tab});
  }

  async getGeoPoint(data) {
    if (this.state.activeTab === 'overview') {
      try {
        const location = await getGymGeoPoints(data.address.street + ' ' +  data.address.city + ', ' +  data.address.state + ' ' +  data.address.zipcode);
        data.Location = [location.lng, location.lat];
        this.submitGym(data);
      } catch (err) {
        console.log(err)
      }
    } else {
      this.submitGym(data);
    }
    
  }

  submitGym(data) {
    if (this.state.activeTab === 'overview') {
        this.formData.name = data.name;
        this.formData.description = data.description;
        this.formData.address.street = data.address.street;
        this.formData.address.city = data.address.city;
        this.formData.address.state = data.address.state;
        this.formData.address.zipcode = data.address.zipcode;
        this.formData.contact.phone = data.contact.phone;
        this.formData.contact.email = data.contact.email;
        this.formData.contact.website = data.contact.website;
        this.formData.privateSessionPrice = Number(data.privateSessionPrice);
        this.formData.cancellationPolicy.percent = Number(data.cancellationPolicy.percent);
        this.formData.cancellationPolicy.time = Number(data.cancellationPolicy.time);
        this.setState({activeTab: 'hours'});
    } else if (this.state.activeTab === 'hours') {
      this.formData.hours = data.hours;
      this.setState({activeTab: 'photos'});
    } else if (this.state.activeTab === 'photos') {
      const gymData = JSON.stringify(this.formData);
      addGym(gymData);
    }
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
