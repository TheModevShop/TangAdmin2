import React from 'react';
import InputField from './../../../components/theme/Forms/InputField';
import Textarea from './../../../components/theme/Forms/Textarea';
import {Row, Label, FormGroup, Form, Col, Grid, Input, Button} from 'react-bootstrap';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import './../add-gym.less';

var OverviewComponent = React.createClass({
	render() {
		return (
			<div>
				<Row>
				  <InputField className="col-xs-12 " name="name" title="Name" required />
				  <Textarea className="col-xs-12 " type="textarea" name="description" title="Description" required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 address-input" name="address.street" title="Street Address" required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 col-sm-4 address-input" name="address.city" title="City" required />
				  <InputField className="col-xs-12 col-sm-4 address-input" name="address.state" title="State" required />
				  <InputField className="col-xs-12 col-sm-4 address-input" name="address.zipcode" title="Zip Code" required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Phone Number" required />
				  <InputField className="col-xs-12 col-sm-6 " name="contact.email" title="Email Address" required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 " name="contact.website" title="Website" required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 col-sm-4 " name="privateSessionPrice" title="Private Session Price" />
				  <InputField className="col-xs-12 col-sm-4 " name="cancellationPolicy.percent" title="Cancellation Fee" required />
				  <InputField className="col-xs-12 col-sm-4 " name="cancellationPolicy.time" title="Cancellation Time" required />
				</Row>
			</div>
		);
	}
});

export default OverviewComponent;
