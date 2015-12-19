import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';

class Transactions extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    const transactions = [];
    return (
      <div className="transactions-table-wrapper panel panel-primary">
        <div className="row panel-heading">
          <Col xs={12}>
            <h1>Transactions</h1>
          </Col>
        </div>
        {
          transactions.length ?
          <DataTable
            keys={[ 'name', 'addressFormatted']}
            columns={columns}
            initialData={transactions}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
            pageLengthOptions={[ 15, 20, 50 ]}
          /> : null
        }
       </div>
    );
  }
}
export default branch(Transactions, {
  cursors: {
    transactions: ['transactions']
  }
});
