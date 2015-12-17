import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {addGym} from 'actions/GymActions';
import {Row, Label, Textarea, FormGroup, Form, Col, Grid, Input, Button} from 'react-bootstrap';
import './add-gym.less';

class AddGym extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

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
              <form onSubmit={this.submitGym.bind(this)} className="col-xs-12">
                <Row>
                  <Col xs={12}>
                    <Input id='gymName' type="text" placeholder='' label='Name' />
                    <Input type="textarea" label="Description" placeholder='' />
                    <Row>
                      <Col xs={12} sm={6}>
                        <Input id='gymPhone' type="text" placeholder='' label='Phone Number' />
                      </Col>
                      <Col xs={12} sm={6}>
                        <Input id='gymEmail' type="text" placeholder='' label='Email Address' />
                      </Col>
                    </Row>
                    <Input id='gymSite' type="text" placeholder='' label='Gym Site' />
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Input id='addressOne' type="text" placeholder='' label='Address Line 1' />
                  </Col>
                  <Col xs={6}>
                    <Input id='addressTwo' type="text" placeholder='' label='Address Line 2' />
                  </Col>
                </Row>
                <Row>
                  <Col xs={4} collapseLeft collapseRight >
                    <Input id='City' type="text" placeholder='' label='City' />
                  </Col>
                  <Col xs={4}  collapseRight>
                    <Input id='State' type="text" placeholder='' label='State' />
                  </Col>
                  <Col xs={4}  collapseRight>
                    <Input id='Zip' type="text" placeholder='' label='Zip' />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button bsStyle="primary" type="submit" value="Submit" bsSize="large" disabled={this.state.disabled}>Submit</Button>
                  </Col>
                </Row>
              </form>
            </Row>
          </div>
        </Row>
      </Grid>
    );
  }
  submitGym(e) {
    e.preventDefault();
    const data = {}
    addGym(data);
  }
}

export default branch(AddGym, {
  cursors: {
    addGym: ['views', 'AddGym']
  }
});
