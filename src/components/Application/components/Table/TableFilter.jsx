import React from 'react';
import {branch} from 'baobab-react/higher-order';
import ClassFilter from './Filters/ClassFilter';
import moment from 'moment';
import InstructorFilter from './Filters/InstructorFilter';
import DateFilter from './Filters/DateFilter';
import StudentFilter from './Filters/StudentFilter';
import {Col} from 'react-bootstrap';
import * as actions from 'actions/TableFilterActions';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';
import './table-filter.less'

const TableFilter = React.createClass({
  getInitialState: function() {
    return {
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      } 
    };
  },
  render() {
    const table = this.props.table;
    let allStudents = _.get(this.props.students, 'allStudents', []);
    let allInstructors = _.get(this.props.instructors, 'allInstructors', []);
    let allClassNames = _.get(this.props.classNames, 'classes', []);
    const {student, instructor, className, startDate, endDate} = this.props.tableFilters;

    const startDateFilter = startDate || moment().subtract(29, 'days')
    const endDateFilter = endDate || moment();
      
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

    return (
      <Col className="table-filter" xs={12}>
        {
          table === 'classes' || table === 'instructor-classes' || table === 'student-classes' ? 
            <ClassFilter value={className} table={this.props.table} classes={allClassNames} /> : null
        }
        {
          table === 'private' || table === 'classes' || table === 'student-privates'? 
            <InstructorFilter value={instructor} table={this.props.table} instructors={allInstructors} /> : null
        }
        {
          table === 'private' || table === 'instructor' ? 
            <StudentFilter value={student} table={this.props.table} students={allStudents} /> : null
        }

        <DateRangePicker className="date-picker" startDate={startDateFilter} endDate={endDateFilter} ranges={this.state.ranges}  onEvent={this.handleEvent}>
            <button className="btn icon">
              <div className="calendar glyphicon glyphicon-calendar"></div>
              <span>
                {
                  this.state.startDate && this.state.endDate ?
                  moment(startDateFilter).format('M/DD/YY') + ' - ' + moment(endDateFilter).format('M/DD/YY') : 'Select a Date'
                } 
              </span>
            </button>
        </DateRangePicker>

        <button className="btn" onClick={this.props.onSubmitFilter}>Submit Filter</button>
  
      </Col>
    );
  },
  handleEvent: function (event, picker) {
    if (event.type === 'apply') {
      actions.setDate(picker.startDate, picker.endDate);
      this.setState({
        startDate: picker.startDate,
        endDate: picker.endDate
      });
    };
  },

  componentWillUnmount() {
    actions.clearFilter();
  }
});

// <DateFilter table={this.props.table} dates={dates} />      

export default branch(TableFilter, {
  cursors: {
    Dashboard: ['Dashboard'],
    tableFilters: ['tableFilters']
  },
  facets: {
    instructors: 'Instructors',
    students: 'GymStudents',
    classNames: 'GymClassesName'
  }
});