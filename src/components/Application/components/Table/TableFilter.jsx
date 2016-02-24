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
    let allClasses = [];
    let classes = null;
    let students = null;
    let instructors = null;
    if (this.props.table === 'private') {
      allClasses = _.get(this.props, 'privates.allPrivates');
      students = _.map(allClasses, (classItem) => { return {'value': classItem.enrolled[0] ? classItem.enrolled[0]._id : 123, 'label': classItem.enrolled[0] ? classItem.enrolled[0].name.first + ' ' + classItem.enrolled[0].name.last : 'TODO', 'filter': 'students'}});
      students.unshift({'value': 'all', 'label': 'All Students', 'filter': ''});
      instructors = _.map(allClasses, (classItem) => { return {'value': classItem.instructor ? classItem.instructor._id : null, 'label': classItem.instructor ? classItem.instructor.name.first + ' ' + classItem.instructor.name.last : null, 'filter': 'instructors' }});
      instructors.unshift({'value': 'all', 'label': 'All Instructors', 'filter': ''});
    } else if (this.props.table === 'classes') {
      allClasses = _.get(this.props, 'classes.allClasses') || [];
      classes = _.map(allClasses, (classItem) => { return {'value': classItem.name, 'label': classItem.name, 'filter': 'classes' }});
      classes.unshift({'value': 'all', 'label': 'All Classes', 'filter': 'Classes'});
      instructors = _.map(allClasses, (classItem) => { return {'value': classItem.instructor ? classItem.instructor._id : null, 'label': classItem.instructor ? classItem.instructor.name.first + ' ' + classItem.instructor.name.last : null, 'filter': 'instructors' }});
      instructors.unshift({'value': 'all', 'label': 'All Instructors', 'filter': ''});
    } else if (this.props.table === 'instructor') {
      allClasses = _.get(this.props, 'instructorClasses');
      students = _.map(allClasses, (classItem) => { return {'value': classItem.enrolled[0] ? classItem.enrolled[0]._id : 123, 'label': classItem.enrolled[0] ? classItem.enrolled[0].name.first + ' ' + classItem.enrolled[0].name.last : 'TODO', 'filter': 'students'}});
      students.unshift({'value': 'all', 'label': 'All Students', 'filter': ''});
    }
    let dates = _.map(allClasses, (classItem) => { return {'value': `${moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY')}`, 'label': `${moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY')}`, 'filter': 'date' }});
    dates.unshift({'value': 'all', 'label': 'All Dates', 'filter': ''});
    let onChange = this.props.onChange;

    return (
      <Col xs={12} sm={7}>
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

export default branch(TableFilter, {
  facets: {
    privates: 'Privates',
    classes: 'Classes'
  }
});