import React from 'react';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

class AccountImages extends React.Component {
  render() {
    const profile = this.props.profile;
    return (
      <Col xs={12} md={5}>
        <Row>
          <div className="main-img col-xs-12">
            <img />
          </div>
        </Row>
        <Row>
          <div className="sup-img col-xs-6">
            <img />
          </div>
          <div className="sup-img col-xs-6">
            <img />
          </div>
          <div className="sup-img col-xs-6">
            <img />
          </div>
          <div className="sup-img col-xs-6">
            <img />
          </div>
          <div className="sup-img col-xs-6">
            <img />
          </div>
          <div className="sup-img col-xs-6">
            <img />
          </div>
        </Row>
      </Col>
    );
  }

}

export default AccountImages;
