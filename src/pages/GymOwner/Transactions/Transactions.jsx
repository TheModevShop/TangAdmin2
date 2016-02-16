import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import Spinner from 'components/Spinner';
import moment from 'moment';

const userCharged = (val, row) => {
  return <div>{row.userCharged.name.first} {row.userCharged.name.last}</div>;
}

const renderInstructor = (val, row) => {
  return <div>{row.instructor.name.first} {row.instructor.name.last}</div>;
}

const renderSession = (val, row) => {
  return <div>{row.session.name}</div>;
}

const renderAmount = (val, row) => {
  return <div>{row.stripe.amount}</div>;
}

const renderDate = (val, row) => {
  return <div>{moment(row.date, 'YYYYMMDD').format('MMM D YYYY')}</div>;
}

const columns = [
  {
    title: 'Session',
    render: renderSession
  },
  {
    title: 'Date',
    render: renderDate
  }, 
  {
    title: 'User Charged',
    prop: 'userCharged',
    render: userCharged
  },
  {
    title: 'Instructor',
    render: renderInstructor
  },
  {
    title: 'Amount Charged',
    render: renderAmount
  }

];

class Transactions extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const transactions = _.get(this.props, 'transactions.allTransactions') || [];
    const isLoading = _.get(this.props, 'transactions.isLoading') || false;
    return (
      <div className="table-wrapper">
        <div className="row table-header">
          <Col xs={12} sm={6}>
            <h1>Transactions</h1>
          </Col>
        </div>
        {
          isLoading ? 
          <Spinner /> :
          transactions.length ?
          <DataTable
            keys={['_id']}
            columns={columns}
            initialData={transactions}
            initialPageLength={15}
            pageLengthOptions={[ 15, 20, 50 ]}
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
