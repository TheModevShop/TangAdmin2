import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import AccountImages from './components/AccountImages';
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
              <div className="panel panel-info col-xs-12 col-sm-10 col-sm-offset-1">
                <div className="row panel-heading">
                  <Col xs={12}>
                    <h1>{profile.name}</h1>
                  </Col>
                </div>
                <Row className="info-container">
                  <LocationInfo profile={profile} />
                  <AccountImages profile={profile} />
                </Row>
              </div>
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
