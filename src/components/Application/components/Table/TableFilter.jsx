import React from 'react';
import {branch} from 'baobab-react/higher-order';
import ClassFilter from './Filters/ClassFilter';
import moment from 'moment';
import InstructorFilter from './Filters/InstructorFilter';
import DateFilter from './Filters/DateFilter';
import StudentFilter from './Filters/StudentFilter';
import {Col} from 'react-bootstrap';

const TableFilter = React.createClass({
  render() {
    const items = _.get(this.props, 'items');
    const onChange = this.props.onChange;

    let classes = null;
    let students = null;
    let instructors = null;
    let dates = _.map(items, (item) => { return {'value': item.date, 'label': item.date, 'filter': 'date' }});
    if (this.props.table === 'private') {
      students = _.map(items, (item) => { return {'value': item.enrolled[0] ? item.enrolled[0]._id : 123, 'label': item.enrolled[0] ? item.enrolled[0].name.first + ' ' + item.enrolled[0].name.last : 'TODO', 'filter': 'students'}});
      instructors = _.map(items, (item) => { return {'value': item.instructor ? item.instructor._id : null, 'label': item.instructor ? item.instructor.name.first + ' ' + item.instructor.name.last : null, 'filter': 'instructors' }});
    } else if (this.props.table === 'classes') {
      classes = _.map(items, (item) => { return {'value': item.name, 'label': item.name, 'filter': 'classes' }});
      instructors = _.map(items, (item) => { return {'value': item.instructor ? item.instructor._id : null, 'label': item.instructor ? item.instructor.name.first + ' ' + item.instructor.name.last : null, 'filter': 'instructors' }});
    } else if (this.props.table === 'instructor') {
      students = _.map(items, (item) => { return {'value': item.enrolled ? item.enrolled._id : 123, 'label': item.enrolled ? item.enrolled.name.first + ' ' + item.enrolled.name.last : 'TODO', 'filter': 'students'}});
    } else if (this.props.table === 'transactions') {
      
    }

    return (
      <Col xs={12} sm={8}>
        {
          classes ? 
            <ClassFilter onChange={onChange} classes={classes} /> : null
        }
        {
          instructors ? 
            <InstructorFilter onChange={onChange} instructors={instructors} /> : null
        }
        {
          students ? 
            <StudentFilter onChange={onChange} students={students} /> : null
        }
        {
          dates ? 
            <DateFilter dates={dates} onChange={onChange} /> : null
        }
      </Col>
    );
  }
});

export default branch(TableFilter);