import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

class ClassInfo extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
        <Col xs={12} md={7}>
          <Row>
            <Col xs={12}>
              <h2>Address</h2>
              <div className="address-container">
                <span></span>
                <span className="city-zip"></span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Private Class</h2>
              <div>
                <span>
                  { profile.private ? "Yes" : "No" }
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Time</h2>
              <div>
                <span>
                  {profile.time.start} - {profile.time.end}
                </span>
              </div>
            </Col>
          </Row>
        </Col>
    );
  }

}

export default ClassInfo;
