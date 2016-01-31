import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import {setAsInstructor} from 'actions/StudentActions';
import Spinner from 'components/Spinner';

const renderBtn = (val, row) => {
  return <Link className='btn' to={`/student/${row._id}`}>Edit</Link>;
}

const renderSetAsInstructor = (val, row) => {
  return <div className='btn' onClick={setAsInstructor.bind(this, row._id)}>Make Instructor</div>;
}

const renderName = (val, row) => {
  return <div>{row.name.first} {row.name.last}</div>;
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
    title: 'Set As Instructor', 
    render: renderSetAsInstructor
  },
  {
    title: '',
    prop: null,
    render: renderBtn
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
          <Col xs={12} sm={6}>
            <h1>Students</h1>
          </Col>
          <Col xs={12} sm={6}>
            <Link className="btn" to={`/add-student`}>Add Student</Link>
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
