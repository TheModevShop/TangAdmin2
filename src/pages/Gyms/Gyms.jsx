import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import "./gyms.less";
import _ from 'lodash';


const renderBtn = (val, row) => {
  return <Link className='btn' to={`/gyms/${row._id}`}>View</Link>;
}

const columns = [
  { 
    title: 'Name', 
    prop: 'name'
  },
  { 
    title: 'Street Address', 
    prop: 'street' 
  },
  { 
    title: 'City and Zip', 
    prop: 'cityFormatted' 
  },
  { 
    title: 'State', 
    prop: 'state' 
  },
  {
    title: '',
    prop: null,
    render: renderBtn
  }
];

class Gyms extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const gyms = this.formatData();
    return (
      <div className="table-wrapper">
        <div className="row header">
          <Col xs={12} sm={6}>
            <h1>Gyms</h1>
          </Col>
          <Col xs={12} sm={6}>
            <Link className="btn" to={`/add-gym`}>Add Gym</Link>
          </Col>
        </div>
        {
          gyms.length ?
          <DataTable
            keys={[ 'name', 'street', 'city and zip code', 'state', ]}
            columns={columns}
            initialData={gyms}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
            pageLengthOptions={[ 15, 20, 50 ]}
            className="table-body"
          /> :
          <div className="no-results">No Gyms Yet</div>
        }
       </div>
    );
  }

  formatData() {
    let gyms = _.get(this.props, 'gyms.allGyms') || [];
    gyms = _.map(gyms, (gym) => {
      gym.cityFormatted = `${gym.address.city} ${gym.address.zipcode}`;
      gym.state = `${gym.address.state}`;
      gym.street = `${gym.address.street}`;
      return gym;
    });
    return gyms;
  }
}

export default branch(Gyms, {
  facets: {
    gyms: 'Gyms'
  }
});
