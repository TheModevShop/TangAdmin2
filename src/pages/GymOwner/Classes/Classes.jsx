import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Button, Input} from 'react-bootstrap';
import CustomModal from 'components/Application/components/Modal/Modal';
import TableFilter from './../../../components/Application/components/Table/TableFilter';
import {cancelClasses} from 'actions/ClassActions';
import {Link} from 'react-router';
import Spinner from 'components/Spinner';
import "./classes.less";
import _ from 'lodash';


class Classes extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {selections: []}
  }

  formatData(classes) {
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      classItem.date = `${moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY')}`;
      classItem.start = `${moment(classItem.time.start, 'H:mm').format('h:mm a')}`;
      classItem.end = `${moment(classItem.time.end, 'H:mm').format('h:mm a')}`;
      return classItem;
    });

    return classes;
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
    cancelClasses(this.state.selections);
    this.refs.modal.close();
  }

  replicate() {
    this.refs.modal.close();
  }
  
  activateModal(action, fn) {
    this.refs.modal.open(action, this.state.selections.length, fn);
  }

  render() {
    const classes = this.formatData(_.get(this.props, 'classes.allClasses')) || [];
    const isLoading = _.get(this.props, 'classes.isLoading') || false;

    const renderName = (val, row) => {
      return <Link to={`/classes/${row._id}`}>{row.name}</Link>;
    }

    const renderCheck = (val, row) => {
      return <Input type="checkbox" name="delete" label=" " onChange={this.toggleSelection.bind(this, row._id)}/>;
    }

    const renderEnrolled = (val, row) => {
      let enroll = row.enrolled ? row.enrolled.length : 0;
      return <div>{enroll} / {row.capacity}</div>
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
        title: 'End Time', 
        prop: 'end' 
      },
      { 
        title: 'Enrolled', 
        render: renderEnrolled 
      },
      { 
        title: 'Fee', 
        prop: 'price' 
      }
    ];

    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12} sm={6}>
            <h1>Classes</h1>
          </Col>
          <Col xs={12} sm={6}>
            <Link className="btn" to={`/add-class`}>Add Class</Link>
          </Col>
        </div>
        <div className="row table-filter-container">
          <TableFilter table="classes" items={_.get(this.state, 'classes') || {}} />
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
              initialSortBy={{prop: 'name', order: 'descending' }}
              pageLengthOptions={[ 15, 20, 50 ]}
              className="table-body"
            /> 
          :
          <div className="no-results">No Classes Yet</div>
        }
        <CustomModal ref="modal"/>
       </div>
    );
  }
}

export default branch(Classes, {
  facets: {
    classes: 'Classes'
  }
});
