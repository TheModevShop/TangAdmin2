import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import {Link} from 'react-router';
import _ from 'lodash';

class GymOwners extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const gymOwners = this.formatData(_.cloneDeep(_.get(this.props, 'gymOwners.gymOwners')) || []);
    const isLoading = _.get(this.props, 'gymOwners.isLoading') || false;

    const renderName = (val, row) => {
      return <Link to={`/gym-owners/${row._id}`}>{row.name}</Link>;
    }

    const columns = [
      { 
        title: 'Name', 
        prop: 'name',
        render: renderName
      },
      { 
        title: 'Email Address', 
        prop: 'email'
      }
    ];
    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12} sm={6}>
            <h1>Gym Owners</h1>
          </Col>
        </div>
        {
          isLoading ? 
            <Spinner /> :
              gymOwners.length ?
              <DataTable
                keys={['_id']}
                columns={columns}
                initialData={gymOwners}
                initialPageLength={15}
                initialSortBy={{ prop: 'name', order: 'descending' }}
                pageLengthOptions={[ 15, 20, 50 ]}
                className="table-body"
              /> 
              :
              <div className="no-results">No Gyms Yet</div>
        }
       </div>
    );
  }

  formatData(gymOwners) {
    gymOwners = _.map(gymOwners, (owner) => {
      owner.name = owner.name ? owner.name.first + ' ' + owner.name.last : 'N/A';
      return owner;
    });
    return gymOwners;
  }
}

export default branch(GymOwners, {
  facets: {
    gymOwners: 'GymOwners'
  }
});
