import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import DayModule from './day';
import _ from 'lodash';
import tree from 'state/StateTree';
import {updateGym, addHours} from 'actions/AddGymActions';

class HoursComponent extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {
		  canSubmit: false
		}
	}

	render() {
		const data = this.props.data || {};
		data.hours = {};
		const days = { "days": [{"name": "Monday", "abbr": "mon", "open": data.hours.mon_open, "close": data.hours.mon_close}, {"name": "Tuesday", "abbr": "tue", "open": data.hours.tue_open, "close": data.hours.tue_close}, {"name": "Wednesday", "abbr": "wed", "open": data.hours.wed_open, "close": data.hours.wed_close}, {"name": "Thursday", "abbr": "thu", "open": data.hours.thu_open, "close": data.hours.thu_close}, {"name": "Friday", "abbr": "fri", "open": data.hours.fri_open, "close": data.hours.fri_close}, {"name": "Saturday", "abbr": "sat", "open": data.hours.sat_open, "close": data.hours.sat_close}, {"name": "Sunday", "abbr": "sun", "open": data.hours.sun_open, "close": data.hours.sun_close}]};
		const daysList = _.map(days.days, (day) => {
						  return (
						     <DayModule params={day} key={day.abbr} />
						   );
						 });

		return (
			<Formsy.Form ref="form" onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)} className="row">
			    <Col xs={12}>
					<Row>
						<Col xs={12}>
							{daysList}
						</Col>
					</Row>
					<Button type="submit" value="Submit" disabled={!this.state.canSubmit}>Update</Button>
			    </Col>
			</Formsy.Form>
		);
	}

	submit(data) {
		const gymId = this.props.data._id;
		if (gymId) {
			updateGym({hours: data}, gymId);
		}
	}

	enableButton() {
		this.setState({ canSubmit: true });
	}

	disableButton() {
		this.setState({ canSubmit: false });
	}
};

export default HoursComponent;
