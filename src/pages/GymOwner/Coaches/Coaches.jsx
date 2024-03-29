import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';

const renderName = (val, row) => {
  return <Link to={`/instructor/${row._id}`}>{row.name.first} {row.name.last}</Link>;
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
  }
];


class Coaches extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    const instructors = _.get(this.props, 'instructors.allInstructors') || [];

    return (
      <div className="coaches-table-wrapper panel panel-primary">
        <div className="row panel-heading">
          <Col xs={12}>
            <h1>Coaches</h1>
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
          /> : 
          <div>No Coaches Yet</div>
        }
       </div>
    );
  }
}
export default branch(Coaches, {
  facets: {
    instructors: 'GymInstructors'
  }
});
