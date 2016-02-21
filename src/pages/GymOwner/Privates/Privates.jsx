import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Input, Button} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import {Link} from 'react-router';
import CustomModal from './../../../components/Application/components/Modal/Modal';
import TableFilter from './../../../components/Application/components/Table/TableFilter';
import "./privates.less";
import _ from 'lodash';

class Privates extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {selections: [], filter: null};
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
    this.setState({filter: {'value': val, 'filter': obj[0].filter}});
  }
  
  activateModal(action, fn) {
    this.refs.modal.open(action, this.state.selections.length, fn);
  }

  render() {
    const classes = this.formatData(this.state.filter);
    const isLoading = _.get(this.props, 'privates.isLoading') || false;
    
    const renderName = (val, row) => {
      return <Link to={`/privates/${row._id}`}>{ row.instructor ? row.instructor.name.first + ' ' + row.instructor.name.last : 'TODO'} </Link>;
    }

    const renderStudent = (val, row) => {
      return <div>{ row.enrolled ? row.enrolled.name.first + ' ' + row.enrolled.name.last : 'TODO'} </div>;
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
        title: 'Instructor', 
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
        title: 'Student', 
        render: renderStudent 
      },
      { 
        title: 'Price', 
        prop: 'price' 
      }
    ];

    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12}>
            <h1>Private Classes</h1>
          </Col>
        </div>

        <div className="row table-filter-container">
          <TableFilter table="private" onChange={this.logChange.bind(this)} />
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
              <div className="no-results">No Private Classes Yet</div>
        }
        <CustomModal ref="modal"/>
       </div>
    );
  }

  formatData(filter) {
    let classes = _.get(this.props, 'privates.allPrivates') || [];
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      classItem.date = `${moment(classItem.date, 'YYYYMMDD').format('MM/DD/YYYY')}`;
      classItem.start = `${moment(classItem.time.start, 'H:mm').format('h:mm a')}`;
      classItem.end = `${moment(classItem.time.end, 'H:mm').format('h:mm a')}`;
      classItem.enrolled = classItem.enrolled[0];

      return classItem;
    });

    if (filter) {
      var param = filter.filter;
      if (param === 'instructors') {
        classes = _.filter(classes, _.matches({'instructor': {_id: filter.value}}));
      } else if (param === 'students') {
        classes = _.filter(classes, _.matches({'enrolled': {_id: filter.value}}));
      } else if (param === 'date') {
        classes = _.filter(classes, _.matches({'date': filter.value}));
      }
    }
    return classes;
  }
}

export default branch(Privates, {
  facets: {
    privates: 'Privates'
  }
});
