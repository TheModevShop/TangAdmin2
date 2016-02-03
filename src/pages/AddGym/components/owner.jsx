import React from 'react';
import {branch} from 'baobab-react/higher-order';
import InputField from './../../../components/Application/components/Forms/InputField';
import Textarea from './../../../components/Application/components/Forms/Textarea';
import SelectField from './../../../components/Application/components/Forms/SelectField';
import {addGym, updateGym, addOverview} from 'actions/AddGymActions';
import GoogleMap from 'components/GoogleMap';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import {Row, Col, Button} from 'react-bootstrap';
import _ from 'lodash';

class OverviewComponent extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {
		  canSubmit: false
		}
	}

	render() {
		const data = this.props.overview || {};
		return (
			<Formsy.Form ref="form" onValidSubmit={this.submit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)} className="row">
				 <Col xs={12}>
						<Row>
						  <InputField 
						  	className="col-xs-12 " 
						  	name="name" 
						  	title="Name" 
						  	type="text"
						  	validations="isExisty"
						  	value={data.name ? data.name : ''} 
						  	validationError="Please enter a Gym Name!" 
						  	required />
						</Row>
						<Row>
							<SelectField 
								className="col-xs-5 address-input " 
								name="gym" 
								title="Gym" 
								value={_.get(data, 'gym') ? data.gym : ''} 
								options={this.getGyms()} 
								validations="isExisty"
								validationError="Please select a gym!"
								required />
							<InputField
								className="col-xs-7 " 
								type="email" 
								name="email" 
								value={_.get(data, 'contact.email') ? data.contact.email : ''} 
								title="Email Address" 
								validations={{
									isEmail: true,
									maxLength: 50
								}}
								validationError="Please enter a valid email address!" 
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
		console.log(data);
	}

	enableButton() {
		this.setState({ canSubmit: true });
	}

	disableButton() {
	  this.setState({ canSubmit: false });
	}

	getGyms() {
	  return {
	    data: _.map(_.get(this.props.gyms, 'allGyms', []), (gym) => {
	      return {
	        name: `${gym.name}`,
	        id: gym._id
	      }
	    })
	  };
	}
}
export default branch(OverviewComponent, {
  facets: {
    gyms: 'Gyms'
  }
});
