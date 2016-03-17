import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Input, Button} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import {Link} from 'react-router';
import CustomModal from 'components/Application/components/Modal/Modal';
import TableFilter from 'components/Application/components/Table/TableFilter';
import _ from 'lodash';

const renderInstructor = (val, row) => {
  return <Link to={`/privates/${row._id}`}>{row.instructor}</Link>;
}

const renderStudent = (val, row) => {
  return <Link to={`/privates/${row._id}`}>{row.enrolled}</Link>;
}

const renderAmount = (val, row) => {
  return <div>{ row.price ? '$' + (row.price / 100).toFixed(2) : '-'}</div>;
}

const StudentTableColumns = [
  { 
    title: 'Instructor', 
    render: renderInstructor,
    prop: 'instructor'
  },
  { 
    title: 'Date', 
    prop: 'date' 
  },
  { 
    title: 'Start Time', 
    prop: 'start' 
  },
  { 
    title: 'End', 
    prop: 'end' 
  },
  { 
    title: 'Price', 
    render: renderAmount,
    prop: 'price'
  }
];

const InstructorTableColumns = [
  { 
    title: 'Student', 
    render: renderStudent,
    prop: 'enrolled'
  },
  { 
    title: 'Date', 
    prop: 'date' 
  },
  { 
    title: 'Start Time', 
    prop: 'start' 
  },
  { 
    title: 'End', 
    prop: 'end' 
  },
  { 
    title: 'Price', 
    render: renderAmount, 
    prop: 'price'
  }
];


class UserPrivatesTable extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  formatData(privates) {
    return _.map(_.cloneDeep(privates), (classItem) => {
        classItem.date = `${moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY')}`;
        classItem.start = `${moment(classItem.time.start, 'H:mm').format('h:mm a')}`;
        classItem.end = `${moment(classItem.time.end, 'H:mm').format('h:mm a')}`;
        classItem.instructor = classItem.instructor ? classItem.instructor.name.first + ' ' + classItem.instructor.name.last : 'N/A';
        classItem.enrolled = (classItem.enrolled[0] && classItem.enrolled[0].name) ? classItem.enrolled[0].name.first + ' ' + classItem.enrolled[0].name.last : 'N/A';
        return classItem;
    });
  }

  logChange(val, obj) {
    // this.setState({filter: {'value': val, 'filter': obj.length ? obj[0].filter : ''}});
  }
  
  render() {
    let privates = _.get(this.props, 'privates') || null;
    privates = this.formatData(privates);
    
    return (
      <div className="table-wrapper">
        <div className="row table-filter-container">
          <TableFilter table={this.props.table ? this.props.table : 'private'} items={_.get(this.props, 'privates')} onChange={this.logChange.bind(this)} />
        </div>
        {
            privates.length ?
              <DataTable
                keys={['_id']}
                columns={this.props.table === 'instructor' ? InstructorTableColumns : StudentTableColumns}
                initialData={privates}
                initialPageLength={1000}
                className="table-body" /> 
            : 
              <div className="no-results">No Privates Yet</div>
        }
        <CustomModal ref="modal"/>
       </div>
    );
  }
}

export default UserPrivatesTable;
