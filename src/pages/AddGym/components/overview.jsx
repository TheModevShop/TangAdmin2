import React from 'react';
import InputField from './../../../components/theme/Forms/InputField';
import Textarea from './../../../components/theme/Forms/Textarea';
import {Row, Label, FormGroup, Form, Col, Grid, Input, Button} from 'react-bootstrap';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import './../add-gym.less';

var OverviewComponent = React.createClass({
	render() {
		const data = this.props.data;
		return (
			<div>
				<Row>
				  <InputField className="col-xs-12 " name="name" title="Name" value={data.name ? data.name : ""} required />
				  <Textarea className="col-xs-12 " type="textarea" name="description" value={data.description ? data.description : ""} title="Description" required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 address-input" name="address.street" value={data.address.street ? data.address.street : ""} title="Street Address" required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 col-sm-4 address-input" value={data.address.city ? data.address.city : ""} name="address.city" title="City" required />
				  <InputField className="col-xs-12 col-sm-4 address-input" name="address.state" title="State" value={data.address.state ? data.address.state : ""} required />
				  <InputField className="col-xs-12 col-sm-4 address-input" name="address.zipcode" title="Zip Code" value={data.address.zipcode ? data.address.zipcode : ""} required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 col-sm-6 " name="contact.phone" value={data.contact.phone ? data.contact.phone : ""} title="Phone Number" required />
				  <InputField className="col-xs-12 col-sm-6 " name="contact.email" value={data.contact.email ? data.contact.email : ""} title="Email Address" required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 " name="contact.website" title="Website" value={data.contact.website ? data.contact.website : ""} required />
				</Row>
				<Row>
				  <InputField className="col-xs-12 col-sm-4 " name="privateSessionPrice" value={data.privateSessionPrice ? data.privateSessionPrice : ""} title="Private Session Price" />
				  <InputField className="col-xs-12 col-sm-4 " name="cancellationPolicy.percent" title="Cancellation Fee" value={data.cancellationPolicy.percent ? data.cancellationPolicy.percent : ""} required />
				  <InputField className="col-xs-12 col-sm-4 " name="cancellationPolicy.time" title="Cancellation Time" value={data.cancellationPolicy.time ? data.cancellationPolicy.time : ""} required />
				</Row>
			</div>
		);
	}
});

export default OverviewComponent;
