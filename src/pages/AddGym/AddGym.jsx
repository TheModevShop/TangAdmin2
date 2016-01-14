import React from 'react';
import formsy from 'formsy-react';
import InputField from './../../components/theme/Forms/InputField';
import Textarea from './../../components/theme/Forms/Textarea';
import {branch} from 'baobab-react/higher-order';
import {addGym} from 'actions/GymActions';
import {getGymGeoPoints} from 'actions/GoogleMapsActions';
import {Row, Label, FormGroup, Form, Col, Grid, Input, Button} from 'react-bootstrap';
import DropzoneComponent from 'react-dropzone-component';
import './add-gym.less';

var componentConfig = {
    allowedFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
};

/**
 * For a full list of possible configurations,
 * please consult
 * http://www.dropzonejs.com/#configuration
 */
var djsConfig = {
    addRemoveLinks: true
};

/**
 * If you want to attach multiple callbacks, simply
 * create an array filled with all your callbacks.
 * @type {Array}
 */
var callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!');
    }
];

/**
 * Simple callbacks work too, of course.
 */
var simpleCallBack = function () {
    console.log('I\'m a simple callback');
};

/**
 * Attach event handlers here to be notified
 * for pretty much any event.
 * Arrays are accepted.
 */
var eventHandlers = {
    // All of these receive the event as first parameter:
    drop: callbackArray,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: simpleCallBack,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: null
}

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
                  <InputField className="col-xs-12 " name="contact.website" title="Website" required />
                </Row>
                <Row>
                  <InputField className="col-xs-12 col-sm-4 " name="privateSessionPrice" title="Private Session Price" />
                  <InputField className="col-xs-12 col-sm-4 " name="cancellationPolicy.price" title="Cancellation Fee" required />
                  <InputField className="col-xs-12 col-sm-4 " name="cancellationPolicy.time" title="Cancellation Time" required />
                </Row>
                <Row>
                  <Col xs={12}>
                    <label>Hours</label>
                  </Col>
                </Row>
                <Row className="hours">
                  <Col xs={6}>
                    <Row>
                      <Col className="hours-day-label" xs={12}>
                        Monday
                      </Col> 
                    </Row>
                    <Row>
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Open" type="time" />
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Close" type="time" />
                    </Row>
                  </Col>
                  <Col xs={6}>
                    <Row>
                      <Col className="hours-day-label" xs={12}>
                        Tuesday
                      </Col> 
                    </Row>
                    <Row>
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Open" type="time" />
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Close" type="time" />
                    </Row>
                  </Col>
                </Row>
                <Row className="hours">
                  <Col xs={6}>
                    <Row>
                      <Col className="hours-day-label" xs={12}>
                        Wednesday
                      </Col> 
                    </Row>
                    <Row>
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Open" type="time" />
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Close" type="time" />
                    </Row>
                  </Col>
                  <Col xs={6}>
                    <Row>
                      <Col className="hours-day-label" xs={12}>
                        Thursday
                      </Col> 
                    </Row>
                    <Row>
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Open" type="time" />
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Close" type="time" />
                    </Row>
                  </Col>
                </Row>
                <Row className="hours">
                  <Col xs={6}>
                    <Row>
                      <Col className="hours-day-label" xs={12}>
                        Friday
                      </Col> 
                    </Row>
                    <Row>
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Open" type="time" />
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Close" type="time" />
                    </Row>
                  </Col>
                  <Col xs={6}>
                    <Row>
                      <Col className="hours-day-label" xs={12}>
                        Saturday
                      </Col> 
                    </Row>
                    <Row>
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Open" type="time" />
                      <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Close" type="time" />
                    </Row>
                  </Col>
                  </Row>
                  <Row className="hours">
                    <Col xs={6}>
                      <Row>
                        <Col className="hours-day-label" xs={12}>
                          Sunday
                        </Col> 
                      </Row>
                      <Row>
                        <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Open" type="time" />
                        <InputField className="col-xs-12 col-sm-6 " name="contact.phone" title="Close" type="time" />
                      </Row>
                    </Col>
                  </Row>
                <div>
                   <DropzoneComponent config={componentConfig}
                                      eventHandlers={eventHandlers}
                                      djsConfig={djsConfig} />
                </div>
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

  onDrop(files) {
    this.setState({
      files: files
    });
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
    return { canSubmit: false, files: [] };
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
