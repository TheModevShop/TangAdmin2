import React from 'react';
import {branch} from 'baobab-react/higher-order';
import {DataTable} from 'react-data-components';
import {Row, Col, Grid, Panel} from 'react-bootstrap';

class Coaches extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    const coaches = [];
    return (
      <div className="coaches-table-wrapper panel panel-primary">
        <div className="row panel-heading">
          <Col xs={12}>
            <h1>Coaches</h1>
          </Col>
        </div>
        {
          coaches.length ?
          <DataTable
            keys={[ 'name', 'addressFormatted']}
            columns={columns}
            initialData={coaches}
            initialPageLength={15}
            initialSortBy={{ prop: 'name', order: 'descending' }}
            pageLengthOptions={[ 15, 20, 50 ]}
          /> : null
        }
       </div>
    );
  }
}
export default branch(Coaches, {
  cursors: {
    coaches: ['coaches']
  }
});
