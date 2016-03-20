import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {removeUserFromSession} from 'actions/ClassActions';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import CustomModal from 'components/Application/components/Modal/Modal';
import Spinner from 'components/Spinner';

class ClassStudentsTable extends React.Component {
  render() {
    const profile = _.get(this.props, 'classProfile.classProfile') || {};
    const students = profile.enrolled;

    const renderName = (val, row) => {
      return row.name ? <Link to={`/students/${row._id}`}><div className="image" style={{backgroundImage: `url(${row.image})`}}></div>{row.name.first} {row.name.last}</Link> : 'null';
    }

    const renderRemoveUser = (val, row) => {
      return <div onClick={this.activateModal.bind(this, `remove ${row.name.first} ${row.name.last} from`, this.removeFromSession.bind(this, row._id))} className="primary-link">Remove From Session</div>
    }
      
    const columns = [
      { 
        title: 'Name', 
        render: renderName
      },
      { 
        title: 'Email', 
        prop: 'email' 
      },
      { 
        title: 'Phone Number',
        prop: 'phone' 
      }
    ];
    if (!profile.private && !profile.complete) {
      columns.push({ 
        title: 'Remove User', 
        render: renderRemoveUser
      });
    }

    return (
      <div className="col-xs-12 table-wrapper">
        <div className="row table-header">
          <Col xs={12}>
            <h2>Students Enrolled</h2>
          </Col>
        </div>
        {
          students.length ?
          <DataTable
            keys={['_id']}
            columns={columns}
            initialData={students}
            initialPageLength={15}
            pageLengthOptions={[ 15, 20, 50 ]}
            className="table-body"
          /> : 
          <div className="no-results">No Students Enrolled Yet</div>
        }
        <CustomModal ref="modal"/>
       </div>
    );
  }

  activateModal(action, fn) {
    this.refs.modal.open(action, fn);
  }

  async removeFromSession(id) {
    this.setState({loading: id});
    const sessionId =  _.get(this.props, 'classProfile.classProfile._id');
    const removed = await removeUserFromSession(sessionId, id);
    if (!removed) {
      this.setState({loading: false});
      alert('Error removing this user, please try again')
    } else {
      this.setState({loading: false});
    } 
  }
}
export default branch(ClassStudentsTable, {
  facets: {
    classProfile: 'ClassProfile'
  }
});