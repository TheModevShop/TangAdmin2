import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid} from 'react-bootstrap';
import ClassInfo from './components/ClassInfo';
import {setActiveClass} from 'actions/ClassActions';
import _ from 'lodash';
import './privates-profile.less';

class ClassProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  componentWillMount() {
    setActiveClass();
  }
  render() {
    const profile = _.get(this.props, 'classProfile.classProfile') || {};
    return (
        profile.name ?
        <div className="class-profile">
           <Grid fluid>
            <Row>
              <div className=" col-xs-12 col-sm-10 col-sm-offset-1">
                <div className="row heading">
                  <Col xs={12}>
                    <h1>{profile.name}</h1>
                  </Col>
                </div>
                <Row className="info-container">
                  <ClassInfo profile={profile} />
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
