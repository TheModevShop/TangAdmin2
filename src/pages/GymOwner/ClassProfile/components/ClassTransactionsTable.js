import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import TableFilter from 'components/Application/components/Table/TableFilter';
import TablePagination from 'components/Application/components/Table/TablePagination';
import Spinner from 'components/Spinner';
import moment from 'moment';
import {clearTransactionsCache} from 'actions/TransactionsActions';
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
      item.session = item.session ? item.session.name : 'N/A';
      item.instructor = _.get(item, 'instructor.name') ? item.instructor.name.first + ' ' + item.instructor.name.last : 'N/A';
      item.charged = _.get(item, 'stripe.amount') ? currency(item.stripe.amount) : 'N/A';
      item.date = _.get(item, 'date') ? moment(item.date, 'YYYYMMDD').format('MM/DD/YYYY') : 'N/A';
      return item;
    });

    return transactions;
  }

  render() {
    const transactions = this.formatData(_.get(this.props, 'ClassTransactions.transactions')) || [];
    const isLoading = _.get(this.props, 'transactions.isLoading') || false;

    const renderName = (val, row) => {
      return <Link to={`/transactions/${row._id}`}>{row.session}</Link>;
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
        title: 'Instructor',
        prop: 'instructor'
      },
      {
        title: 'Amount',
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
        {
          isLoading ? 
          <Spinner /> :
          transactions.length ?
          <span>
            <DataTable
              keys={['_id']}
              columns={columns}
              initialData={transactions}
              initialPageLength={10000}
              className="table-body"
            />
          </span> :
          <div className="no-results">No Transactions Yet</div>
        }
       </div>
    );
  }

  submitFilter() {
    clearTransactionsCache();
  }
}
export default branch(ClassTransactionsTable, {
  facets: {
    ClassTransactions: 'ClassTransactions'
  }
});
