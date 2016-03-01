import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Input} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import {Link} from 'react-router';
import TableFilter from './../../../components/Application/components/Table/TableFilter';
import "./privates.less";
import _ from 'lodash';

class Privates extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  formatData(classes) {
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      classItem.date = `${moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY')}`;
      classItem.start = `${moment(classItem.time.start, 'H:mm').format('h:mm a')}`;
      classItem.end = `${moment(classItem.time.end, 'H:mm').format('h:mm a')}`;
      classItem.enrolled = classItem.enrolled ? (classItem.enrolled[0] ? classItem.enrolled[0].name.first + ' ' + classItem.enrolled[0].name.last : 'N/A') : 'N/A';
      classItem.price = classItem.price ? '$' + (classItem.price / 100).toFixed(2) : 'N/A';

      return classItem;
    });

    return classes;
  }
  
  render() {
    const classes = this.formatData(_.get(this.props, 'privates.allPrivates')) || [];
    const isLoading = _.get(this.props, 'privates.isLoading') || false;
    
    const renderName = (val, row) => {
      return <Link to={`/privates/${row._id}`}>{ row.instructor ? row.instructor.name.first + ' ' + row.instructor.name.last : 'N/A'} </Link>;
    }

    const columns = [
      { 
        title: 'Instructor', 
        render: renderName,
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
        title: 'Student', 
        prop: 'enrolled'
      },
      {
        title: 'Price',
        prop: 'price'
      }
    ];

    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12}>
            <h1>Private Classes</h1>
          </Col>
        </div>

        <div className="row table-filter-container">
          <TableFilter table="private" items={_.get(this.props, 'privates.allPrivates')} />
        </div>
        {
          isLoading ? 
            <Spinner /> :
            classes.length ?
              <DataTable
                keys={['_id']}
                columns={columns}
                initialData={classes}
                initialPageLength={1000}
                initialSortBy={{ prop: 'date', order: 'ascending' }}
                className="table-body" /> 
            : 
              <div className="no-results">No Private Classes Yet</div>
        }
       </div>
    );
  }
}

export default branch(Privates, {
  facets: {
    privates: 'Privates'
  }
});
