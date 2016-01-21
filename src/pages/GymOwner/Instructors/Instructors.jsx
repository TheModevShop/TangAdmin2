import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';

const renderBtn = (val, row) => {
  return <Link className='btn' to={`/instructors/${row._id}`}>Edit</Link>;
}
  
const columns = [
  { 
    title: 'Name', 
    prop: 'name'
  },
  { 
    title: 'Email', 
    prop: 'email' 
  },
  {
    title: '',
    prop: null,
    render: renderBtn
  }
];


class Instructors extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    const instructors = _.get(this.props, 'instructors.allInstructors') || [];

    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12} sm={6}>
            <h1>Instructors</h1>
          </Col>
          <Col xs={12} sm={6}>
            <Link className="btn" to={`/add-class`}>Invite Instructor</Link>
          </Col>
        </div>
        {
          instructors.length ?
          <DataTable
            keys={['name', 'email']}
            columns={columns}
            initialData={instructors}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
            pageLengthOptions={[ 15, 20, 50 ]}
            className="table-body"
          /> : 
          <div className="no-results">No Instructors Yet</div>
        }
       </div>
    );
  }
}
export default branch(Instructors, {
  facets: {
    instructors: 'Instructors'
  }
});
