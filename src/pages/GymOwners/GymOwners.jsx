import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Button, Input} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import CustomModal from 'components/Application/components/Modal/Modal';
import {Link} from 'react-router';
import _ from 'lodash';

class GymOwners extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {'selections': []};
  }

  toggleSelection(id) {
    let selectedGyms = this.state.selections;
    const indx = _.indexOf(selectedGyms, id);
    if (indx > -1) {
      var list = _.filter(selectedGyms, function(o) { return o !== id });
      this.setState({selections: list});
    } else {
      var list = selectedGyms.concat(id); 
      this.setState({selections: list});
    }
  }

  delete() {
    console.log(this.state.selections);
    this.refs.modal.close();
  }

  activateModal(action, fn) {
    this.refs.modal.open(action, this.state.selections.length, fn);
  }

  render() {
    const gymOwners = this.formatData(_.get(this.props, 'gymOwners.gymOwners') || []);
    const isLoading = _.get(this.props, 'gymOwners.isLoading') || false;

    const columns = [
      { 
        title: 'Name', 
        prop: 'name'
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
        <CustomModal ref="modal"/>
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
