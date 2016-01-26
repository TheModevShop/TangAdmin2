import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {addClass} from 'actions/ClassActions';
import moment from 'moment';
import {Row, Col, Grid, Input, Button} from 'react-bootstrap';
import formsy from 'formsy-react';
import InputField from './../../../components/Application/components/Forms/InputField';
import Textarea from './../../../components/Application/components//Forms/Textarea';
import SelectField from '../../../components/Application/components/Forms/SelectField';
import RspMsg from './../../../components/Application/components/Forms/message';
import './add-class.less';

const AddClass = React.createClass({
  render() {
    return (
      <Grid fluid>
        <div className="row header">
          <Col xs={12}>
            <h1>Add Class</h1>
          </Col>
        </div>
        <Row>
          <div className="col-xs-12 col-lg-10 col-xs-offset-0 col-lg-offset-1">
            <Row>
              <Formsy.Form onValidSubmit={this.submitClass} onValid={this.enableButton} onInvalid={this.disableButton} className="col-xs-12">
                <Row>
                  <InputField className="col-xs-12 " type="text" name="name" title="Name" required />
                  <Textarea className="col-xs-12 " type="textarea" name="description" title="Description"  />
                </Row>
                <Row>
                  <InputField className="col-xs-12 col-sm-6 "  type="date" name="date" title="Date" required />
                  <InputField className="col-xs-12 col-sm-3 " type="time" name="time.start" title="Start Time" required />
                  <InputField className="col-xs-12 col-sm-3 " type="time" name="time.end" title="End Time" required />
                </Row>
                <Row>
                  <InputField className="col-xs-12 col-sm-5 " type="text" name="capactiy" title="Class Capacity"  />
                  <SelectField className="col-xs-12 col-sm-7 "  name="Instructor" title="Instructor" options={this.getInstructors()} />
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button type="submit" value="Submit" disabled={!this.state.canSubmit}>Submit</Button>
                  </Col>
                </Row>
              </Formsy.Form>
            </Row>
            {
              this.props.view.response ?
                <RspMsg response={this.props.view.response} /> 
              : null
            }
          </div>
        </Row>
      </Grid>
    );
  },
  getInitialState() {
    return { canSubmit: false };
  },
  getInstructors() {
    console.log
    return {
      instructors: _.map(_.get(this.props.instructors, 'allInstructors', []), (session) => {
        return {
          name: `${session.name.first} ${session.name.last}`,
          id: session._id
        }
      })
    };
  },
  async submitClass(data) {
    const classTime = moment(data.date).set('hour', data.time.start.split(':')[0]).set('minute', data.time.start.split(':')[1]).format()
    const validDate = moment().isBefore(moment(classTime))
    if (validDate) {
      data.date = moment(data.date);
      data.dateAndTime = moment(data.date);
      data.private = false;
      data = JSON.stringify(data);
      const response = await addClass(data);
    } else {
      this.props.view.response = {'success': false, 'message': 'Invalid Date!'};
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
  },
  facets: {
    instructors: 'Instructors'
  }
});

