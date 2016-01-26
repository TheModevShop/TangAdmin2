import React from 'react';
import {Row, Col} from 'react-bootstrap';

class RspMsg extends React.Component {
  render() {
    const response = this.props.response;
    return (
      <Row>
        <Col xs={12} className={response.success ? ' response-msg msg-success' : ' response-msg msg-error'}>
          <span className={response.success ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-exclamation-sign'}></span>
          <p>{response.message}</p>
        </Col>
      </Row>
    );
  }
}

export default RspMsg;
