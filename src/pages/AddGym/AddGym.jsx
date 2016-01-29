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
    const profile = _.get(this.props, 'gymProfile.gymProfile') || {};
    this.props.addGym.id = profile._id;
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
                <OverviewComponent params={profile.name ? profile : this.props.addGym.overview} /> : 
            this.state.activeTab === 'hours' ?
                <HoursComponent params={profile.name ? (profile.hours ? profile.hours : this.props.addGym.hours) : this.props.addGym.hours} /> :
            this.state.activeTab === 'photos' ?
                <PhotosComponent data={profile.name ? (profile.images ? profile.images : this.props.addGym.images) : this.props.addGym.images} /> : null
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
    this.props.addGym.response = null;
    this.setState({activeTab: tab});
  }

}

export default branch(AddGym, {
  cursors: {
    addGym: ['views', 'AddGym']
  },
  facets: {
    gymProfile: 'GymProfile'
  }
});
