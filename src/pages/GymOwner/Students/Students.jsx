import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import Spinner from 'components/Spinner';

const renderName = (val, row) => {
  return <Link to={`/students/${row._id}`}>{row.name.first} {row.name.last}</Link>;
}
  
const columns = [
  { 
    title: 'Name', 
    render: renderName
  },
  { 
    title: 'Email', 
    prop: 'email' 
  },
  {
    title: 'Classes', 
    prop: 'classes' 
  },
  {
    title: 'Privates', 
    prop: 'privates' 
  },
  {
    title: 'Balance', 
    prop: 'balance' 
  }
];


class Students extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    const students = _.get(this.props, 'students.allStudents') || [];
    const isLoading = _.get(this.props, 'students.isLoading') || false;

    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12}>
            <h1>Students</h1>
          </Col>
        </div>
        {
          isLoading ? 
          <Spinner /> :
          students.length ?
          <DataTable
            keys={['_id']}
            columns={columns}
            initialData={students}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
            pageLengthOptions={[ 15, 20, 50 ]}
            className="table-body"
          /> : 
          <div className="no-results">No Students Yet</div>
        }
       </div>
    );
  }
}
export default branch(Students, {
  facets: {
    students: 'GymStudents'
  }
});
