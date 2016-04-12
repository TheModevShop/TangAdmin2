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
		const data = this.props.data.hours ? this.props.data.hours : null;
		const days = { "days": [{"name": "Monday", "abbr": "mon", "open": data ? data.mon_open : null, "close": data ? data.mon_close : null}, {"name": "Tuesday", "abbr": "tue", "open": data ? data.tue_open : null, "close": data ? data.tue_close : null}, {"name": "Wednesday", "abbr": "wed", "open": data ? data.wed_open : null, "close": data ? data.wed_close : null}, {"name": "Thursday", "abbr": "thu", "open": data ? data.thu_open : null, "close": data ? data.thu_close : null}, {"name": "Friday", "abbr": "fri", "open": data ? data.fri_open : null, "close": data ? data.fri_close : null}, {"name": "Saturday", "abbr": "sat", "open": data ? data.sat_open : null, "close": data ? data.sat_close : null}, {"name": "Sunday", "abbr": "sun", "open": data ? data.sun_open : null, "close": data ? data.sun_close : null}]};
		const daysList = _.map(days.days, (day) => {
		  return (
		     <DayModule params={day} key={day.abbr} />
		   );
		 });

		return (
			<Formsy.Form disbled={this.props.viewOnly} ref="form" onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)} className="row">
			    <Col xs={12}>
					<Row>
							{daysList}
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
