import React from 'react';
import Formsy from 'formsy-react';
import {branch} from 'baobab-react/higher-order';
import {addGym} from 'actions/GymActions';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import RspMsg from './../../components/Application/components/Forms/message';
import OverviewComponent from './components/overview';
import HoursComponent from './components/hours';
import PhotosComponent from './components/photos';
import _ from 'lodash';
import './add-gym.less';

class AddGym extends React.Component {
  constructor(...args) {
    super(...args);
    this.setTab = this.setTab.bind(this);
    this.state = {
      activeTab: 'overview'
    }
  }

  render() {
    return (
      <Grid fluid className={this.state.activeTab}>
        <div className="row header">
          <Col xs={12}>
            <h1>Add Gym</h1>
          </Col>
        </div>
        <div className="row tabs">
          <Col xs={12}>
            <div onClick={this.setTab.bind(this, 'overview')} className="tab tab-1 overview-tab">Overview</div>
            <div onClick={this.setTab.bind(this, 'hours')} className="tab tab-2 hours-tab">Hours of Operation</div>
            <div onClick={this.setTab.bind(this, 'photos')} className="tab tab-3 photos-tab">Photos</div>
          </Col>
        </div>

        {
            this.state.activeTab === 'overview' ?
                <OverviewComponent params={this.props.addGym.data}/> : 
            this.state.activeTab === 'hours' ?
                <HoursComponent params={this.props.addGym.data}/> :
            this.state.activeTab === 'photos' ?
                <PhotosComponent data={this.props.addGym.data}/> : null
        }

        {
          this.props.addGym.response ?
            <RspMsg response={this.props.addGym.response} /> 
          : null
        }
      </Grid>
    );
  }

  setTab(tab) {
    this.setState({activeTab: tab});
  }

  

    valid() {
        if (this.state.activeTab === 'overview') {
            this.refs.gymForm.updateModel();
            let data = this.refs.gymForm.model;

            this.formData.name = data.name;
            this.formData.description = data.description;
            this.formData.address.street = data.street;
            this.formData.address.city = data.city;
            this.formData.address.state = data.state;
            this.formData.address.zipcode = data.zipcode;
            this.formData.contact.phone = data.phone;
            this.formData.contact.email = data.email;
            this.formData.contact.website = data.website;
            this.formData.privateSessionPrice = Number(data.privateSessionPrice);
            this.formData.cancellationPolicy.percent = Number(data.percent);
            this.formData.cancellationPolicy.time = Number(data.time);
            this.formData.hours = this.formData.hours;

            let count = 0;

            for(var prop in data) {
                if(!data[prop]) {
                    ++count;
                }
            }

            if (count === 0) {
                this.setState({formComplete: {overview: true, hours: this.state.formComplete.hours}});
            } else {
                this.disableButton();
                this.setState({formComplete: {overview: false, hours: this.state.formComplete.hours}});
            }

            
        } else if (this.state.activeTab === 'hours') {
            this.refs.gymForm.updateModel();
            let data = this.refs.gymForm.model;
            this.formData.hours = data;
            let count = 0;

            for(var prop in data) {
                if(!data[prop]) {
                    ++count;
                }
            }

            if (count < 13 ) {
                this.setState({formComplete: {hours: true, overview: this.state.formComplete.overview}});
            } else {
                this.disableButton();
                this.setState({formComplete: {hours: false, overview: this.state.formComplete.overview}});
            }
        }

        if (this.state.formComplete.hours && this.state.formComplete.overview) {
            this.enableButton;
        } 
    }



    invalid() {
        this.disableButton();
        if (this.state.activeTab === 'overview') {
            this.setState({formComplete: {overview: false, hours: this.state.formComplete.hours}});
        } else if (this.state.activeTab === 'hours') {
            this.setState({formComplete: {hours: false, overview: this.state.formComplete.overview}});
        }
    }
 
}

export default branch(AddGym, {
  cursors: {
    addGym: ['views', 'AddGym']
  }
});
