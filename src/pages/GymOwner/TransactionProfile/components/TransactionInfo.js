import React from 'react';
import {Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

class PrivateClassInfo extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
        <Col xs={12} md={7}>
          <Row>
            <Col xs={12}>
              <h2>Transaction</h2>
              <p>{moment(profile.date).format('M/D/YYYY h:mma')}</p>
              <p>{profile.stripe.status}</p>
              <p>{profile.type}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Session</h2>
              <p>{profile.session.name}</p>
              <p>{moment(profile.session.dateAndTime).format('M/D/YYYY h:mma')}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2>Instructor</h2>
              <p>{_.get(profile, 'instructor.name.first')} {_.get(profile, 'instructor.name.last')}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <h2>Instructor Profit</h2>
              <p>{_.get(profile, 'instructor.name.first')} {_.get(profile, 'instructor.name.last')}</p>
            </Col>
            <Col xs={12}>
              <h2>Application Fee</h2>
              <p>{_.get(profile, 'instructor.name.first')} {_.get(profile, 'instructor.name.last')}</p>
            </Col>
            <Col xs={12}>
              <h2>Gym Profit</h2>
              <p>{_.get(profile, 'instructor.name.first')} {_.get(profile, 'instructor.name.last')}</p>
            </Col>
          </Row>

        </Col>
    );
  }

}

export default PrivateClassInfo;
