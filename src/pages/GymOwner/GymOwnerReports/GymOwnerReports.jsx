import React from 'react';
import {Row, Col, Input} from 'react-bootstrap';
import {branch} from 'baobab-react/higher-order';
import Spinner from 'components/Spinner';
import _ from 'lodash';
import './reports.less';
import {DataTable} from 'react-data-components';
import TableFilter from 'components/Application/components/Table/TableFilter';
import {gymOwnerReport} from 'actions/ReportActions';

class GymOwnerReports extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    const reports = _.get(this.props.report, 'report.instructorsReport');
    const isLoading = _.get(this.props.report, 'report.isLoading', false);

    const renderName = (val, row) => {
      return <span>sdvsdavzxdv</span>;
    }

    
    const columns = [
      { 
        title: 'Name', 
        render: renderName,
        prop: 'name'
      },
      { 
        title: 'Half Hour Privates', 
        prop: 'halfHourprivates' 
      },
      { 
        title: 'Full Hour Privates', 
        prop: 'hourPrivates' 
      },
      { 
        title: 'Earnings', 
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
                reports && reports.length ?
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
    gymOwnerReport();
  }
}

export default branch(GymOwnerReports, {
  facets: {
    report: 'GymOwnerReport'
  }
});
