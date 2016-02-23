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
              {profile.description}
              {profile.capacity}
              {profile.instructor}
              {profile.price}
              {profile.time.start}
              {profile.time.end}
              {profile.date}
            </Col>
          </Row>
        </Col>
    );
  }

}

export default ClassInfo;
