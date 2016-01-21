import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import "./privates.less";
import _ from 'lodash';

const renderBtn = (val, row) => {
  return <Link className='btn' to={`/privates/${row._id}`}>Edit</Link>;
}

const columns = [
  { 
    title: 'Name', 
    prop: 'name'
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
    title: 'Capacity', 
    prop: 'capacity' 
  },
  {
    title: 'Enrolled',
    prop: 'enrolled'
  },
  {
    title: '',
    prop: null,
    render: renderBtn
  }
];

class Privates extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const classes = this.formatData();
    return (
      <div className="table-wrapper">
      <div className="row table-header">
        <Col xs={12} sm={6}>
          <h1>Private Classes</h1>
        </Col>
        <Col xs={12} sm={6}>
          <Link className="btn" to={`/add-class`}>Add Private Class</Link>
        </Col>
      </div>
        {
          classes.length ?
          <DataTable
            keys={['_id']}
            columns={columns}
            initialData={classes}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
            pageLengthOptions={[ 15, 20, 50 ]}
            className="table-body"
          /> : 
          <div className="no-results">No Private Classes Yet</div>
        }
       </div>
    );
  }

  formatData() {
    let classes = _.get(this.props, 'privates.allPrivates') || [];
    classes = _.map(classes, (classItem) => {
      classItem.date = `${moment(classItem.date).format('MM/DD/YYYY')}`;
      classItem.start = `${moment(classItem.time.start, 'H:mm').format('h:mm a')}`;
      classItem.end = `${moment(classItem.time.end, 'H:mm').format('h:mm a')}`;
      classItem.capacity = `${classItem.capacity}`;
      classItem.enrolled = `${classItem.enrolled.length}`;
      return classItem;
    });
    return classes;
  }
}

export default branch(Privates, {
  facets: {
    privates: 'Privates'
  }
});
