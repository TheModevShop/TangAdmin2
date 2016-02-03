import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

class Student extends React.Component {
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
              <h2>Phone</h2>
              <div>
                <span></span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Email</h2>
              <div>
                <span></span>
              </div>
            </Col>
          </Row>
        </Col>
    );
  }

}

export default Student;
