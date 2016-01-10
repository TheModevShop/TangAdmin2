import React from 'react';
import formsy from 'formsy-react';
import InputField from './../../components/theme/Forms/InputField';
import Textarea from './../../components/theme/Forms/Textarea';
import {branch} from 'baobab-react/higher-order';
import {addGym} from 'actions/GymActions';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import {Row, Label, FormGroup, Form, Col, Grid, Input, Button} from 'react-bootstrap';
import './add-gym.less';

var AddGym = React.createClass({
  render() {
    return (
      <Grid fluid>
        <Row>
          <div className="panel panel-info col-xs-12 col-sm-10 col-sm-offset-1">
            <div className="row panel-heading">
              <Col xs={12}>
                <h1>Add Gym</h1>
              </Col>
            </div>
            <Row>
              <Formsy.Form onValidSubmit={this.getGeoPoint} onValid={this.enableButton} onInvalid={this.disableButton} className="col-xs-12">
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
                  <Col xs={12}>
                    <Button bsStyle="primary" type="submit" value="Submit" bsSize="large" disabled={!this.state.canSubmit}>Submit</Button>
                  </Col>
                </Row>
              </Formsy.Form>
            </Row>
          </div>
        </Row>
      </Grid>
    );
  },

  async getGeoPoint(data) {
    try {
      const location = await getGymGeoPoints(data.address.street + ' ' +  data.address.city + ', ' +  data.address.state + ' ' +  data.address.zipcode);
      data.Location = [location.lng, location.lat];
      this.submitGym(data);
    } catch (err) {
      console.log(err)
    }
  },

  submitGym(data) {
    const gymData = JSON.stringify(data);
    console.log(gymData);
    addGym(gymData);
  },

  enableButton() {
    this.setState({ canSubmit: true });
  },

  getInitialState() {
    return { canSubmit: false };
  },

  disableButton() {
    this.setState({ canSubmit: false });
  }
 
});

export default branch(AddGym, {
  cursors: {
    addGym: ['views', 'AddGym']
  }
});
