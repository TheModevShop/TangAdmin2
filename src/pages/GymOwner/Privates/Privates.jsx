import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import "./privates.less";
import _ from 'lodash';

const renderName = (val, row) => {
  return <Link to={`/privates/${row._id}`}>{row.name}</Link>;
}

const columns = [
  { 
    title: 'Name', 
    prop: 'name', 
    render: renderName
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
      <div className="classes-table-wrapper panel panel-primary">
        <div className="row panel-heading">
          <Col xs={12}>
            <h1>Privates</h1>
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
          /> : null
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
