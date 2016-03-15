import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import Spinner from 'components/Spinner';

const renderName = (val, row) => {
  return row.name ? <Link to={`/students/${row._id}`}><div className="image" style={{backgroundImage: `url(${row.image})`}}></div>{row.name.first} {row.name.last}</Link> : 'null';
}
  
const columns = [
  { 
    title: 'Name', 
    render: renderName
  },
  { 
    title: 'Email', 
    prop: 'email' 
  }
];

class ClassStudentsTable extends React.Component {
  render() {
    const profile = _.get(this.props, 'classProfile.classProfile') || {};
    const students = profile.enrolled;
    return (
      <div className="col-xs-12 table-wrapper">
        <div className="row table-header">
          <Col xs={12}>
            <h2>Students Enrolled</h2>
          </Col>
        </div>
        {
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
          <div className="no-results">No Students Enrolled Yet</div>
        }
       </div>
    );
  }
}
export default branch(ClassStudentsTable, {
  facets: {
    classProfile: 'ClassProfile'
  }
});