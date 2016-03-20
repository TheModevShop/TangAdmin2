import React from 'react';
import CustomModal from 'components/Application/components/Modal/Modal';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel, Button} from 'react-bootstrap';
import TableFilter from 'components/Application/components/Table/TableFilter';
import TablePagination from 'components/Application/components/Table/TablePagination';
import Spinner from 'components/Spinner';
import moment from 'moment';
import {clearTransactionsCache, retryCharge} from 'actions/TransactionsActions';
import currency from 'utility/currency';
import {Link} from 'react-router';

class ClassTransactionsTable extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  formatData(transactions) { 
    transactions = _.map(_.cloneDeep(transactions), (item) => {
      item.name = item.userCharged.name ? item.userCharged.name.first + ' ' + item.userCharged.name.last : 'N/A';
      item.transactionId = item._id ? item._id : null;
      item.sessionName = item.session ? item.session.name : 'N/A';
      item.amount = item.session.price ? currency(item.session.price) : 'N/A';
      item.instructor = _.get(item, 'instructor.name') ? item.instructor.name.first + ' ' + item.instructor.name.last : 'N/A';
      item.charged = _.get(item, 'stripe.amount') ? currency(item.stripe.amount) : 'N/A';
      item.date = _.get(item, 'date') ? moment(item.date, 'YYYYMMDD').format('MM/DD/YYYY') : 'N/A';
      item.userId = _.get(item, 'userCharged._id');
      item.status = false;
      if (moment().isAfter(item.session.dateAndTime) && item.session.complete) {
        item.status = item.missing ? 'missing' : item.failed ? 'failed' : 'success';
      }
      return item;
    });

    return transactions;
  }

  render() {
    const transactions = this.formatData(_.get(this.props, 'ClassTransactions.transactions')) || [];
    const isLoading = _.get(this.props, 'transactions.isLoading') || false;

    const renderName = (val, row) => {
      return <Link to={`/transactions/${row.transactionId}`}>{row.session}</Link>;
    }

    const renderStatus = (val, row) => {
      if(!row.status || !row.userId || !row.transactionId) {
        return 'N/A';
      } else if (row.status !== 'success') {
        return <Button className="action-button" onClick={this.activateModal.bind(this, `charge ${row.userCharged.name.first} ${row.userCharged.name.last} ${row.amount}`, this.reCharge.bind(this, row.transactionId, row.userId))}>Charge Again</Button>;
      } else if(row.status === 'success') {
        return <div>success</div>
      }
    }

    const columns = [
      {
        title: 'User',
        prop: 'name'
      },
      {
        title: 'Date Charged',
        prop: 'date'
      }, 
      {
        title: 'Amount',
        prop: 'charged'
      },
      { 
        title: 'Status', 
        render: renderStatus,
        prop: 'status'
      }
    ];
    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12}>
            <h1>Transactions</h1>
          </Col>
        </div>
        {
          isLoading ? 
          <Spinner /> :
          transactions.length ?
          <span>
            <DataTable
              keys={['userId']}
              columns={columns}
              initialData={transactions}
              initialPageLength={10000}
              className="table-body"
            />
          </span> :
          <div className="no-results">No Transactions Yet</div>
        }
        <CustomModal ref="modal"/>
       </div>
    );
  }

  submitFilter() {
    clearTransactionsCache();
  }

  activateModal(action, fn) {
    this.refs.modal.open(action, fn);
  }

  async reCharge(transactionId, userId) {
    const response  = await retryCharge(transactionId, userId);
    if (!response) {
      alert('Charge failed. The user may have to update their payment method.')
    } else if(response === 'declined') {
      alert('Charge failed. The users card was declined, notify user to update payment method.');
    }
    this.refs.modal.close();
  }
}
export default branch(ClassTransactionsTable, {
  facets: {
    ClassTransactions: 'ClassTransactions'
  }
});
