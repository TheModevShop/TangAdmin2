import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

class LocationInfo extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
        <Col xs={12} md={7}>
          <Row>
            <Col xs={12}>
              <h1>{profile.name}</h1>
            </Col>
          </Row>
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
        </Col>
    );
  }

}

export default LocationInfo;
