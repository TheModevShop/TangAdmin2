import React from 'react';
import {branch} from 'baobab-react/higher-order';
import moment from 'moment';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel, Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import Spinner from 'components/Spinner';
import "./classes.less";
import _ from 'lodash';

class Classes extends React.Component {
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
    const isLoading = _.get(this.props, 'classes.isLoading') || false;
    const renderName = (val, row) => {
      return <Link to={`/classes/${row._id}`}>{row.name}</Link>;
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
            <h1>Classes</h1>
          </Col>
          <Col xs={12} sm={6}>
            <Link className="btn" to={`/add-class`}>Add Class</Link>
            { this.state.selections.length ?
              <div>
                <Button onClick={this.open.bind(this, 'delete')}>Delete</Button>
                <Button onClick={this.open.bind(this, 'replicate')}>Replicate</Button>
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
            /> 
          :
          <div className="no-results">No Classes Yet</div>
        }

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
           <Modal.Header>
             <Modal.Title>Modal heading</Modal.Title>
           </Modal.Header>
           <Modal.Body>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.delete.bind(this)}>Submit</Button>
             <Button onClick={this.replicate.bind(this)}>Submit</Button>
             <Button onClick={this.close.bind(this)}>Cancel</Button>
           </Modal.Footer>
         </Modal>
       </div>
    );
  }

  formatData() {
    let classes = _.get(this.props, 'classes.allClasses') || [];
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

export default branch(Classes, {
  facets: {
    classes: 'Classes'
  }
});
