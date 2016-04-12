import React from 'react';
import Formsy from 'formsy-react';
import {branch} from 'baobab-react/higher-order';
import {clearResponse} from 'actions/AddGymActions';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import RspMsg from './../../components/Application/components/Forms/message';
import OverviewComponent from './components/overview';
import HoursComponent from './components/hours';
import AppFee from './components/appfee';
import {setActiveGym} from 'actions/GymActions';
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

  componentWillMount() {
    setActiveGym();
  }

  render() {
    const gym = _.get(this.props, 'gymProfile.gymProfile') || this.props.addGym.data || {};
    const viewOnly = _.get(this.props, 'route.path', '').match('view-gym');
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
                  {
                    _.get(this.props, 'user.role') === 'app-owner' ?
                    <div onClick={this.setTab.bind(this, 'gym-owner')} className="tab tab-4 gym-owner-tab">Gym Owner</div> : false
                  }
                  {
                    _.get(this.props, 'user.role') === 'app-owner' ?
                    <div onClick={this.setTab.bind(this, 'app-fee')} className="tab tab-4 gym-app-fee">App Fee</div> : false
                  }
                </span>
              : null
            }
          </Col>
        </div>

        {
            this.state.activeTab === 'overview' ?
              <OverviewComponent viewOnly={viewOnly} role={_.get(this.props, 'user.role')} data={gym} /> : 
            this.state.activeTab === 'hours' ?
              <HoursComponent viewOnly={viewOnly} role={_.get(this.props, 'user.role')} gymId={gym._id ? gym._id : null} data={gym} /> :
            this.state.activeTab === 'photos' ?
              <PhotosComponent viewOnly={viewOnly} role={_.get(this.props, 'user.role')} gymId={gym._id ? gym._id : null} data={gym} /> :
            this.state.activeTab === 'gym-owner' ?
              <OwnerComponent viewOnly={viewOnly} role={_.get(this.props, 'user.role')} gymId={gym._id ? gym._id : null} data={gym} /> : 
            this.state.activeTab === 'app-fee' ?
              <AppFee viewOnly={viewOnly} role={_.get(this.props, 'user.role')} gymId={gym._id ? gym._id : null} data={gym} /> 
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
    addGym: ['views', 'AddGym'],
    user: ['user']
  },
  facets: {
    gymProfile: 'GymProfile',
  }

});
