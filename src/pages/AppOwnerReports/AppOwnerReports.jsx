import React from 'react';
import {Row, Col, Input} from 'react-bootstrap';
import {branch} from 'baobab-react/higher-order';
import Spinner from 'components/Spinner';
import _ from 'lodash';
import './reports.less';
import {DataTable} from 'react-data-components';
import TableFilter from 'components/Application/components/Table/TableFilter';

class AppOwnerReports extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  formatData(classes) {
    classes = _.map(_.cloneDeep(classes), (classItem) => {
      return classItem;
    });

    return classes;
  }

  render() {
    const reports = [{name: "New Gym", classes: 12, privates: 15, earnings: "$60.00"}]
    const isLoading = _.get(this.props, 'privates.isLoading') || false;
    const columns = [
      { 
        title: 'Gym', 
        prop: 'name'
      },
      { 
        title: 'Classes', 
        prop: 'classes' 
      },
      { 
        title: 'Privates', 
        prop: 'privates' 
      },
      { 
        title: 'earnings', 
        prop: 'earnings' 
      },
    ];
    return (
        <div className="table-wrapper">
          <div className="row table-header">
            <Col xs={12}>
              <h1>Reports</h1>
            </Col>
          </div>
          <div className="row table-filter-container">
            <TableFilter onSubmitFilter={this.submitFilter.bind(this)} table="reports" />
          </div>
          {
            isLoading ? 
              <Spinner /> :
                reports.length ?
                  <div>
                    <DataTable
                      keys={['_id']}
                      columns={columns}
                      initialData={reports}
                      initialPageLength={1000}
                      initialSortBy={{prop: 'date', order: 'ascending' }}
                      className="table-body"
                    />
                    <div className="totals-wrapper">
                      <div>
                        <span>Total Gym Revenue</span><span>$1000.00</span>
                      </div>
                      <div>
                        <span>Total Coach Earnings</span><span>$1000.00</span>
                      </div>
                      <div>
                        <span>Total Gym Profit</span><span>$1000.00</span>
                      </div>
                    </div>
                  </div>
                :
                <div className="no-results">No Reports Yet</div>
          }
        </div>
    );
  }
  submitFilter() {
  }
}

export default AppOwnerReports;
