import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import "./gyms.less";
import _ from 'lodash';


const renderName = (val, row) => {
  return <Link to={`/gyms/${row._id}`}>{row.name}</Link>;
}

const columns = [
  { 
    title: 'Name', 
    prop: 'name', 
    render: renderName
  },
  { 
    title: 'Address', 
    prop: 'addressFormatted' 
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
      <div className="gyms-table-wrapper panel panel-primary">
        <div className="row panel-heading">
          <Col xs={12}>
            <h1>Gyms</h1>
          </Col>
        </div>
        {
          gyms.length ?
          <DataTable
            keys={[ 'name', 'addressFormatted']}
            columns={columns}
            initialData={gyms}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
            pageLengthOptions={[ 15, 20, 50 ]}
          /> : null
        }
       </div>
    );
  }

  formatData() {
    let gyms = _.get(this.props, 'gyms.allGyms') || [];
    gyms = _.map(gyms, (gym) => {
      gym.addressFormatted = `${gym.address.street}, ${gym.address.city}, ${gym.address.state} ${gym.address.zipcode} ` 
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
