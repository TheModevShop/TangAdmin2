import React from 'react';
import Spinner from 'components/Spinner';
import {branch} from 'baobab-react/higher-order';
import {Row, Col, Grid, Button} from 'react-bootstrap';
import TransactionInfo from './components/TransactionInfo';
import history from 'appHistory';
import {setActiveTransaction} from 'actions/TransactionsActions';
import CustomModal from 'components/Application/components/Modal/Modal';
import currency from 'utility/currency';
import moment from 'moment';
import {refund} from 'actions/TransactionsActions';

import {Link} from 'react-router';
import _ from 'lodash';
import './transaction-profile.less';

class TransactionProfile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  async refundTransaction() {
    const id = _.get(this.props, 'TransactionProfile.profile._id');
    this.refs.modal.close();
    this.setState({loading: true});
    const refunded = await refund(id);
    if (!refunded) {
      this.setState({loading: false});
      alert('Error refunding, please try again')
    } else {
      this.setState({refunded: true, loading: false});
    }

  }

  activateModal(action, fn) {
    this.refs.modal.open(action, fn);
  }

  componentWillMount() {
    setActiveTransaction();
  }

  render() {
    const profile = _.get(this.props, 'TransactionProfile.profile') || {};
    const userCharged = `${_.get(profile, 'userCharged.name.first')} ${_.get(profile, 'userCharged.name.last')}`
    return (
        this.state.loading ?
        <Spinner />  :
        profile._id ?
           <Grid fluid className="transaction-profile">
            <Row>
              <div className="col-xs-12">
                <div className="navigation-wrapper">
                  <span className="primary-link navigation" onClick={() => history.pushState(null, '/transactions')}>
                    <span className="glyphicon glyphicon-menu-left"></span>
                    <h3>back to transactions</h3>
                  </span>
                </div>
                <div className="row heading">
                  <Col xs={12} sm={6}>
                    <h2>{currency(profile.amount)} {profile.refunded ? '(refunded)' : null}</h2>
                    <p className="bold">Charged to {_.get(profile, 'userCharged.name.first')} {_.get(profile, 'userCharged.name.last')}</p>
                    <p>{moment(profile.date).format('M/D/YYYY h:mma')}</p>
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
  facets: {
    TransactionProfile: 'TransactionProfile'
  }
});


// When Refunding is added back in
// {
//   !profile.refunded ?
//   <Col xs={12} sm={6} className="header-btns">
//     <Button disabled={this.state.refunded} className="refund-btn" onClick={this.activateModal.bind(this, `refund ${userCharged} ${currency(profile.amount)} for`, this.refundTransaction.bind(this))}>Refund Transaction</Button>               
//   </Col> : null
// }
