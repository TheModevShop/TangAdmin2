import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import ClassInfo from './components/ClassInfo';
import ClassStudentsTable from './components/ClassStudentsTable';
import {setActiveClass} from 'actions/ClassActions';
import _ from 'lodash';
import './class-profile.less';

class ClassProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentWillMount() {
    setActiveClass();
  }

  cancelClass() {

  }

  render() {
    const profile = _.get(this.props, 'classProfile.classProfile') || {};
    return (
        profile.name ?
        <div className="class-profile">
           <Grid fluid>
            <Row>
              <div className=" col-xs-12 col-md-10 col-md-offset-1">
                <div className="row header">
                  <Col xs={12} sm={6}>
                    <h1>{profile.name}</h1>
                  </Col>
                  <Col xs={12} sm={6} className="header-btns">
                    <Button className="cancel-btn" onClick={this.cancelClass.bind(this)}>Cancel Class</Button>  
                    <Link className="btn" to={`/add-class/${profile._id}`}>Edit Class</Link>                
                  </Col>
                </div>
                <Row className="info-container">
                  <ClassInfo profile={profile} />
                </Row>
                <Row className="table-container">
                  <ClassStudentsTable profile={profile} />
                </Row>
              </div>
            </Row>
          </Grid>
        </div> : null
    );
  }

}

export default branch(ClassProfile, {
  facets: {
    classProfile: 'ClassProfile'
  }
});
