import React from 'react';
import {branch} from 'baobab-react/higher-order';
import InputField from './../../../components/Application/components/Forms/InputField';
import SelectField from './../../../components/Application/components/Forms/SelectField';
import {addGymOwner} from 'actions/AddGymActions';
import {Row, Col, Button} from 'react-bootstrap';
import _ from 'lodash';

class OwnerComponent extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {
		  canSubmit: false,
		  gymOwnerRole: null
		}
	}

	mapInputs(inputs) {
		const roles = _.get(this.props, 'roles.roles');
		const gymOwnerRole = _.find(roles, {'name': 'gym-owner'});
		return {
			first: inputs.first,
			last: inputs.last,
			email: inputs.email,
			password: inputs.password,
			gym: this.props.data._id,
			role: gymOwnerRole._id
		};
	}

	render() {
		const data = this.props.data || {};
		const roles = _.get(this.props, 'roles.roles') || {};
		return (
			<Formsy.Form ref="form" onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)} mapping={this.mapInputs.bind(this)} className="row">
				 <Col xs={12}>
						<Row>
						  <InputField 
						  	className="col-xs-12 col-sm-6 " 
						  	name="first" 
						  	title="First Name" 
						  	type="text"
						  	validations="isExisty"
						  	validationError="Please enter your first name." 
						  	required />
						  <InputField 
						  	className="col-xs-12 col-sm-6 " 
						  	name="last" 
						  	title="Last Name" 
						  	type="text"
						  	validations="isExisty"
						  	validationError="Please enter your first name." 
						  	required />
						</Row>
						<Row>
							<InputField
								className="col-xs-12 " 
								type="email" 
								name="email"
								title="Email Address" 
								validations={{
									isEmail: true,
									maxLength: 50
								}}
								validationError="Please enter a valid email address!" 
								required />
						</Row>
						<Row>
							<InputField
								className="col-xs-6 " 
								type="password" 
								name="password"
								title="Password" 
								validations={{
									maxLength: 50
								}}
								validationError="Your password needs to be under 50 characters." 
								required />
							<InputField
								className="col-xs-6 " 
								type="password" 
								name="passwordRepeat"
								title="Confirm Your Password" 
								validations={{
									equalsField: 'password'
								}}
								validationError="Your password must match." 
								required />
						</Row>
						<Row>
							<Col xs={12}>
								<Button type="submit" value="Submit" disabled={!this.state.canSubmit}>Update</Button>
							</Col>
						</Row>
				  </Col>
			    
			</Formsy.Form>
		);
	}

	submit(data) {
		if (new RegExp('(?=.{6,}).*', 'g').test(data.password)) {
      addGymOwner(data, this.props.data._id);
    } else {
      alert('Your password must be atleast 6 letters');
    }
	}

	enableButton() {
		this.setState({ canSubmit: true });
	}

	disableButton() {
	  this.setState({ canSubmit: false });
	}
}

export default branch(OwnerComponent, {
  facets: {
    roles: 'Roles'
  }
});
