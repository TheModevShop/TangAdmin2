import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel, Input, Modal, Button} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import {Link} from 'react-router';
import InputField from './../../../components/Application/components/Forms/InputField';
import "./privates.less";
import _ from 'lodash';



class Privates extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {showModal: false, selections: []};
  }

  toggleSelection(id) {
    let selectedClasses = this.state.selections;
    const indx = _.indexOf(selectedClasses, id);
    if (indx > -1) {
      var list = _.filter(selectedClasses, function(o) { return o !== id });
      this.setState({selections: list});
    } else {
      var list = selectedClasses.concat(id); 
      this.setState({selections: list});
    }
  }

  delete() {
    console.log(this.state.selections)
  }
  replicate() {
    console.log(this.state.selections)
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }

  render() {
    const classes = this.formatData();
    const isLoading = _.get(this.props, 'privates.isLoading') || false;
    const renderName = (val, row) => {
      return <Link to={`/privates/${row._id}`}>{row.name}</Link>;
    }

    const renderCheck = (val, row) => {
      return <Input type="checkbox" name="delete" onChange={this.toggleSelection.bind(this, row._id)}/>;
    }

    const columns = [
      { 
        title: '', 
        render: renderCheck
      },
      { 
        title: 'Name', 
        render: renderName
      },
      { 
        title: 'Date', 
        prop: 'date' 
      },
      { 
        title: 'Start Time', 
        prop: 'start' 
      },
      { 
        title: 'End', 
        prop: 'end' 
      },
      { 
        title: 'Capacity', 
        prop: 'capacity' 
      },
      {
        title: 'Enrolled',
        prop: 'enrolled'
      }
    ];
    return (
      <div className="table-wrapper">
      <div className="row table-header">
        <Col xs={12} sm={6}>
          <h1>Private Classes</h1>
        </Col>
        <Col xs={12} sm={6}>
          <Link className="btn" to={`/add-class`}>Add Private Class</Link>
          { this.state.selections.length ?
            <div>
              <div className="btn" onClick={this.open.bind(this, 'delete')}>Delete</div>
              <div className="btn" onClick={this.open.bind(this, 'replicate')}>Replicate</div>
            </div>
            : null
          }
        </Col>
      </div>
        {
          isLoading ? 
          <Spinner /> :
          classes.length ?
          <DataTable
            keys={['_id']}
            columns={columns}
            initialData={classes}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
            pageLengthOptions={[ 15, 20, 50 ]}
            className="table-body"
          /> : 
          <div className="no-results">No Private Classes Yet</div>
        }
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
           <Modal.Header>
             <Modal.Title>Modal heading</Modal.Title>
           </Modal.Header>
           <Modal.Body>
              <p>Are you sure you want to [blank] {this.state.selections.length} items?</p>
              <div className="btn-container">
                <div className="btn" onClick={this.delete.bind(this)}>Submit</div>
                <div className="btn" onClick={this.replicate.bind(this)}>Submit</div>
                <div className="btn cancel-btn" onClick={this.close.bind(this)}>Cancel</div>
              </div>
           </Modal.Body>
         </Modal>
       </div>
    );
  }

  formatData() {
    let classes = _.get(this.props, 'privates.allPrivates') || [];
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      classItem.date = `${moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY')}`;
      classItem.start = `${moment(classItem.time.start, 'H:mm').format('h:mm a')}`;
      classItem.end = `${moment(classItem.time.end, 'H:mm').format('h:mm a')}`;
      classItem.capacity = `${classItem.capacity}`;
      classItem.enrolled = `${classItem.enrolled.length}`;
      return classItem;
    });
    return classes;
  }
}

export default branch(Privates, {
  facets: {
    privates: 'Privates'
  }
});
