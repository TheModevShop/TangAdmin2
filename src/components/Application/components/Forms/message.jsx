import React from 'react';
import {Row, Col} from 'react-bootstrap';

var RspMsg = React.createClass({
  getDefaultProps: function() {
    return {delay: 1000};
  },
  getInitialState: function(){
    return {visible: true};
  },
  componentWillReceiveProps: function(nextProps) {
    // reset the timer if children are changed
    if (nextProps.response !== this.props.response) {
      this.setTimer();
      this.setState({visible: true});
    }
  },
  componentDidMount: function() {
      this.setTimer();
  },
  setTimer: function() {
    if (!this.props.persist) {
      // clear any existing timer
      this._timer != null ? clearTimeout(this._timer) : null;

      // hide after `delay` milliseconds
      this._timer = setTimeout(function(){
        this.setState({visible: false});
        this._timer = null;
      }.bind(this), this.props.delay);
    };
  },
  componentWillUnmount: function() {
    clearTimeout(this._timer);
  },
  render: function() {
    const response = this.props.response ? this.props.response : null;
    return this.state.visible ?
      <Row className="msg-box">
        { response ? 
            <Col xs={12} className={response.success ? ' response-msg msg-success' : ' response-msg msg-error'}>
                <span className={response.success ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-exclamation-sign'}></span>
                <p>{response.message}</p>
            </Col>
          : null }
        </Row>
     : null
  }
});

export default RspMsg;