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
    const table = this.props.table;
    let allStudents = _.get(this.props.students, 'allStudents', []);
    let allInstructors = _.get(this.props.instructors, 'allInstructors', []);
    let allClassNames = _.get(this.props.classNames, 'classes', []);

    console.log(this.props)
    
    if (allClassNames.length) {
      allClassNames = _.map(allClassNames, (item) => { 
        return {'value': item.name, 'label': item.name, 'filter': 'classes' }
      });
    };
    
    if (allStudents.length) {
      allStudents = _.map(allStudents, (item) => { 
        return {'value': item._id, 'label': item.name.first + ' ' + item.name.last, 'filter': 'students' }
      });
    }

    if (allInstructors.length) {
      allInstructors = _.map(allInstructors, (item) => { 
        return {'value': item._id , 'label': item.name.first + ' ' + item.name.last, 'filter': 'instructors' }
      });
    }

    console.log(allInstructors)
    return (
      <Col xs={12} sm={8}>
        {
          table === 'classes' || table === 'instructor-classes' || table === 'student-classes' ? 
            <ClassFilter table={this.props.table} classes={allClassNames} /> : null
        }
        {
          table === 'private' || table === 'classes' || table === 'student-privates'? 
            <InstructorFilter table={this.props.table} instructors={allInstructors} /> : null
        }
        {
          table === 'private' || table === 'instructor' ? 
            <StudentFilter table={this.props.table} students={allStudents} /> : null
        }
  
      </Col>
    );
  }
});

// <DateFilter table={this.props.table} dates={dates} />      

export default branch(TableFilter, {
  cursors: {
    Dashboard: ['Dashboard']
  },
  facets: {
    instructors: 'Instructors',
    students: 'GymStudents',
    classNames: 'GymClassesName'
  }
});