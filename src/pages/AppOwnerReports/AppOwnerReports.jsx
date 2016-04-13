import React from 'react';
import {Row, Col, Input} from 'react-bootstrap';
import {branch} from 'baobab-react/higher-order';
import Spinner from 'components/Spinner';
import _ from 'lodash';
import './reports.less';
import {DataTable} from 'react-data-components';
import TableFilter from 'components/Application/components/Table/TableFilter';
import {appOwnerReport} from 'actions/ReportActions';
import currency from 'utility/currency';

class AppOwnerReports extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    const isLoading = _.get(this.props, 'privates.isLoading') || false;
    const report = _.get(this.props, 'report.report', {});
    const renderTotal = (val, row) => { 
      return row.transactionsReport.total;
    }
    const renderFailing = (val, row) => { 
      return row.transactionsReport.failing;
    }
    const renderProfit = (val, row) => { 
      return currency(row.transactionsReport.profit);
    }
    const columns = [
      { 
        title: 'Gym', 
        prop: 'name'
      },
      { 
        title: 'total', 
        render: renderTotal,
      },
      { 
        title: 'Failing', 
        render: renderFailing,
      },
      { 
        title: 'earnings', 
        render: renderProfit
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
            <TableFilter onSubmitFilter={this.submitFilter.bind(this)} table="appOwnerGymReports" />
          </div>
          {
            isLoading ? 
              <Spinner /> :
                report.gyms && report.gyms.length ?
                  <div>
                    <DataTable
                      keys={['_id']}
                      columns={columns}
                      initialData={report.gyms}
                      initialPageLength={1000}
                      className="table-body"
                    />
                    <div className="totals-wrapper">
                      <div>
                        <span>Total Transactions</span><span>{report.report.total}</span>
                      </div>
                      <div>
                        <span>Total Failing</span><span>{report.report.failing}</span>
                      </div>
                      <div>
                        <span>Total App Revenue</span><span>{currency(report.report.revenue)}</span>
                      </div>
                      <div>
                        <span>Total App Profit</span><span>{currency(report.report.profit)}</span>
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
    appOwnerReport();
  }
}

export default branch(AppOwnerReports, {
  facets: {
    report: 'AppOwnerGymReport'
  }
});
