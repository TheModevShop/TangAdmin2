import React from 'react';
import _ from 'lodash';
import './gyms-table-body.less';

class GymsTableHeader extends React.Component {
  render() {
    return (
      <tbody>
        {
          _.map(this.props.data, function(gym, index) {
            return (
              <tr key={'gym-'+index} className="gyms-table-body-row odd" role="row">
                <td className="sorting_1">{gym.name}</td>
                <td>address</td>
                <td>random</td>
                <td className="center">random</td>
                <td className="center">random</td>
              </tr>
            );
          })
        }
      </tbody>
    );
  }

}


export default GymsTableHeader;