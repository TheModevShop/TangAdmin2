import React from 'react';
import InputField from './../../../components/Application/components/Forms/InputField';
import moment from 'moment';
import {Label, Col, Input} from 'react-bootstrap';
import Formsy from 'formsy-react';

Formsy.addValidationRule('isLessThan', function (values, value, otherField) {
	if (value && values[otherField]) {
		let input1 = parseFloat(value.replace(/:/g, '.'));
		let input2 = parseFloat(values[otherField].replace(/:/g, '.'));
		return input1 < input2;
	} else {
		return true;
	}
});

Formsy.addValidationRule('isMoreThan', function (values, value, otherField) {
	if (value && values[otherField]) {
		let input1 = parseFloat(values[otherField].replace(/:/g, '.'));
		let input2 = parseFloat(value.replace(/:/g, '.'));
		return input1 < input2;
	} else {
		return true;
	}
});

class Day extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {closed: false};
	}

	render() {
		const params = this.props.params;
		const input1 = params.abbr + "_open";
		const input2 = params.abbr + "_close";

		return (
			<Col xs={12} className="day-container">
				<Label>{params.name}</Label>
				<InputField
					name={input1} 
					disabled={this.state.closed ? "disabled" : false} 
					title=""
					validations={"isLessThan:" + input2}
					validationError="Your opening time is after your closing time!" 
					className={this.state.closed ? "disabled" : ""} 
					value={this.state.closed ? '' : params.open} 
					type="time" />
				<div className="seperator">–</div>
				<InputField
					name={input2}
					disabled={this.state.closed ? "disabled" : false} 
					validations={"isMoreThan:" + input1}
					validationError="Your closing time is before your opening time!"
					title=""
					className={this.state.closed ? "disabled" : ""} 
					value={this.state.closed ? '' : params.close} 
					type="time" />
				<Input
					label="Closed"
					name={params.abbr + "_closed"} 
					type="checkbox" 
					onChange={this.closed.bind(this)} 
					className="checkbox " 
					title="Closed" />
			</Col>
		);
	}

	closed(params) {
		this.setState({closed: params.target.checked});
	}
}

export default Day;


	