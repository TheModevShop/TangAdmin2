import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import {setAsInstructor} from 'actions/StudentActions';

const renderName = (val, row) => {
  return <Link key={'student-link'} to={`/student/${row._id}`}>{row.name.first} {row.name.last}</Link>;
}

const renderSetAsInstructor = (val, row) => {
  return <div key={'instructor-action'} onClick={setAsInstructor.bind(this, row._id)}>Make Instructor</div>;
}
  
const columns = [
  { 
    title: 'Name', 
    prop: 'name', 
    render: renderName
  },
  { 
    title: 'Email', 
    prop: 'email' 
  },
  { 
    title: 'Set As Instructor', 
    render: renderSetAsInstructor
  }
];


class Students extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    const students = _.get(this.props, 'students.allStudents') || [];

    return (
      <div className="coaches-table-wrapper panel panel-primary">
        <div className="row panel-heading">
          <Col xs={12}>
            <h1>Users</h1>
          </Col>
        </div>
        {
          students.length ?
          <DataTable
            keys={[ 'name', 'email']}
            columns={columns}
            initialData={students}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
            pageLengthOptions={[ 15, 20, 50 ]}
          /> : 
          <div>No Students Yet</div>
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
