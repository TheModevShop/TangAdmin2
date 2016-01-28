import React from 'react';
import {Row, Col} from 'react-bootstrap';
import LocationHours from '../../components/LocationHours';
import _ from 'lodash';

class LocationInfo extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
        <Col xs={12} md={7}>
          <Row>
            <Col xs={12}>
              <h2>Address</h2>
              <div className="address-container">
                <span>{profile.address.street}</span>
                <span className="city-zip">{profile.address.city}, {profile.address.state} {profile.address.zipcode}</span>
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
              <h2>Website</h2>
              <div>
                <span>{profile.contact.website}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <LocationHours profile={profile}/>
          </Row>
        </Col>
    );
  }

}

export default LocationInfo;
