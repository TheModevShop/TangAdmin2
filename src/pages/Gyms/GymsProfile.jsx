import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import "./gyms.less";

class GymsProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const profile = _.get(this.props, 'gyms.gymProfile') || [];
    return (
      <div className="page">
        <Grid fluid>
          <Row>
            <Col xs={12} sm={10} smOffset={1}>
              <Row>
                <Col xs={12}>
                  <h1>{profile.name}</h1>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={7}>
                  <Row>
                    <Col xs={12}>
                      <h2>Address</h2>
                      <div>
                        <span>{profile.address.street}</span>
                        <span>Suite 1400</span>
                        <span>Austin, TX 78722</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h2>Phone</h2>
                      <div>
                        <span>(937)830-5639</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={5}>
                  asdfas
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
       </div>
    );
  }
}

export default branch(GymsProfile, {
  facets: {
    gymProfile: 'GymProfile'
  }
});
