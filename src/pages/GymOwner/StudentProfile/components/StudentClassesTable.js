import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Input, Button} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import {Link} from 'react-router';
import CustomModal from './../../../../components/Application/components/Modal/Modal';
import TableFilter from './../../../../components/Application/components/Table/TableFilter';
import _ from 'lodash';

class StudentClassesTable extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {selections: [], filter: null, classes: null};
  }

  componentWillMount() {
    this.formatData(); 
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.filter ? this.state.filter.value : this.state.filter) !== (nextState.filter ? nextState.filter.value : nextState.filter);
  }

  formatData(filter) {
    let classes = _.get(this.props, 'StudentClasses.classes') || null;
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      classItem.date = `${moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY')}`;
      classItem.start = `${moment(classItem.time.start, 'H:mm').format('h:mm a')}`;
      classItem.end = `${moment(classItem.time.end, 'H:mm').format('h:mm a')}`;
      return classItem;
    });

    this.setState({'classes': classes});
  }

  filterData(classes) {
    let filter = _.get(this.state.filter, 'filter'),
        value = _.get(this.state.filter, 'value'),
        param = {};

    if (filter === 'instructor') {
      param = {'instructor': {_id: filter.value}}
    } else if (filter === 'date') {
      param = {'date': value};
    } else if (filter === 'classes') {
      param = {'name': value};
    }

    classes = _.filter(classes, _.matches(param));

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
    console.log(this.state.selections);
    this.refs.modal.close();
  }
  
  logChange(val, obj) {
    this.setState({filter: {'value': val, 'filter': obj.length ? obj[0].filter : ''}});
  }
  
  activateModal(action, fn) {
    this.refs.modal.open(action, this.state.selections.length, fn);
  }

  render() {
    let classes = _.get(this.state, 'classes') || _.get(this.props, 'StudentClasses.classes') || null;
    if (this.state.filter) {
      classes = this.filterData(classes);
    } 
    const prvt = this.props.private; 
    const renderLink = (val, row) => {
      if (prvt) {
        return <Link to={`/privates/${row._id}`}>{ row.instructor ? row.instructor.name.first + ' ' + row.instructor.name.last : 'TODO'}</Link>;
      } else {
        return <Link to={`/classes/${row._id}`}>{ row.name ? row.name : 'TODO'}</Link>;
      }
    }
    const renderCheck = (val, row) => {
      return <Input type="checkbox" name="delete" label=" " onChange={this.toggleSelection.bind(this, row._id)}/>;
    }
    const title = prvt ? 'Instructor' : 'Class Name';
    const columns = [
      { 
        title: '', 
        render: renderCheck
      },
      { 
        title: title, 
        render: renderLink 
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
        title: 'Price', 
        prop: 'price' 
      }
    ];

    return (
      <div className="table-wrapper">
        <div className="row table-filter-container">
          <TableFilter table={prvt ? "private" : "classes"} StudentClasses={_.get(this.props, 'StudentClasses.classes')} onChange={this.logChange.bind(this)} />
          { 
            this.state.selections.length ?
              <Col xs={12} sm={5}>
                <Button onClick={this.activateModal.bind(this, 'delete', this.delete.bind(this))}>Remove</Button>
              </Col>
            : null
          }
        </div>
        {
            classes.length ?
              <DataTable
                keys={['_id']}
                columns={columns}
                initialData={classes}
                initialPageLength={15}
                initialSortBy={{ prop: 'date', order: 'ascending' }}
                pageLengthOptions={[ 15, 20, 50 ]}
                className="table-body" /> 
            : 
              <div className="no-results">{ prvt ? 'No Private Classes Yet' : 'No Classes Yet' }</div>
        }
        <CustomModal ref="modal"/>
       </div>
    );
  }
}

export default branch(StudentClassesTable, {
  cursors: {
    StudentClassesTable: ['views', 'StudentProfile', 'StudentClassesTable']
  },
  facets: {
    StudentClasses: 'StudentClasses'
  }
});
