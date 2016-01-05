import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {addClass} from 'actions/ClassActions';
import {Row, Col, Grid, Input, Button} from 'react-bootstrap';

class AddClass extends React.Component {
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
                <h1>Add Class</h1>
              </Col>
            </div>
            <Row>
              <form onSubmit={this.submitGym.bind(this)} className="col-xs-12">
                <Row>
                  <Col xs={12}>
                    <Input id='className' type="text" placeholder='' label='Name' />
                    <Input type="textarea" label="Description" placeholder='' />
                    <Input id='classDate' type="date" placeholder='' label='Date' />
                    <Input id='classStartTime' type="time" placeholder='' label='Class Time' />
                    <Input id='classCapacity' type="number" placeholder='' label='Class Duration' />
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
  
  submitClass(e) {
    e.preventDefault();
    const data = {}
    addClass(data);
  }
}

export default branch(AddClass, {
  cursors: {
    view: ['views', 'AddClass']
  }
});

