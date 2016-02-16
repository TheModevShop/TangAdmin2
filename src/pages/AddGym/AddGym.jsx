import React from 'react';
import Formsy from 'formsy-react';
import {branch} from 'baobab-react/higher-order';
import {clearResponse} from 'actions/AddGymActions';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import RspMsg from './../../components/Application/components/Forms/message';
import OverviewComponent from './components/overview';
import HoursComponent from './components/hours';
import PhotosComponent from './components/photos';
import OwnerComponent from './components/owner';
import _ from 'lodash';
import './add-gym.less';

class AddGym extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: 'overview'
    }
  }

  render() {
    const gym = _.get(this.props, 'gymProfile.gymProfile') || this.props.addGym.data || {};
    return (
      <Grid fluid className={this.state.activeTab}>
        <div className="row header">
          <Col xs={12}>
            <h1>{ gym._id ? 'Gym Profile' : 'Add Gym'}</h1>
          </Col>
        </div>
        <div className="row tabs">
          <Col xs={12}>
            <div onClick={this.setTab.bind(this, 'overview')} className="tab tab-1 overview-tab">Overview</div>
            {
              gym._id ?
                <span>
                  <div onClick={this.setTab.bind(this, 'hours')} className="tab tab-2 hours-tab">Hours of Operation</div>
                  <div onClick={this.setTab.bind(this, 'photos')} className="tab tab-3 photos-tab">Photos</div>
                  <div onClick={this.setTab.bind(this, 'gym-owner')} className="tab tab-4 gym-owner-tab">Gym Owner</div>
                </span>
              : null
            }
          </Col>
        </div>

        {
            this.state.activeTab === 'overview' ?
                <OverviewComponent data={gym} /> : 
            this.state.activeTab === 'hours' ?
                <HoursComponent gymId={gym._id ? gym._id : null} data={gym} /> :
            this.state.activeTab === 'photos' ?
                <PhotosComponent gymId={gym._id ? gym._id : null} data={gym} /> :
            this.state.activeTab === 'gym-owner' ?
                <OwnerComponent gymId={gym._id ? gym._id : null} data={gym} /> 
            : null
        }
        <RspMsg delay={5000} response={this.props.addGym.response ? this.props.addGym.response : null} />
      </Grid>
    );
  }

  componentDidMount() {
    clearResponse();
  }

  setTab(tab) {
    clearResponse();
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
