import React from 'react';
import {branch} from 'baobab-react/higher-order';
import ClassFilter from './Filters/ClassFilter';
import moment from 'moment';
import InstructorFilter from './Filters/InstructorFilter';
import DateFilter from './Filters/DateFilter';
import StudentFilter from './Filters/StudentFilter';
import {Col} from 'react-bootstrap';
import * as actions from 'actions/TableFilterActions';

const TableFilter = React.createClass({
  render() {
    const items = _.get(this.props, 'items');
    
    let classes = [];
    let students = [];
    let instructors = [];
    let dates = _.map(items, (item) => { return {'value': item.date, 'label': item.date, 'filter': 'date' }});
    if (this.props.table === 'private') {
      students = _.map(items, (item) => { return {'value': item.enrolled[0] ? item.enrolled[0]._id : null, 'label': item.enrolled[0] ? item.enrolled[0].name.first + ' ' + item.enrolled[0].name.last : 'N/A', 'filter': 'students'}});
      instructors = _.map(items, (item) => { return {'value': item.instructor ? item.instructor._id : null, 'label': item.instructor ? item.instructor.name.first + ' ' + item.instructor.name.last : 'N/A', 'filter': 'instructors' }});
    } else if (this.props.table === 'classes') {
      classes = _.map(items, (item) => { return {'value': item.name, 'label': item.name, 'filter': 'classes' }});
      instructors = _.map(items, (item) => { return {'value': item.instructor ? item.instructor._id : null, 'label': item.instructor ? item.instructor.name.first + ' ' + item.instructor.name.last : 'N/A', 'filter': 'instructors' }});
    } else if (this.props.table === 'instructor') {
      students = _.map(items, (item) => { return {'value': item.enrolled ? item.enrolled._id : null, 'label': item.enrolled ? item.enrolled.name.first + ' ' + item.enrolled.name.last : 'N/A', 'filter': 'students'}});
    } else if (this.props.table === 'transactions') {
      instructors = _.map(items, (item) => { return {'value': item.instructor ? item.instructor._id : null, 'label': item.instructor ? item.instructor.name.first + ' ' + item.instructor.name.last : 'N/A', 'filter': 'instructors' }});
      students = _.map(items, (item) => { return {'value': item.userCharged ? item.userCharged._id : null, 'label': item.userCharged.name ? item.userCharged.name.first + ' ' + item.userCharged.name.last : 'N/A', 'filter': 'students' }});
    } else if (this.props.table === 'instructor-classes' || this.props.table === 'student-classes') {
      classes = _.map(items, (item) => { return {'value': item.name, 'label': item.name, 'filter': 'classes' }});
    } else if (this.props.table === 'student-privates') {
      instructors = _.map(items, (item) => { return {'value': item.instructor ? item.instructor._id : null, 'label': item.instructor ? item.instructor.name.first + ' ' + item.instructor.name.last : 'N/A', 'filter': 'instructors' }});
    }

    return (
      <Col xs={12} sm={8}>
        {
          classes.length ? 
            <ClassFilter table={this.props.table} classes={classes} /> : null
        }
        {
          instructors.length ? 
            <InstructorFilter table={this.props.table} instructors={instructors} /> : null
        }
        {
          students.length ? 
            <StudentFilter table={this.props.table} students={students} /> : null
        }
        {
          dates.length ? 
            <DateFilter table={this.props.table} dates={dates} /> : null
        }
      </Col>
    );
  }
});

export default branch(TableFilter);