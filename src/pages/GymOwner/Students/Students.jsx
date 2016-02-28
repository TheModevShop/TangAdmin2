import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import Spinner from 'components/Spinner';

const renderName = (val, row) => {
  return <Link to={`/students/${row._id}`}><div className="image" style={row.image ? {backgroundImage: `url(${row.image})`} : {backgroundImage: "url('src/images/profile.png')"}}></div>{row.name.first} {row.name.last}</Link>;
}
  
const columns = [
  { 
    title: 'Name', 
    render: renderName,
    prop: 'name'
  },
  { 
    title: 'Email', 
    prop: 'email' 
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
            initialPageLength={1000}
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
