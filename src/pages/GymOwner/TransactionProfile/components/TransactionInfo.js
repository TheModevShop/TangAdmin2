import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

class PrivateClassInfo extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
        <Col xs={12} md={7}>
          <Row>
            <Col xs={12}>
              <h2>Transaction</h2>
              <p>{profile.stripe.amount} / {profile.stripe.amount_refunded}</p>
              <p>{profile.date}</p>
              <p>{profile.stripe.status}</p>
              <p>{profile.type}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Session</h2>
              <p>{profile.session}</p>
              <p>{profile.date}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Instructor</h2>
              <p>{profile.Instructor}</p>
            </Col>
          </Row>
        </Col>
    );
  }

}

export default PrivateClassInfo;
