import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import "./classes.less";
import _ from 'lodash';

const renderName = (val, row) => {
  return <Link to={`/classes/${row._id}`}>{row.name}</Link>;
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
    title: 'Private Class',
    prop: 'private'
  }, 
  {
    title: 'Enrolled',
    prop: 'enrolled'
  }
];

class Classes extends React.Component {
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
            <h1>Classes</h1>
          </Col>
        </div>
        {
          classes.length ?
          <DataTable
            keys={[ 'name', 'street', 'city and zip code', 'state', ]}
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
    let classes = _.get(this.props, 'classes.allClasses') || [];
    classes = _.map(classes, (classItem) => {
      classItem.date = `${classItem.data}`;
      classItem.start = `${classItem.start}`;
      classItem.end = `${classItem.end}`;
      classItem.capacity = `${classItem.capacity}`;
      classItem.private = `${classItem.private}`;
      classItem.enrolled = `${classItem.enrolled.length ? classItem.enrolled.length : 10 }`;
      return classItem;
    });
    return classes;
  }
}

export default branch(Classes, {
  facets: {
    classes: 'Classes'
  }
});
