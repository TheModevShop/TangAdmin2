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
  return <Link to={`/privates/${row._id}`}>{ row.instructor ? row.instructor.name.first + ' ' + row.instructor.name.last : 'TODO'}</Link>;
}

const columns = [
  { 
    title: 'Instructor', 
    render: renderLink 
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
          <TableFilter table={'private'} onChange={this.logChange.bind(this)} />
        </div>
        {
            privates.length ?
              <DataTable
                keys={['_id']}
                columns={columns}
                initialData={privates}
                initialPageLength={15}
                pageLengthOptions={[ 15, 20, 50 ]}
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
