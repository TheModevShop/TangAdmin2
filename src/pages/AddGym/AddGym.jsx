import React from 'react';
import formsy from 'formsy-react';
import InputField from './components/InputField';
import Textarea from './components/Textarea';
import {branch} from 'baobab-react/higher-order';
import {addGym} from 'actions/GymActions';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import {Row, Label, FormGroup, Form, Col, Grid, Input, Button} from 'react-bootstrap';
import GoogleMap from 'components/GoogleMap';
import './add-gym.less';

var AddGym = React.createClass({
  render() {
    console.log(this)
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
              <GoogleMap marker={this.state.location} />
              <button onClick={this.getGeoPoint.bind(this)}>Get Geo Points</button>
            </Row>
            <Row>
              <Formsy.Form onValidSubmit={this.submitGym} onValid={this.enableButton} onInvalid={this.disableButton} className="col-xs-12">
                <Row>
                  <InputField className="col-xs-12 " name="name" title="Name" required />
                  <Textarea className="col-xs-12 " type="textarea" name="description" title="Description" required />
                </Row>
                <Row>
                  <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Phone Number" required />
                  <InputField className="col-xs-12 col-sm-6 " name="contact.email" title="Email Address" required />
                </Row>
                <Row>
                 
                </Row>
                <Row>
                  <InputField className="col-xs-12 col-sm-6 " name="address.street" title="Address Line 1" required />
                </Row>
                <Row>
                  <InputField className="col-xs-12 col-sm-4 " name="address.city" title="City" required />
                  <InputField className="col-xs-12 col-sm-4 " name="address.state" title="State" required />
                  <InputField className="col-xs-12 col-sm-4 " name="address.zipcode" title="Zip Code" required />
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

  async getGeoPoint() {
    try {
      const location = await getGymGeoPoints('2941 lamp light ln willoughby hills ohio 44094');
      console.log(location)
      this.setState({location: location});
    } catch (err) {
      console.log(err)
    }
  },

  submitGym(data) {
    var data = JSON.stringify(data);
    addGym(data);
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
