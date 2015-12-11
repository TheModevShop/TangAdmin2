import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Label, Textarea, FormGroup, Form, Col, Grid, Input, Button} from 'react-bootstrap';

class AddGym extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <div className="page">
        <form>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <Input id='gymName' type="text" placeholder='Gym Name' label='Gym Name' />
                <Input type="textarea" label="gymDescription" placeholder="gymDescription" />
                <Input id='gymPhone' type="text" placeholder='Gym Phone' label='Gym Phone' />
                <Input id='gymSite' type="text" placeholder='Gym Site' label='Gym Site' />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Input id='addressOne' type="text" placeholder='Address Line 1' label='Address Line 1' />
              </Col>
              <Col xs={6}>
                <Input id='addressTwo' type="text" placeholder='Address Line 2' label='Address Line 2' />
              </Col>
            </Row>
            <Row>
              <Col xs={4} collapseLeft collapseRight >
                <Input id='City' type="text" placeholder='City' label='City' />
              </Col>
              <Col xs={4}  collapseRight>
                <Input id='State' type="text" placeholder='State' label='State' />
              </Col>
              <Col xs={4}  collapseRight>
                <Input id='Zip' type="text" placeholder='Zip' label='Zip' />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button type="submit" value="Submit" bsSize="large" disabled={this.state.disabled}>Submit</Button>
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    );
  }
}

export default branch(AddGym, {
  cursors: {
    addGym: ['views', 'AddGym']
  }
});
