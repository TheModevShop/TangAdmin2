import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import Spinner from 'components/Spinner';


const renderName = (val, row) => {
  return <Link to={`/instructors/${row._id}`}><div className="image" style={row.image ? {backgroundImage: `url(${row.image})`} : {backgroundImage: "url('src/images/profile.png')"}}></div>{row.name.first} {row.name.last}</Link>;
}

const renderEmail = (val, row) => {
  return <a className="email-link" href={`mailto:${row.email}`}>{row.email}</a> 
}
  
const columns = [
  { 
    title: 'Name', 
    render: renderName,
    prop: 'name'
  },
  { 
    title: 'Email', 
    render: renderEmail,
    prop: 'email'
  },
  { 
    title: 'Phone Number', 
    prop: 'phone' 
  }
];


class Instructors extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    const instructors = _.get(this.props, 'instructors.allInstructors') || [];
    const isLoading = _.get(this.props, 'instructors.isLoading') || false;

    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12}>
            <h1>Instructors</h1>
          </Col>
        </div>
        {
          isLoading ? 
          <Spinner /> :
          instructors.length ?
          <DataTable
            keys={['name', 'email']}
            columns={columns}
            initialData={instructors}
            initialPageLength={1000}
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
