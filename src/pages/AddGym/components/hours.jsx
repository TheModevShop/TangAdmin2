import React from 'react';
import InputField from './../../../components/Application/components/Forms/InputField';
import Textarea from './../../../components/Application/components/Forms/Textarea';
import {Row, Label, FormGroup, Form, Col, Grid, Input, Button} from 'react-bootstrap';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import './../add-gym.less';

var HoursComponent = React.createClass({
	render() {
		return (
			<Row>
				<Col xs={12}>
					<Row>
						<Col xs={12} className="day-container">
							<Label>Monday</Label>
							<InputField name="hours.mon_1_open" title="" type="time" />
							<div className="seperator">–</div>
							<InputField name="hours.mon_1_close" title="" type="time" />
							<InputField name="mon_closed" type="checkbox" className="checkbox " title="Closed" />
						</Col>
					</Row>
					<Row>
						<Col xs={12} className="day-container">
							<Label>Tuesday</Label>
							<InputField name="hours.tue_1_open" title="" type="time" />
							<div className="seperator">–</div>
							<InputField name="hours.tue_1_close" title="" type="time" />
							<InputField name="tue_closed" type="checkbox" className="checkbox " title="Closed" />
						</Col>
					</Row>
					<Row>
						<Col xs={12} className="day-container">
							<Label>Wednesday</Label>
							<InputField name="hours.wed_1_open" title="" type="time" />
							<div className="seperator">–</div>
							<InputField name="hours.wed_1_close" title="" type="time" />
							<InputField name="wed_closed" type="checkbox" className="checkbox " title="Closed" />
						</Col>
					</Row>
					<Row>
						<Col xs={12} className="day-container">
							<Label>Thursday</Label>
							<InputField name="hours.thu_1_open" title="" type="time" />
							<div className="seperator">–</div>
							<InputField name="hours.thu_1_close" title="" type="time" />
							<InputField name="thu_closed" type="checkbox" className="checkbox " title="Closed" />
						</Col>
					</Row>
					<Row>
						<Col xs={12} className="day-container">
							<Label>Friday</Label>
							<InputField name="hours.fri_1_open" title="" type="time" />
							<div className="seperator">–</div>
							<InputField name="hours.fri_1_close" title="" type="time" />
							<InputField name="fri_closed" type="checkbox" className="checkbox " title="Closed" />
						</Col>
					</Row>
					<Row>
						<Col xs={12} className="day-container">
							<Label>Saturday</Label>
							<InputField name="hours.sat_1_open" title="" type="time" />
							<div className="seperator">–</div>
							<InputField name="hours.sat_1_close" title="" type="time" />
							<InputField name="sat_closed" type="checkbox" className="checkbox " title="Closed" />
						</Col>
					</Row>
					<Row>
						<Col xs={12} className="day-container">
							<Label>Sunday</Label>
							<InputField name="hours.sun_1_open" title="" type="time" />
							<div className="seperator">–</div>
							<InputField name="hours.sun_1_close" title="" type="time" />
							<InputField name="sun_closed" type="checkbox" className="checkbox " title="Closed" />
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
});

export default HoursComponent;
