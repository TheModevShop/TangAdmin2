import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';
import Spinner from 'components/Spinner';

const renderName = (val, row) => {
  return <Link to={`/transactions/${row._id}`}>{row.name}</Link>;
}

const columns = [
  { 
    title: 'Name', 
    prop: 'name',
    render: renderName
  }, 
  {
    title: 'Date',
    prop: 'date'
  }

];

class Transactions extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const transactions = _.get(this.props, 'transactions.transactions') || [];
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
            keys={[ 'name']}
            columns={columns}
            initialData={transactions}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
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
