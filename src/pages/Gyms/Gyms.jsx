import React from 'react';
import {branch} from 'baobab-react/higher-order';
import Table from 'components/theme/Tables';
import GymsTableHeader from './components/GymsTableHeader';
import GymsTableBody from './components/GymsTableBody';
import _ from 'lodash';

class Gyms extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const gyms = _.get(this.props, 'gyms.allGyms');
    return (
      <div className="gyms-wrapper">
        {
          gyms ?
          <Table> 
            <GymsTableHeader />
            <GymsTableBody data={gyms} />
          </Table> : null
        }
       </div>
    );
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
