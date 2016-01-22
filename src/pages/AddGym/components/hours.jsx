import React from 'react';
import InputField from './../../../components/theme/Forms/InputField';
import Textarea from './../../../components/theme/Forms/Textarea';
import {Row, Label, FormGroup, Form, Col, Grid, Input, Button} from 'react-bootstrap';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import './../add-gym.less';

var HoursComponent = React.createClass({
	render() {
		return (
			<div>
<Row className="hours">
  <Col xs={6}>
    <Row>
      <Col className="hours-day-label" xs={12}>
        Monday
      </Col> 
    </Row>
    <Row>
      <InputField className="col-xs-12 col-sm-6 " name="hours.mon_1_open" title="Open" type="time" />
      <InputField className="col-xs-12 col-sm-6 " name="hours.mon_1_close" title="Close" type="time" />
    </Row>
  </Col>
  <Col xs={6}>
    <Row>
      <Col className="hours-day-label" xs={12}>
        Tuesday
      </Col> 
    </Row>
    <Row>
      <InputField className="col-xs-12 col-sm-6 " name="hours.tue_1_open" title="Open" type="time" />
      <InputField className="col-xs-12 col-sm-6 " name="hours.tue_1_close" title="Close" type="time" />
    </Row>
  </Col>
</Row>
<Row className="hours">
  <Col xs={6}>
    <Row>
      <Col className="hours-day-label" xs={12}>
        Wednesday
      </Col> 
    </Row>
    <Row>
      <InputField className="col-xs-12 col-sm-6 " name="hours.wed_1_open" title="Open" type="time" />
      <InputField className="col-xs-12 col-sm-6 " name="hours.wed_1_close" title="Close" type="time" />
    </Row>
  </Col>
  <Col xs={6}>
    <Row>
      <Col className="hours-day-label" xs={12}>
        Thursday
      </Col> 
    </Row>
    <Row>
      <InputField className="col-xs-12 col-sm-6 " name="hours.thu_1_open" title="Open" type="time" />
      <InputField className="col-xs-12 col-sm-6 " name="hours.thu_1_close" title="Close" type="time" />
    </Row>
  </Col>
</Row>
<Row className="hours">
  <Col xs={6}>
    <Row>
      <Col className="hours-day-label" xs={12}>
        Friday
      </Col> 
    </Row>
    <Row>
      <InputField className="col-xs-12 col-sm-6 " name="hours.fri_1_open" title="Open" type="time" />
      <InputField className="col-xs-12 col-sm-6 " name="hours.fri_1_close" title="Close" type="time" />
    </Row>
  </Col>
  <Col xs={6}>
    <Row>
      <Col className="hours-day-label" xs={12}>
        Saturday
      </Col> 
    </Row>
    <Row>
      <InputField className="col-xs-12 col-sm-6 " name="hours.sat_1_open" title="Open" type="time" />
      <InputField className="col-xs-12 col-sm-6 " name="hours.sat_1_close" title="Close" type="time" />
    </Row>
  </Col>
 </Row>
<Row className="hours">
<Col xs={6}>
  <Row>
    <Col className="hours-day-label" xs={12}>
      Sunday
    </Col> 
  </Row>
  <Row>
    <InputField className="col-xs-12 col-sm-6 " name="hours.sun_1_open" title="Open" type="time" />
    <InputField className="col-xs-12 col-sm-6 " name="hours.sun_1_close" title="Close" type="time" />
  </Row>
</Col>
</Row>
	        </div>
		);
	}
});

export default HoursComponent;
