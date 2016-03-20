import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {updateClass, addClass, clearResponse, setError} from 'actions/ClassActions';
import moment from 'moment';
import {Row, Col, Grid, Input, Button} from 'react-bootstrap';
import Formsy from 'formsy-react';
import Spinner from 'components/Spinner';
import {setActiveClass} from 'actions/ClassActions';
import InputField from './../../../components/Application/components/Forms/InputField';
import Textarea from './../../../components/Application/components//Forms/Textarea';
import SelectField from '../../../components/Application/components/Forms/SelectField';
import RspMsg from './../../../components/Application/components/Forms/message';
import './add-class.less';

Formsy.addValidationRule('isLessThan', function (values, value, otherField) {
  if (value && values[otherField]) {
    let input1 = parseFloat(value.replace(/:/g, '.'));
    let input2 = parseFloat(values[otherField].replace(/:/g, '.'));
    return input1 < input2;
  } else {
    return true;
  }
});

Formsy.addValidationRule('isMoreThan', function (values, value, otherField) {
  if (value && values[otherField]) {
    let input1 = parseFloat(values[otherField].replace(/:/g, '.'));
    let input2 = parseFloat(value.replace(/:/g, '.'));
    return input1 < input2;
  } else {
    return true;
  }
});

const AddClass = React.createClass({
  componentWillMount() {
    setActiveClass();
  },

  render() {
    const profile = _.get(this.props, 'classProfile.classProfile') || {};
    const date = profile.date ? moment(profile.date, 'YYYYMMDD').format('YYYY-MM-DD') : null;
    const awaitingSave = _.get(this.props, 'view.awaitingSave')
    return (
      <Grid fluid>
        <div className="row header">
          <Col xs={12}>
            <h1>{profile._id ? 'Update Class' : 'Add Class'}</h1>
          </Col>
        </div>
        <Row>
          <div className="col-xs-12 col-lg-10">
            <Row>
              <Formsy.Form onValidSubmit={this.submitClass} onValid={this.enableButton} onInvalid={this.disableButton} className="col-xs-12">
                <Row>
                  <InputField
                    className="col-xs-12 "
                    type="text"
                    name="name"
                    title="Class Name"
                    value={profile.name ? profile.name : ''} 
                    validations="isExisty"
                    validationError="Please enter a class name!" 
                    required />
                </Row>
                <Row>
                  <Textarea
                    className="col-xs-12 " 
                    type="textarea" 
                    name="description"
                    value={profile.description ? profile.description : ''} 
                    title="Class Description" />
                </Row>
                <Row>
                  <SelectField 
                    className="col-xs-12 "
                    value={profile.instructor ? profile.instructor.id : ''}   
                    name="instructor" 
                    title="Instructor"
                    options={this.getInstructors()} />
                </Row>
                <Row>
                  <InputField 
                    className="col-xs-12 "
                    value={date ? date : ''}  
                    type="date" 
                    name="date" 
                    title="Date" 
                    required />
                </Row>
                <Row>
                  <InputField 
                    className="col-xs-12 col-sm-6 " 
                    type="time" 
                    name="start" 
                    title="Start Time"
                    value={profile.time ? profile.time.start : ''} 
                    validations={"isLessThan:end"}
                    validationError="Your start time is after your closing time!" 
                    required />
                  <InputField 
                    className="col-xs-12 col-sm-6 " 
                    type="time" 
                    name="end"
                    title="End Time"
                    value={profile.time ? profile.time.end : ''} 
                    validations={"isMoreThan:start"}
                    validationError="Your end time is before your opening time!" 
                    required />
                </Row>
                <Row>
                  <InputField 
                    className="col-xs-12 col-sm-6 " 
                    type="text" 
                    name="price" 
                    title="Price"
                    value={profile.price ? (profile.price / 100).toFixed(2) : ''} 
                    required 
                    validations={{
                      isNumeric: true
                    }}
                    validationError="Please enter a number!" />
                  <InputField 
                    className="col-xs-12 col-sm-6 " 
                    type="text" 
                    name="capactiy" 
                    title="Capacity"
                    value={profile.capacity ? profile.capacity : ''} 
                    validations={{
                      isInt: true
                    }}
                    validationError="Please enter a number!"
                    required/>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button type="submit" value="Submit" disabled={!this.state.canSubmit}>
                      {
                        awaitingSave ?
                        <Spinner className={'button-spinner'} /> :
                        profile._id ? 'Update' : 'Submit'
                      }
                    </Button>
                  </Col>
                </Row>
              </Formsy.Form>
            </Row>
            <RspMsg delay={5000} response={this.props.view.response ? this.props.view.response : null} />
          </div>
        </Row>
      </Grid>
    );
  },
  
  componentDidMount() {
    clearResponse();
  },

  getInitialState() {
    return { canSubmit: false };
  },
  getInstructors() {
    return {
      data: _.map(_.get(this.props.instructors, 'allInstructors', []), (session) => {
        return {
          name: `${session.name.first} ${session.name.last}`,
          id: session._id
        }
      })
    };
  },
  submitClass(data) {
    const classTime = moment(data.date).set('hour', data.start.split(':')[0]).set('minute', data.start.split(':')[1]).format()
    const validDate = moment().isBefore(moment(classTime))
    if (validDate) {
      data.dateAndTime = classTime;
      data.date = moment(data.date).format('YYYYMMDD');
      data.private = false;
      data.price = this.currency(data.price);
      data.capacity = Number(data.capactiy);
      if (_.get(this.props, 'classProfile.classProfile._id')) {
        data.SessionId = this.props.classProfile.classProfile._id;
        updateClass(data, this.props.classProfile.classProfile._id);
      } else {
        addClass(data);
      }
    } else {
      setError({'success': false, 'message': 'Invalid Date!'});
    }

  },

  enableButton() {
    this.setState({ canSubmit: true });
  },

  disableButton() {
    this.setState({ canSubmit: false });
  },

  currency(value) {
    var val = Number(value);
    val = val.toFixed(2);
      return val * 100;
  }
});

export default branch(AddClass, {
  cursors: {
    view: ['views', 'AddClass']
  },
  facets: {
    instructors: 'Instructors',
    classProfile: 'ClassProfile'
  }
});

