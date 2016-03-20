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
      return <Link to={`/gym-owners/${row._id}`}><div className="image" style={row.image ? {backgroundImage: `url(${row.image})`} : {backgroundImage: "url('src/images/profile.png')"}}></div>{row.name}</Link>;
    }

    const renderEmail = (val, row) => {
      return <a className="email-link" href={`mailto:${row.email}`}>{row.email}</a> 
    }

    const columns = [
      { 
        title: 'Name', 
        prop: 'name',
        render: renderName
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
