import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Button, Input} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import CustomModal from 'components/Application/components/Modal/Modal';
import {Link} from 'react-router';
import "./gyms.less";
import _ from 'lodash';

class Gyms extends React.Component {
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
    const gyms = this.formatData();
    const isLoading = _.get(this.props, 'gyms.isLoading') || false;

    const renderName = (val, row) => {
      return <Link to={`/gyms/${row._id}`}>{row.name}</Link>;
    }

    const renderCheck = (val, row) => {
      return <Input type="checkbox" name="delete" label=" " onChange={this.toggleSelection.bind(this, row._id)}/>;
    }

    const columns = [
      { 
        title: '', 
        render: renderCheck
      },
      { 
        title: 'Name', 
        prop: 'name',
        render: renderName
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
      }
    ];
    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12} sm={6}>
            <h1>Gyms</h1>
          </Col>
          <Col xs={12} sm={6}>
            <Link className="btn" to={`/add-gym`}>Add Gym</Link>
          </Col>
        </div>
        <div className="row table-filter-container">
          <Col xs={12} sm={7}>
          </Col>
          { 
            this.state.selections.length ?
              <Col xs={12} sm={5}>
                <Button onClick={this.activateModal.bind(this, 'delete', this.delete.bind(this))}>Delete</Button>
              </Col>
            : null
          }
        </div>
        {
          isLoading ? 
            <Spinner /> :
          gyms.length ?
          <DataTable
            keys={[ 'name', 'street', 'city and zip code', 'state', ]}
            columns={columns}
            initialData={gyms}
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
