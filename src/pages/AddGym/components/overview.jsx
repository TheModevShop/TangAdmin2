import React from 'react';
import InputField from './../../../components/Application/components/Forms/InputField';
import Textarea from './../../../components/Application/components/Forms/Textarea';
import SelectField from './../../../components/Application/components/Forms/SelectField';
import {addGym, updateGym} from 'actions/GymActions';
import GoogleMap from 'components/GoogleMap';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import {Row, Col, Button} from 'react-bootstrap';
import tree from 'state/StateTree';

class OverviewComponent extends React.Component {
	constructor(...args) {
		super(...args);
		this.AddGym = tree.select(['views', 'AddGym']);
		this.state = {
		  canSubmit: false
		}
	}

	render() {
		const data = this.props.params;
		return (
			<Formsy.Form ref="form" onValidSubmit={this.getGeoPoint.bind(this, false)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)} className="row">
			    <Col xs={12}>
					<Row>
					  <InputField 
					  	className="col-xs-12 " 
					  	name="name" 
					  	title="Name" 
					  	type="text"
					  	validations="isExisty"
					  	value={data.name ? data.name : ""} 
					  	validationError="Please enter a Gym Name!" 
					  	required />
					  <Textarea 
					  	className="col-xs-12 "
					  	name="description"
					  	title="Description"
					  	value={data.description ? data.description : ""} 
					  	validations="isExisty"
					  	validationError="Please enter a description for your gym!"
					  	required />
					</Row>
					<Row>
						<Col xs={12} className="map">
							<GoogleMap marker={this.state.location} />
							<Button onClick={this.getGeoPoint.bind(this, true)}>Get Geo Points</Button>
						</Col>
					</Row>
					<Row>
					  <InputField 
					  	className="col-xs-12 address-input " 
					  	name="address.street" 
					  	value={data.address.street ? data.address.street : ""} 
					  	title="Street Address"
					  	validations="isExisty"
					  	validationError="Please enter a street address for your gym!"
					  	required />
					</Row>
					<Row>
					  <InputField 
					  	className="col-xs-12 col-sm-4 address-input " 
					  	value={data.address.city ? data.address.city : ""} 
					  	name="address.city" 
					  	title="City"
					  	validations="isExisty"
					  	validationError="Please enter a city for your gym!"
					  	required />
					  <SelectField 
					  	className="col-xs-12 col-sm-4 address-input " 
					  	name="address.state" 
					  	title="State" 
					  	value={data.address.state ? data.address.state : ""} 
					  	options={this.getStates()} 
					  	validations="isExisty"
					  	validationError="Please select a state for your gym!"
					  	required />
					  <InputField
					  	className="col-xs-12 col-sm-4 address-input " 
					  	name="address.zipcode" 
					  	title="Zip Code" 
					  	value={data.address.zipcode ? data.address.zipcode : ""}
					  	validations={{
							isInt: true,
							maxLength: 5
						}}
					  	validationError="Please enter a valid zip code!" 
					  	required />
					</Row>
					<Row>
					  <InputField 
					  	className="col-xs-12 col-sm-6 " 
					  	type="tel" 
					  	name="contact.phone" 
					  	value={data.contact.phone ? data.contact.phone : ""} 
					  	title="Phone Number"
				  	  	validations={{
				  			isNumeric: true,
				  			maxLength: 10
				  		}}
				  	  	validationError="Please enter a valid phone number (no dashes or parenthesis)!" 
					  	required />
					  <InputField
					   className="col-xs-12 col-sm-6 " 
					   type="email" 
					   name="contact.email" 
					   value={data.contact.email ? data.contact.email : ""} 
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
					  	className="col-xs-12 " 
					  	type="text" 
					  	name="contact.website" 
					  	title="Website" 
					  	value={data.contact.website ? data.contact.website : ""} 
					  	validations={{
					  	  matchRegexp: /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s\/]{2,}|www\.[^\s]+\.[^\s\/]{2,}/
					  	}}
					  	validationError="Please enter a valid url!" 
					  	required />
					</Row>
					<Row>
					  <InputField 
					  	className="col-xs-12 col-sm-4 " 
					  	name="privateSessionPrice" 
					  	value={data.privateSessionPrice ? data.privateSessionPrice : ""} 
					  	title="Private Session Price" 
					  	validations={{
				  			isNumeric: true
				  		}}
				  		validationError="Please enter a number!" />
					  <InputField 
					  	className="col-xs-12 col-sm-4 " 
					  	name="cancellationPolicy.percent" 
					  	title="Cancellation Fee" 
					  	value={data.cancellationPolicy.percent ? data.cancellationPolicy.percent : ""} 
					  	required
					  	validations={{
				  			isNumeric: true
				  		}}
				  		validationError="Please enter a number!" />
					  <InputField 
					  	className="col-xs-12 col-sm-4 " 
					  	name="cancellationPolicy.time" 
					  	title="Cancellation Time" 
					  	value={data.cancellationPolicy.time ? data.cancellationPolicy.time : ""} 
					  	validations={{
				  			isNumeric: true
				  		}}
				  		validationError="Please enter a number!"
					  	required />
					</Row>
					<Button type="submit" value="Submit" disabled={!this.state.canSubmit}>Update</Button>
			    </Col>
			</Formsy.Form>
		);
	}

	getStates() {
	  return {
	    data: [{name:"Alabama", id:"AL"},{name:"Alaska", id:"AK"},{name:"American Samoa", id:"AS"},{name:"Arizona", id:"AZ"},{name:"Arkansas", id:"AR"},{name:"California", id:"CA"},{name:"Colorado", id:"CO"},{name:"Connecticut", id:"CT"},{name:"Delaware", id:"DE"},{name:"District Of Columbia", id:"DC"},{name:"Federated States Of Micronesia", id:"FM"},{name:"Florida", id:"FL"},{name:"Georgia", id:"GA"},{name:"Guam", id:"GU"},{name:"Hawaii", id:"HI"},{name:"Idaho", id:"ID"},{name:"Illinois", id:"IL"},{name:"Indiana", id:"IN"},{name:"Iowa", id:"IA"},{name:"Kansas", id:"KS"},{name:"Kentucky", id:"KY"},{name:"Louisiana", id:"LA"},{name:"Maine", id:"ME"},{name:"Marshall Islands", id:"MH"},{name:"Maryland", id:"MD"},{name:"Massachusetts", id:"MA"},{name:"Michigan", id:"MI"},{name:"Minnesota", id:"MN"},{name:"Mississippi", id:"MS"},{name:"Missouri", id:"MO"},{name:"Montana", id:"MT"},{name:"Nebraska", id:"NE"},{name:"Nevada", id:"NV"},{name:"New Hampshire", id:"NH"},{name:"New Jersey", id:"NJ"},{name:"New Mexico", id:"NM"},{name:"New York", id:"NY"},{name:"North Carolina", id:"NC"},{name:"North Dakota", id:"ND"},{name:"Northern Mariana Islands", id:"MP"},{name:"Ohio", id:"OH"},{name:"Oklahoma", id:"OK"},{name:"Oregon", id:"OR"},{name:"Palau", id:"PW"},{name:"Pennsylvania", id:"PA"},{name:"Puerto Rico", id:"PR"},{name:"Rhode Island", id:"RI"},{name:"South Carolina", id:"SC"},{name:"South Dakota", id:"SD"},{name:"Tennessee", id:"TN"},{name:"Texas", id:"TX"},{name:"Utah", id:"UT"},{name:"Vermont", id:"VT"},{name:"Virgin Islands", id:"VI"},{name:"Virginia", id:"VA"},{name:"Washington", id:"WA"},{name:"West Virginia", id:"WV"},{name:"Wisconsin", id:"WI"},{name:"Wyoming", id:"WY"}]
		};
	}

	async getGeoPoint(btn, form) {
	  try {
	  	if (btn) {
	  		this.refs.form.updateModel();
	  		const data = this.refs.form.model;
	  		let location = await getGymGeoPoints(data["address.street"] + ' ' +  data["address.city"] + ', ' +  data["address.state"] + ' ' +  data["address.zipcode"]);
	  		this.setState({location: location});
	  	} else {
	  		let location = await getGymGeoPoints(form.address.street + ' ' +  form.address.city + ', ' +  form.address.state + ' ' +  form.address.zipcode);
	  		form.location = [location.lng, location.lat];
	  		this.AddGym.set(['overview'], form);
	  		const gymId = this.AddGym.get(['id']);
	  		form._id = gymId;
	  		if (gymId) {
	  			updateGym(form, gymId);
	  		} else {
	  			addGym(form);
	  		}
	  	}
	  } catch (err) {
	    console.log(err)
	  }
	}

	enableButton() {
	  this.setState({ canSubmit: true });
	}

	disableButton() {
	  this.setState({ canSubmit: false });
	}
}

export default OverviewComponent;
