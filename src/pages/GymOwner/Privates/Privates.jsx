import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Input, Button} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import {Link} from 'react-router';
import Select from 'react-select';
import CustomModal from './../../../components/Application/components/Modal/Modal';
import "./privates.less";
import _ from 'lodash';



class Privates extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {selections: []};
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
    console.log(this.state.selections);
    this.refs.modal.close();
  }

  replicate() {
    console.log(this.state.selections);
    this.refs.modal.close();
  }
  
  logChange(val) {
    console.log("Selected: " + val);
  }
  
  activateModal(action, fn) {
    this.refs.modal.open(action, this.state.selections.length, fn);
  }

  render() {
    const classes = this.formatData();
    const isLoading = _.get(this.props, 'privates.isLoading') || false;
    
    const renderName = (val, row) => {
      return <Link to={`/privates/${row._id}`}>{row.name}</Link>;
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

    const classNames = _.map(_.cloneDeep(classes), (classItem) => { return {'value': classItem.name, 'label': classItem.name}});
    const instructorNames = _.map(_.cloneDeep(classes), (classItem) => { return {'value': 'TODO', 'label': 'TODO'}});

    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12} sm={6}>
            <h1>Private Classes</h1>
          </Col>
          <Col xs={12} sm={6}>
            <Link className="btn" to={`/add-class`}>Add Private Class</Link>
          </Col>
        </div>
        <div className="row table-filter-container">
          <Col xs={12} sm={7}>
              <Select
                className=""
                name="form-field-name"
                options={classNames}
                onChange={this.logChange.bind(this)}
                placeholder="Classes" />
              <Select
                className=""
                name="form-field-name"
                options={instructorNames}
                placeholder="Instructors"
                onChange={this.logChange.bind(this)} />
              <Input type="Date" onChange={this.logChange.bind(this)} placeholder="Select Date" />
          </Col>
          { 
            this.state.selections.length ?
              <Col xs={12} sm={5}>
                <Button onClick={this.activateModal.bind(this, 'delete', this.delete.bind(this))}>Delete</Button>
                <Button onClick={this.activateModal.bind(this, 'replicate', this.replicate.bind(this))}>Replicate</Button>
              </Col>
            : null
          }
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
                className="table-body" /> 
            : 
              <div className="no-results">No Private Classes Yet</div>
        }
        <CustomModal ref="modal"/>
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
