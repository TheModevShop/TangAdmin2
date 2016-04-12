import React from 'react';
import {branch} from 'baobab-react/higher-order';
import InputField from './../../../components/Application/components/Forms/InputField';
import SelectField from './../../../components/Application/components/Forms/SelectField';
import {setAppFee} from 'actions/AddGymActions';
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
		return {
			appFee: inputs.appFee,
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
								className="col-xs-12 col-sm-4 " 
								name="appFee" 
								value={data.appFee.flatFee ? (data.appFee.flatFee / 100).toFixed(2) : ''} 
								title="Gym App Fee" 
								validations={{
									isNumeric: true
								}}
								validationError="Please enter a number!" />
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
		const gymId = this.props.data._id ? this.props.data._id : null;
		const appFee = this.currency(data.appFee)
		setAppFee(appFee, gymId)
	}

	currency(value) {
		var val = Number(value);
		val = val.toFixed(2);
			return val * 100;
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
