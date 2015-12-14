import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import AccountImages from './components/AccountImages';
import LocationHours from './components/LocationHours';
import LocationInfo from './components/LocationInfo';
import {setActiveGym} from 'actions/GymActions';
import _ from 'lodash';
import './gym-profile.less';

class GymProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  componentWillMount() {
    setActiveGym();
  }
  render() {
    const profile = _.get(this.props, 'gymProfile.gymProfile') || {};
    return (
        profile.address ?
        <div className="gym-profile">
           <Grid fluid>
            <Row>
              <LocationInfo profile={profile} />
              <LocationHours profile={profile}/>
              <AccountImages profile={profile} />
            </Row>
          </Grid>
        </div> : null
    );
  }

}

export default branch(GymProfile, {
  facets: {
    gymProfile: 'GymProfile'
  }
});
