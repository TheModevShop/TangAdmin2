import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import TableFilter from './../../../components/Application/components/Table/TableFilter';
import Spinner from 'components/Spinner';
import moment from 'moment';
import currency from 'utility/currency';

class Transactions extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  formatData(transactions) {
    transactions = _.map(_.cloneDeep(transactions), (item) => {
      item.userCharged = item.userCharged.name ? item.userCharged.name.first + ' ' + item.userCharged.name.last : 'N/A';
      item.session = item.session ? item.session.name : 'N/A';
      item.instructor = item.instructor.name ? item.instructor.name.first + ' ' + item.instructor.name.last : 'N/A';
      item.charged = item.stripe.amount ? '$' + currency(item.stripe.amount) : 'N/A';
      item.date = moment(item.date, 'YYYYMMDD').format('MM/DD/YYYY');

      return item;
    });

    return transactions;
  }

  render() {
    const transactions = this.formatData(_.get(this.props, 'transactions.allTransactions')) || [];
    const isLoading = _.get(this.props, 'transactions.isLoading') || false;

    const columns = [
      {
        title: 'Session',
        prop: 'session'
      },
      {
        title: 'Date',
        prop: 'date'
      }, 
      {
        title: 'User Charged',
        prop: 'userCharged'
      },
      {
        title: 'Instructor',
        prop: 'instructor'
      },
      {
        title: 'Amount Charged',
        prop: 'charged'
      }

    ];
    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12}>
            <h1>Transactions</h1>
          </Col>
        </div>
        <div className="row table-filter-container">
          <TableFilter table="transactions" items={_.get(this.props, 'transactions.allTransactions')} />
        </div>
        {
          isLoading ? 
          <Spinner /> :
          transactions.length ?
          <DataTable
            keys={['_id']}
            columns={columns}
            initialData={transactions}
            initialPageLength={1000}
            initialSortBy={{ prop: 'date', order: 'ascending' }}
            className="table-body"
          /> :
          <div className="no-results">No Transactions Yet</div>
        }
       </div>
    );
  }
}
export default branch(Transactions, {
  facets: {
    transactions: 'Transactions'
  }
});
