import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import DayModule from './day';
import _ from 'lodash';

class HoursComponent extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {
		  canSubmit: false
		}
	}

	render() {
		const data = this.props.params.data.hours;
		const days = { "days": [{"name": "Monday", "abbr": "mon", "open": data.mon_open, "close": data.mon_close}, {"name": "Tuesday", "abbr": "tue", "open": data.tue_open, "close": data.tue_close}, {"name": "Wednesday", "abbr": "wed", "open": data.wed_open, "close": data.wed_close}, {"name": "Thursday", "abbr": "thu", "open": data.thu_open, "close": data.thu_close}, {"name": "Friday", "abbr": "fri", "open": data.fri_open, "close": data.fri_close}, {"name": "Saturday", "abbr": "sat", "open": data.sat_open, "close": data.sat_close}, {"name": "Sunday", "abbr": "sun", "open": data.sun_open, "close": data.sun_close}]};
		const daysList = _.map(days.days, (day) => {
			      return (
			        <DayModule params={day} key={day.abbr} />
			      );
			    });

		return (
			<Formsy.Form onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.enableButton.bind(this)} className="row">
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
		const updated = this.props.params.data.hours;
		debugger;
	}

	enableButton() {
		this.setState({ canSubmit: true });
	}

	disableButton() {
		this.setState({ canSubmit: false });
	}
};

export default HoursComponent;
