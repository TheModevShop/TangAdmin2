import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {addClass} from 'actions/ClassActions';
import moment from 'moment';
import {Row, Col, Grid, Input, Button} from 'react-bootstrap';
import formsy from 'formsy-react';
import InputField from '../../../components/theme/Forms/InputField';
import Textarea from '../../../components/theme/Forms/Textarea';
import './add-class.less';

const AddClass = React.createClass({

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
              <Formsy.Form onValidSubmit={this.submitClass} onValid={this.enableButton} onInvalid={this.disableButton} className="col-xs-12">
                <Row>
                  <InputField className="col-xs-12 " type="text" name="name" title="Name" required />
                  <Textarea className="col-xs-12 " type="textarea" name="description" title="Description" required />
                </Row>
                <Row>
                  <InputField className="col-xs-12 col-sm-6 "  type="date" name="date" title="Date" required />
                  <InputField className="col-xs-12 col-sm-6 " type="time" name="start" title="Class Time" required />
                </Row>
                <Row>
                  <InputField className="col-xs-12 col-sm-6 "  type="text" name="duration" title="Class Duration (In Minutes)" required />
                  <InputField className="col-xs-12 col-sm-6 " type="text" name="capactiy" title="Class Class Capacity" required />
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
  getInitialState() {
    return { canSubmit: false };
  },
  submitClass(data) {
    var today = new moment;
    var classDate = new moment(data.date);
    var validDate = ((today > classDate) ? false : true);
    if (validDate) {
      addClass(data);
    } else {
      console.log('todo');
    }

  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  }
});

export default branch(AddClass, {
  cursors: {
    view: ['views', 'AddClass']
  }
});

