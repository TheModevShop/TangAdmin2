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

const renderLink = (val, row) => {
  return <Link to={`/classes/${row._id}`}>{ row.name ? row.name : 'N/A'}</Link>;
}

const renderAmount = (val, row) => {
  return <div>{ row.price ? '$' + (row.price / 100).toFixed(2) : '-'}</div>;
}

const columns = [
  { 
    title: 'Class', 
    render: renderLink, 
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
    title: 'Price', 
    render: renderAmount,
    prop: 'price'
  }
];


class UserClassesTable extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  logChange(val, obj) {
    // this.setState({filter: {'value': val, 'filter': obj.length ? obj[0].filter : ''}});
  }

  formatData(classes) {
    return _.map(_.cloneDeep(classes), (classItem) => {
      classItem.date = `${moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY')}`;
      classItem.start = `${moment(classItem.time.start, 'H:mm').format('h:mm a')}`;
      classItem.end = `${moment(classItem.time.end, 'H:mm').format('h:mm a')}`;
      return classItem;
    });
  }

  
  render() {
    let classes = _.get(this.props, 'classes') || null;
    classes = this.formatData(classes);
    console.log(this.props);
    return (
      <div className="table-wrapper">
        <div className="row table-filter-container">
          <TableFilter table={'private'} onChange={this.logChange.bind(this)} />
        </div>
        {
            classes.length ?
              <DataTable
                keys={['_id']}
                columns={columns}
                initialData={classes}
                initialPageLength={15}
                pageLengthOptions={[ 15, 20, 50 ]}
                className="table-body" /> 
            : 
              <div className="no-results">No Classes Yet</div>
        }
        <CustomModal ref="modal"/>
       </div>
    );
  }
}

export default UserClassesTable;
