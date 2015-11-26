import React from 'react';
import _ from 'lodash';
import './gyms-table-header.less';

class GymsTableHeader extends React.Component {
  render() {
    return (
      <thead>
        <tr className="gyms-table-header-row" role="row">
          <th className="sorting_asc" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" style={ {width: 265} }>Rendering engine</th>
          <th className="sorting" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="Browser: activate to sort column ascending" style={ {width: 321} }>Browser</th>
          <th className="sorting" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="Platform(s): activate to sort column ascending" style={ {width: 299} }>Platform(s)</th>
          <th className="sorting" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="Engine version: activate to sort column ascending" style={ {width: 231} }>Engine version</th>
          <th className="sorting" tabIndex="0" aria-controls="dataTables-example" rowSpan="1" colSpan="1" aria-label="CSS grade: activate to sort column ascending" style={ {width: 180} }>CSS grade</th>
        </tr>
      </thead>
    );
  }

}


export default GymsTableHeader;