import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import {setActiveGym} from 'actions/GymActions';
import "./gyms.less";

class GymsProfile extends React.Component {
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
      <div className="page">
        {
          profile.address ?
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
                        <div className="city-zip">{profile.address.city}, {profile.address.state} {profile.address.zipcode}</div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h2>Phone</h2>
                      <div>
                        <span>{profile.contact.phone}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h2>Email</h2>
                      <div>
                        <span>{profile.contact.email}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h2>Hours</h2>
                      <div>
                        <div>
                          Monday:
                          { profile.hours.mon_1_open ?
                            <div>{profile.hours.mon_1_open} - {profile.hours.mon_1_close}</div>
                            : Closed
                          }
                        </div>
                        <div>
                          Tuesday:
                          { profile.hours.tue_1_open ?
                            <div>{profile.hours.tue_1_open} - {profile.hours.tue_1_close}</div>
                            : Closed
                          }
                        </div>
                        <div>
                          Wednesday:
                          { profile.hours.wed_1_open ?
                            <div>{profile.hours.wed_1_open} - {profile.hours.wed_1_close}</div>
                            : Closed
                          }
                        </div>
                        <div>
                          Thursday:
                          { profile.hours.thu_1_open ?
                            <div>{profile.hours.thu_1_open} - {profile.hours.thu_1_close}</div>
                            : Closed
                          }
                        </div>
                        <div>
                          Friday:
                          { profile.hours.fri_1_open ?
                            <div>{profile.hours.fri_1_open} - {profile.hours.fri_1_close}</div>
                            : Closed
                          }
                        </div>
                        <div>
                          Saturday:
                          { profile.hours.sat_1_open ?
                            <div>{profile.hours.sat_1_open} - {profile.hours.sat_1_close}</div>
                            : Closed
                          }
                        </div>
                        <div>
                          Sunday:
                          { profile.hours.sun_1_open ?
                            <div>{profile.hours.sun_1_open} - {profile.hours.sun_1_open}</div>
                            : Closed
                          }
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={5}>
                  <Row>
                    <div className="main-img col-xs-12" >
                    </div>
                  </Row>
                  <Row>
                    <div className="sup-img col-xs-6">
                    </div>
                    <div className="sup-img col-xs-6">
                    </div>
                    <div className="sup-img col-xs-6">
                    </div>
                    <div className="sup-img col-xs-6">
                    </div>
                    <div className="sup-img col-xs-6">
                    </div>
                    <div className="sup-img col-xs-6">
                    </div>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        : null
      }
       </div>
    );
  }
}

export default branch(GymsProfile, {
  facets: {
    gymProfile: 'GymProfile'
  }
});
