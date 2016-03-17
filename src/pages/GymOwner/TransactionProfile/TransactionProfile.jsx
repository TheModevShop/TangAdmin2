import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import TransactionInfo from './components/TransactionInfo';
import history from 'appHistory';
import CustomModal from './../../../components/Application/components/Modal/Modal';
import {Link} from 'react-router';
import _ from 'lodash';
import './transaction-profile.less';

class TransactionProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  cancelTransaction() {
    let id = this.props.transactionProfile.profile._id;



    this.refs.modal.close();
    history.pushState(null, '/transactions');
  }
  activateModal(action, fn) {
    this.refs.modal.open(action, fn);
  }
  render() {
    const profile = _.get(this.props, 'TransactionProfile.profile') || {};
    return (
        profile.name ?
           <Grid fluid className="class-profile">
            <Row>
              <div className=" col-xs-12 col-sm-10 col-sm-offset-1">
                <div className="row heading">
                  <Col xs={12} sm={6}>
                    <h1>{profile.amount}</h1>
                    <p>{profile.userCharged}</p>
                    <p>{profile.date}</p>
                  </Col>
                  <Col xs={12} sm={6} className="header-btns">
                    <Button className="cancel-btn" onClick={this.activateModal.bind(this, 'cancel', this.cancelTransaction.bind(this))}>Cancel Transaction</Button>               
                  </Col>
                </div>
                <Row className="info-container">
                  <TransactionInfo profile={profile} />
                </Row>
              </div>
            </Row>
            <CustomModal ref="modal"/>
          </Grid>
        : null
    );
  }
}
export default branch(TransactionProfile, {
  cursors: {
    TransactionProfile: ['views', 'TransactionProfile']
  },
  facets: {
    TransactionProfile: 'TransactionProfile'
  }
});
