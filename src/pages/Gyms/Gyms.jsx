import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Link} from 'react-router';
import _ from 'lodash';
require('react-data-components/css/table-twbs.css')
export async function setActiveGym(row) {
  const data.activeGymProfileId = row.target.id;
}

var renderName = (val, row) => {
  return <Link to={`/gyms/profile`} id={row._id} onClick={setActiveGym}>{row.name}</Link>;
}
const columns = [
  { title: 'Name', prop: 'name', render: renderName},
  { title: 'Address', prop: 'addressFormatted' },
];

class Gyms extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const gyms = this.formatData();

    return (
      <div className="gyms-wrapper">
        {
          gyms.length ?
          <DataTable
            className="table-wrapper"
            keys={[ 'name', 'addressFormatted', 'id']}
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
  cursors: {
    name: ['Some Name'],
  },
  facets: {
    gyms: 'Gyms'
  }
});
